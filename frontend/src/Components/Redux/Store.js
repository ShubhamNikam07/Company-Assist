import { configureStore } from '@reduxjs/toolkit';
import projectDataReducer from './reducers/projectDataReducer';
import cardDataReducer from "./reducers/CardData"

const store = configureStore({
    reducer:{
        projectData : projectDataReducer,
        cardData:cardDataReducer
    }
});
export{store};