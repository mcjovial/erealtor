import { BasedApiUrl } from '../api/BaseUrl';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface PropertiesListState {
  properties: Array<object>
  error: string
  pending: boolean
  maxRent?: number | null
  maxSize?: number | null
}

const initialState: PropertiesListState = {
  properties: [],
  error: '',
  pending: false,
  maxRent: 0,
  maxSize: 0,
}

const id = ''
let headers = {}
if (!!id) {
  headers = {
    UserId: id,
  }
}

const fetchProperties = createAsyncThunk('properties/fetch', async (_, thunkAPI) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${BasedApiUrl}/api/properties`,
      headers
    })
    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const propertiesListSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.pending = true
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        return (state = {
          properties: [...action.payload.properties],
          error: '',
          pending: false,
          maxRent: action.payload.maxRent,
          maxSize: action.payload.maxSize,
        });
      })
      .addCase(fetchProperties.rejected, (state, action: PayloadAction<any>) => {
        return (state = {
          properties: [],
          error: action.payload.error,
          pending: false,
        });
      })
  },
})

export { fetchProperties }

export default propertiesListSlice.reducer
