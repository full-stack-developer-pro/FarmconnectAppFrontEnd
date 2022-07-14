import { createSlice } from '@reduxjs/toolkit'
import * as Localization from 'expo-localization';
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: Localization.locale,
  },
  reducers: {
    Swahili: (state) => {
     
      state.value = 'sw'
    },
    English: (state) => {
      state.value ='en'
    },
    SwahiliByAmount: (state, action) => {
      state.value = 'en'
    },
  },
})


export const { Swahili, English, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer