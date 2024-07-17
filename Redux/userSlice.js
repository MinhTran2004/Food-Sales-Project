import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {},
  };

const userSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload
        },
        updateUser: (state, action) => {
            state.users = action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer