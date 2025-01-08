import {createSlice} from '@reduxjs/toolkit';

const draftServiceSlice = createSlice({
  name: 'draftService',
  initialState: {
    draftService: [],
  },
  reducers: {
    setDraftService: (state, action) => {
      const existingIndex = state.draftService.findIndex(
        item => item.service.id === action.payload.service.id,
      );

      if (existingIndex >= 0) {
        state.draftService.splice(existingIndex, 1);
      } else {
        state.draftService.push(action.payload);
      }
    },
  },
});

export const {setDraftService} = draftServiceSlice.actions;
export default draftServiceSlice.reducer;

export const selectedDraftService = state => state.draftService.draftService;
