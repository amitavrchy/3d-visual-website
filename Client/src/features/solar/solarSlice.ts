import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlanetSlug } from "@/lib/planets";

export type TransitionPhase =
  | "idle"
  | "approaching"
  | "zooming"
  | "covering"
  | "covered"
  | "revealing";

type SolarState = {
  hovered: PlanetSlug | null;
  focus: PlanetSlug | null;
  flying: boolean;
  paused: boolean;
  phase: TransitionPhase;
  coverOpacity: number;
  coverColor: string;
  pendingSlug: PlanetSlug | null;
  returnHome: boolean;
};

const initialState: SolarState = {
  hovered: null,
  focus: null,
  flying: false,
  paused: false,
  phase: "idle",
  coverOpacity: 0,
  coverColor: "#020208",
  pendingSlug: null,
  returnHome: false,
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
    startFlyTo(
      state,
      action: PayloadAction<{ slug: PlanetSlug; color: string }>,
    ) {
      state.focus = action.payload.slug;
      state.pendingSlug = action.payload.slug;
      state.coverColor = action.payload.color;
      state.flying = true;
      state.paused = true;
      state.phase = "approaching";
      state.returnHome = false;
      state.hovered = null;
    },
    setPhase(state, action: PayloadAction<TransitionPhase>) {
      state.phase = action.payload;
      if (action.payload === "approaching" || action.payload === "zooming") {
        state.flying = true;
      }
      if (action.payload === "covering" || action.payload === "covered") {
        state.flying = true;
      }
      if (action.payload === "idle") {
        state.flying = false;
      }
    },
    setCoverOpacity(state, action: PayloadAction<number>) {
      state.coverOpacity = Math.max(0, Math.min(1, action.payload));
    },
    beginReturnHome(state, action: PayloadAction<{ color: string }>) {
      state.returnHome = true;
      state.coverColor = action.payload.color;
      state.phase = "covering";
      state.pendingSlug = null;
      state.focus = null;
    },
    clearTransition(state) {
      state.phase = "idle";
      state.flying = false;
      state.coverOpacity = 0;
      state.pendingSlug = null;
      state.returnHome = false;
      state.focus = null;
      state.paused = false;
    },
    startReveal(state) {
      state.phase = "revealing";
      state.flying = false;
    },
  },
});

export const {
  setHovered,
  setFocus,
  setFlying,
  setPaused,
  startFlyTo,
  setPhase,
  setCoverOpacity,
  beginReturnHome,
  clearTransition,
  startReveal,
} = solarSlice.actions;
export default solarSlice.reducer;
