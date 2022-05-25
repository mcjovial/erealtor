import { BasedApiUrl } from '../api/BaseUrl'
import { FilterPropertyOptions } from '../types/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface PropertiesFilterState {
  filteredProperties: Array<object>
  states: Array<string>
  locations: Array<string>
  rent?: Array<number>
  size?: Array<number>
  error: string
  pending: boolean
}

const initialState: PropertiesFilterState = {
  filteredProperties: [],
  states: [],
  locations: [],
  rent: [0, 0],
  size: [0, 0],
  error: '',
  pending: false,
}

const filterProperties = createAsyncThunk(
  'api/properties/filter',
  async (filterOptions: FilterPropertyOptions, thunkAPI) => {
    const { rent, size, states, locations } = filterOptions

    try {
      const response = await axios({
        method: 'post',
        url: `${BasedApiUrl}/api/properties`,
        data: {
          states,
          locations,
          rent,
          size,
        },
      })
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const propertiesFilterSlice = createSlice({
  name: 'propertyFilter',
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<FilterPropertyOptions>) => {
      state.states = action.payload.states
      state.locations = action.payload.locations
      state.rent = action.payload.rent
      state.size = action.payload.size
    },
    clearFilters: (state) => {
      state.states = []
      state.locations = []
      state.rent = [0, 0]
      state.size = [0, 0]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProperties.pending, (state) => {
        state.pending = true
      })
      .addCase(filterProperties.fulfilled, (state, action: PayloadAction<any>) => {
        state.filteredProperties = [...action.payload.properties]
        state.error = ''
        state.pending = false
      })
      .addCase(filterProperties.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.error
        state.pending = false
      })
  },
})

const { addFilters, clearFilters } = propertiesFilterSlice.actions

export { filterProperties, addFilters, clearFilters }

export default propertiesFilterSlice.reducer
