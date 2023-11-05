import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeUsers: [],
}

const activeUsersSlice = createSlice({
    name: "activeUsersStore",
    initialState,
    reducers: {
        handleActiveUsersList(state, action) {
            state.activeUsers = Object.keys(action.payload).map((userId) => ({
                id: userId,
                sessionId: action.payload[userId],
              }));
        }
    },
    extraReducers(builder) {
        
    }
});

export const { handleActiveUsersList } = activeUsersSlice.actions;

export default activeUsersSlice.reducer;