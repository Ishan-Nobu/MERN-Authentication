import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: 
    {
        userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userData = null;
            localStorage.removeItem('userData');
        }
    }
});

export const { setCredentials, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;