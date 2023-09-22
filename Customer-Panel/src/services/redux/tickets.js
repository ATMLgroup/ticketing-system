import {createSlice} from "@reduxjs/toolkit"

export const setTicketsItems = createSlice({
    name: "setTicketsItems",
    initialState: {
        tickets: [],
        currentPage: 1,
        showTicketsList: []
    },
    reducers: {
        set: (state, action) => {
            state.tickets = action.payload
        },
        page: (state, action) => {
            state.currentPage = action.payload
        },
        show: (state, action) => {
            state.showTicketsList = action.payload
        }
    }
})

export const {set, page, show} = setTicketsItems.actions
export default setTicketsItems.reducer