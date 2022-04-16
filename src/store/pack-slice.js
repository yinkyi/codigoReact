import { createSlice } from "@reduxjs/toolkit";

let selectedPackLocalStorage = localStorage.getItem('selected_pack');
const packSlice = createSlice({
    name:'pack',
    initialState:{
        pack_items:[],
        selected_pack:selectedPackLocalStorage?JSON.parse(selectedPackLocalStorage):null,
    },
    reducers:{
        setClassPack(state,action){    
          state.pack_items = action.payload;
          localStorage.removeItem("selected_pack");
        },
        setClassPackbyId(state,action){
            const id = action.payload;  
            const existingItem = state.pack_items.find(item => item.pack_id === id);
            localStorage.removeItem("selected_pack");
            if(existingItem){
                state.selected_pack = existingItem;
                localStorage.setItem("selected_pack",JSON.stringify(existingItem));
            }
            
        }
       
    }
})


export const packSliceActions = packSlice.actions;
export default packSlice.reducer;