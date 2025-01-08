import {createSlice} from '@reduxjs/toolkit';

const bookedServiceSlice = createSlice({
  name: 'bookedService',
  initialState: {
    bookedService: [],
  },
  reducers: {
    setBookedService: (state, action) => {
      const existingIndex = state.bookedService.findIndex(
        item => item.service.id === action.payload.service.id,
      );

      if (existingIndex >= 0) {
        state.bookedService.splice(existingIndex, 1);
      } else {
        state.bookedService.push(action.payload);
      }
    },
  },
});

export const {setBookedService} = bookedServiceSlice.actions;
export default bookedServiceSlice.reducer;

export const selectedBookedService = state => state.bookedService.bookedService;
