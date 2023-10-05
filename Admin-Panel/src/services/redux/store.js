import {configureStore} from '@reduxjs/toolkit'
import tickets from "./tickets";

export default configureStore({
    reducer: {
        tickets: tickets
    }
})