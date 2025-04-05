import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser, refresh, registerUser } from './AuthThunks'

interface initialStateType {
    user: Partial<User>,
    isAuth: boolean,
    isLoading: boolean,
    error: string | null
}

const initialState: initialStateType = {
    user: {},
    isAuth: false,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    const pendingReducer = (state: initialStateType) => {
      state.isLoading = true
      state.error = null
    }

    const rejectedReducer = (state: initialStateType, action: any) => {
      state.isLoading = false
      state.error = action.error?.message || 'An error occurred'
    }

    builder
      .addCase(registerUser.pending, pendingReducer)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload?.user
        localStorage.setItem('token', action.payload?.accessToken)
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(registerUser.rejected, rejectedReducer)

      .addCase(refresh.pending, pendingReducer)
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload?.user
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(refresh.rejected, rejectedReducer)

      .addCase(loginUser.pending, pendingReducer)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload?.user
        localStorage.setItem('token', action.payload?.accessToken)
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(loginUser.rejected, rejectedReducer)

      .addCase(logoutUser.pending, pendingReducer)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {}
        state.isAuth = false
        state.isLoading = false
      })
      .addCase(logoutUser.rejected, rejectedReducer)
  }
})

export const { clearError } = authSlice.actions

export default authSlice.reducer
