import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {userModel} from "../entities/user.ts";

type UserState = {
    user: userModel | null;
}

const initState: UserState = {
    user : null
}

export const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setUser: (state, action: PayloadAction<userModel>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;