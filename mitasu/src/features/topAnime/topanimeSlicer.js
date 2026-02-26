import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jikanURL from "../../assets/jikanURL";

const initialState = {
    topanime: [],
    page: 1,
    totalPage: 0,
    loading: false,
    error: ""
}

export const topanimeSlice = createSlice({
    name: `topanime`,
    initialState,
    reducers: {
        fetchPending: (state) => {
            state.loading = true
            state.topanime = initialState.topanime
            state.page = initialState.page
            state.totalPage = initialState.totalPage
            state.error = initialState.error
        },
        fetchSuccess: (state, action) => {
            state.loading = initialState.loading
            state.topanime = action.payload.data
            state.page = action.payload.pagination.current_page
            state.totalPage = action.payload.pagination.last_visible_page
            state.error = initialState.error
        },
        fetchFailed: (state, action) => {
            state.loading = initialState.loading
            state.topanime = initialState.topanime
            state.error = action.payload
        }
    }
})

export const fetchAsync = (page) => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const { data } = await axios.get(`${jikanURL}top/anime?limit=10&sfw=true&page=${page}`)
        dispatch(fetchSuccess(data))
    } catch (error) {
        dispatch(fetchFailed(error))
        console.log(error)
    }
}

export const { fetchPending, fetchSuccess, fetchFailed } = topanimeSlice.actions
export default topanimeSlice.reducer