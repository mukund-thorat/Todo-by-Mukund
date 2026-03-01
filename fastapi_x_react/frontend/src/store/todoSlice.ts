import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {todoModel} from "../entities/todo.ts";
import {getActiveTodos} from "../api/active-todos.ts";

type TodoState = {
    items: todoModel[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initState: TodoState = {
    items: [],
    status: "idle",
    error: null,
}

export const fetchActiveTodos = createAsyncThunk<todoModel[]>(
    "todos/fetchActive",
    async () => getActiveTodos()
);

const todoSlice = createSlice({
    name: "todo",
    initialState: initState,
    reducers: {
        addTodos: (state, action: PayloadAction<todoModel[]>) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveTodos.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchActiveTodos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchActiveTodos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch active todos";
            });
    },
})

export const {addTodos} = todoSlice.actions;
export default todoSlice.reducer;
