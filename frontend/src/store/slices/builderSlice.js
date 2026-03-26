import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  templateId: 'modern',

  content: {
    businessName: 'My Awesome Service',
    tagline: 'The best service in town',
    description: 'Welcome to our official booking page. Book your appointment below.',
    logoUrl: '',
    heroImage: '',
  },

  theme: {
    primaryColor: '#2563eb',
    fontFamily: 'font-sans',
    borderRadius: 'rounded-lg',
  },

  settings: {
    whatsapp: '',
    instagram: '',
    seoTitle: 'Book Now',
  }
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      // Example: section = 'content', field = 'businessName', value = 'New Name'
      if (section === 'templateId') {
        state.templateId = value;
      } else {
        state[section][field] = value;
      }
    },

    loadSavedWebsite: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { updateField, loadSavedWebsite } = builderSlice.actions;
export default builderSlice.reducer;