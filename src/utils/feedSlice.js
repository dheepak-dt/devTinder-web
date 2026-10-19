import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state,action) => action.payload,
        clearFeed: () => null,
        removeUserFeed: (state,action) => {
            const newFeed = state.filter(user => user._id != action.payload)
            return newFeed;
        }
    }
})

export const {addFeed,clearFeed,removeUserFeed} = feedSlice.actions;

export default feedSlice.reducer;