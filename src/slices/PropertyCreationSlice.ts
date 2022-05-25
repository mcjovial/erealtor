import { BasedApiUrl } from '../api/BaseUrl'
import { localStorageHandler } from '../utils/local-storage-handlers'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const { getTokenLocalStorage } = localStorageHandler()

const data = getTokenLocalStorage()

const userData = data && JSON.parse(data)

export interface PropertyCreationState {
  message: string
  error: string
  pending: boolean
}

const initialState: PropertyCreationState = {
  message: '',
  error: '',
  pending: false,
}

const postProperty = createAsyncThunk('api/properties', async (data: any, thunkAPI) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BasedApiUrl}/api/properties`,
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
      data,
    })
    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const propertyCreationSlice = createSlice({
  name: 'propertyPosting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProperty.pending, (state) => {
        state.pending = true
      })
      .addCase(postProperty.fulfilled, (state, action) => {
        return (state = {
          message: action.payload.message,
          error: '',
          pending: false,
        })
      })
      .addCase(postProperty.rejected, (state, action: PayloadAction<any>) => {

        state.error = action.payload.error
        state.pending = false
      })
  },
})

export { postProperty }

export default propertyCreationSlice.reducer
