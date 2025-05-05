import { apiAddLike, apiDeleteLike } from '@/supabaseService/apiPosts'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const toggleLikeAsync = createAsyncThunk(
  'posts/toggleLikeAsync',
  async ({ postId, userId, isCurrentlyLiked }, { rejectWithValue }) => {
    try {
      if (!isCurrentlyLiked) {
        await apiAddLike(postId, userId)
      } else {
        await apiDeleteLike(postId, userId)
      }
      return { postId, isLiked: !isCurrentlyLiked }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  likes: {},
  loading: {},
  errors: {},
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLikeState: (state, action) => {
      const { postId, isLiked } = action.payload
      state.likes[postId] = isLiked
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeAsync.pending, (state, { meta }) => {
        const postId = meta.arg.postId
        state.loading[postId] = true
        state.errors[postId] = null
      })
      // 成功：把 payload 裡的新狀態寫進 likes，清除 loading
      .addCase(toggleLikeAsync.fulfilled, (state, { payload }) => {
        const { postId, isLiked } = payload
        state.loading[postId] = false
        state.likes[postId] = isLiked
      })
      // 失敗：回滾到原本 isCurrentlyLiked，設定 error message
      .addCase(toggleLikeAsync.rejected, (state, { meta, payload, error }) => {
        const { postId, isCurrentlyLiked } = meta.arg
        state.loading[postId] = false
        state.errors[postId] = payload ?? error.message
        state.likes[postId] = isCurrentlyLiked
      })
  },
})

export const { setLikeState } = postSlice.actions

export default postSlice.reducer
