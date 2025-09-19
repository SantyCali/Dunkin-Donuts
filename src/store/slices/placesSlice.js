// src/store/slices/placesSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  places: [],            // ✅ nunca undefined
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: {
      reducer(state, action) {
        state.places.push(action.payload)
      },
      prepare({ photo, coords, title = 'Mi lugar', address = '' }) {
        return {
          payload: {
            id: nanoid(),
            photo: photo ?? null,
            coords: coords ?? null,
            title,
            address,
            createdAt: Date.now(),
          },
        }
      },
    },
    removePlace(state, action) {
      state.places = state.places.filter(p => p.id !== action.payload)
    },
    clearPlaces(state) {
      state.places = []
    },
  },
})

export const { addPlace, removePlace, clearPlaces } = placesSlice.actions
export default placesSlice.reducer
