import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: [],
  },
  reducers: {
    addForm: (state, action) => {
      state.formData.push(action.payload);
    },
    updateForm: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      state.formData = state.formData.map((entry) =>
        entry.id === id ? { ...entry, ...updatedFields } : entry
      );
      },
      resetForm: (state) => {
        state.formData = state.formData.filter((entry) => entry.id !== action.payload);
      }
  },
});

export const { addForm , updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
