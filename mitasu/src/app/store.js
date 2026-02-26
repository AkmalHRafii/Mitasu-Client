import { configureStore } from '@reduxjs/toolkit'
import seasonReducer from '../features/season/seasonSlicer'
import topanimeReducer from '../features/topAnime/topanimeSlicer'

export const store = configureStore({
    reducer: {
        season: seasonReducer,
        topanime: topanimeReducer
    },
})