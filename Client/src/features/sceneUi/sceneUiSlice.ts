import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Quality = "low" | "med" | "high";

export type PlaygroundState = {
  color: string;
  metalness: number;
  roughness: number;
  particleDensity: number;
  autoRotate: boolean;
};

type SceneUiState = {
  quality: Quality;
  bloom: boolean;
  exposure: number;
  mute: boolean;
  prefer2d: boolean;
  selectedHotspot: string | null;
  playground: PlaygroundState;
};

const initialState: SceneUiState = {
  quality: "med",
  bloom: true,
  exposure: 1,
  mute: false,
  prefer2d: false,
  selectedHotspot: null,
  playground: {
    color: "#4AF2C8",
    metalness: 0.75,
    roughness: 0.22,
    particleDensity: 400,
    autoRotate: true,
  },
};

const sceneUiSlice = createSlice({
  name: "sceneUi",
  initialState,
  reducers: {
    setQuality(state, action: PayloadAction<Quality>) {
      state.quality = action.payload;
      state.bloom = action.payload !== "low";
    },
    setBloom(state, action: PayloadAction<boolean>) {
      state.bloom = action.payload;
    },
    setExposure(state, action: PayloadAction<number>) {
      state.exposure = action.payload;
    },
    setMute(state, action: PayloadAction<boolean>) {
      state.mute = action.payload;
    },
    setPrefer2d(state, action: PayloadAction<boolean>) {
      state.prefer2d = action.payload;
    },
    setSelectedHotspot(state, action: PayloadAction<string | null>) {
      state.selectedHotspot = action.payload;
    },
    updatePlayground(
      state,
      action: PayloadAction<Partial<PlaygroundState>>,
    ) {
      state.playground = { ...state.playground, ...action.payload };
    },
  },
});

export const {
  setQuality,
  setBloom,
  setExposure,
  setMute,
  setPrefer2d,
  setSelectedHotspot,
  updatePlayground,
} = sceneUiSlice.actions;

export default sceneUiSlice.reducer;
