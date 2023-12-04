import { removeUserFromLocalStorage, saveUser } from "../../utils/auth";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type User = {
  id: string;
  username: string;
  role: string;
};

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "failed";
};

const initialState: UserState = {
  user: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let data = await response.json();
      if (response.status === 200) {
        saveUser(data.user); 
        return { ...data.user };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
        console.log(error);
    //   return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        removeUserFromLocalStorage();
        return {};
      } else {
        let data = await response.json();
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
        console.log(error);
    //   return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
        state.user = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { userLoggedIn } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
