import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlanetSlug } from "@/lib/planets";

type SolarState = {
  hovered: PlanetSlug | null;
  focus: PlanetSlug | null;
  flying: boolean;
  paused: boolean;
};

const initialState: SolarState = {
  hovered: null,
  focus: null,
  flying: false,
  paused: false,
};

const solarSlice = createSlice({
  name: "solar",
  initialState,
  reducers: {
    setHovered(state, action: PayloadAction<PlanetSlug | null>) {
      state.hovered = action.payload;
    },
    setFocus(state, action: PayloadAction<PlanetSlug | null>) {
      state.focus = action.payload;
    },
    setFlying(state, action: PayloadAction<boolean>) {
      state.flying = action.payload;
    },
    setPaused(state, action: PayloadAction<boolean>) {
      state.paused = action.payload;
    },
  },
});

export const { setHovered, setFocus, setFlying, setPaused } = solarSlice.actions;
export default solarSlice.reducer;
