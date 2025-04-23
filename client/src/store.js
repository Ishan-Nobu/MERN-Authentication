import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './features/userAuthSlice'
import { authApi } from './features/authApiSlice'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        userAuth: userAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})

export default store