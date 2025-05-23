import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../slice/postSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})
