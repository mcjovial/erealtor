import { BasedApiUrl } from '../api/BaseUrl';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserAttributes, PropertyAttributes } from '../types'

export interface PropertyDetailsState {
    property: PropertyAttributes
    user: UserAttributes
    error: string
    pending: boolean
}

const initialState: PropertyDetailsState = {
    property: {
        title: '',
        description: '',
        size: 0,
        rent: 0,
        state: '',
        location: '',
        street: '',
        services: [],
        images: [],
    },
    user: {
        name: '',
        email: '',
        password: '',
        phone: ''
    },
    error: '',
    pending: false,
}


const fetchPropertyDetails = createAsyncThunk('api/properties/details', async (id: string, thunkAPI) => {
    console.log(id);
    
    try {
        const response = await axios({
            method: 'get',
            url: `${BasedApiUrl}/api/properties/${id}`,
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const propertyDetailsSlice = createSlice({
    name: 'propertyDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPropertyDetails.pending, (state) => {
                state.pending = true
            })
            .addCase(fetchPropertyDetails.fulfilled, (state, action) => {

                return (state = {
                    property: action.payload.property,
                    user: action.payload.user,
                    error: '',
                    pending: false,
                });
            })
            .addCase(fetchPropertyDetails.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error
                state.pending = false
            })
    },
})

export { fetchPropertyDetails }

export default propertyDetailsSlice.reducer
