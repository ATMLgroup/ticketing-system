import {createSlice} from "@reduxjs/toolkit"

export const setTicketsItems = createSlice({
    name: "setTicketsItems",
    initialState: {
        tickets: []
    },
    reducers: {
        set: (state, action) => {
            state.tickets = action.payload
        }
    }
})

export const {set} = setTicketsItems.actions
export default setTicketsItems.reducer