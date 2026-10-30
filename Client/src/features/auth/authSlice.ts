import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem("lumen_token", action.payload.token);
        localStorage.setItem("lumen_user", JSON.stringify(action.payload.user));
      }
    },
    hydrateAuth(state) {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("lumen_token");
      const raw = localStorage.getItem("lumen_user");
      if (token && raw) {
        state.token = token;
        state.user = JSON.parse(raw) as AuthUser;
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("lumen_token");
        localStorage.removeItem("lumen_user");
      }
    },
  },
});

export const { setCredentials, hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;
