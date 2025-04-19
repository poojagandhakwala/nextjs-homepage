import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeState{
    selectedType:string;
}

const initialState:TypeState={
    selectedType:"All"
}

const typeSlice=createSlice({
    name:"type",
    initialState,
    reducers:{
        setSelectedType(state,action:PayloadAction<string>){
            state.selectedType=action.payload
        }
    }
})

export const {setSelectedType}=typeSlice.actions;
export default typeSlice.reducer;
