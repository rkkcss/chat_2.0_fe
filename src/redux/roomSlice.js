import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    selectedRoom: null,
}

const roomSlice = createSlice({
    name: "roomStore",
    initialState,
    reducers: {
        setSelectedRoom(state, action) {
            state.selectedRoom = action.payload;
        }
    },
    extraReducers(builder) {
        
    }
});

export const { setSelectedRoom } = roomSlice.actions;

export default roomSlice.reducer;