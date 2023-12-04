import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type Parcel = {
  id: string;
  _id?: string;
  senderId: string;
  pickupAddress: string;
  dropoffAddress: string;
  status?: string;
  bikerId?: string;
  pickupTimestamp?: string;
  deliveryTimestamp?: string;
};

export type ParcelStatus = {
  parcelId: string;
};

type ParcelState = {
  parcel: Parcel | null;
  status: "idle" | "loading" | "failed";
  parcels: Parcel[];
};

const initialState: ParcelState = {
  parcel: null,
  status: "idle",
  parcels: [],
};

export const createParcel = createAsyncThunk(
  "parcel/create",
  async (parcelData: Pick<Parcel, 'pickupAddress' | 'dropoffAddress'>, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/parcels/createParcel`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parcelData),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data.parcel;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getParcelsForSender = createAsyncThunk(
  "parcel/getParcelsForSender",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/parcels/getParcelsForSender`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          //   body: JSON.stringify(parcelData),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data.parcels;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const assignParcelToBiker = createAsyncThunk(
  "parcel/assignParcelToBiker",
  async (parcelData: ParcelStatus, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/parcels/assignParcel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(parcelData),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data.parcel;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deliverParcel = createAsyncThunk(
  "parcel/deliverParcel",
  async (parcelData: ParcelStatus, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/parcels/deliverParcel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(parcelData),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data.parcel;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getParcelsForBikers = createAsyncThunk(
  "parcel/getParcelsForBikers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/parcels/getParcelsForBikers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // body: JSON.stringify(parcelData),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data.parcels;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createParcel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createParcel.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcel = action.payload;
        state.parcels.push(action.payload);
      })
      .addCase(createParcel.rejected, (state) => {
        state.status = "failed";
        state.parcels = [];
      })
      .addCase(getParcelsForSender.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getParcelsForSender.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcels = action.payload;
      })
      .addCase(getParcelsForSender.rejected, (state) => {
        state.status = "failed";
        state.parcels = [];
      })
      .addCase(assignParcelToBiker.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignParcelToBiker.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcel = action.payload;
        const updatedParcels = state.parcels.map((parcel) => {
          if (parcel._id === action.payload._id) {
            console.log(parcel._id);
            return { ...parcel, ...action.payload };
          }
          return parcel;
        });
        state.parcels =updatedParcels;
      })
      .addCase(assignParcelToBiker.rejected, (state) => {
        state.status = "failed";
        state.parcel = null;
      })
      .addCase(deliverParcel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deliverParcel.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcel = action.payload;
        const updatedParcels = state.parcels.map((parcel) => {
          if (parcel._id === action.payload._id) {
            console.log(parcel._id);
            return { ...parcel, ...action.payload };
          }
          return parcel;
        });
        state.parcels =updatedParcels;
      })
      .addCase(deliverParcel.rejected, (state) => {
        state.status = "failed";
        state.parcel = null;
      })
      .addCase(getParcelsForBikers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getParcelsForBikers.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcels = action.payload;
      })
      .addCase(getParcelsForBikers.rejected, (state) => {
        state.status = "failed";
        state.parcels = [];
      });
  },
});

export const {} = parcelSlice.actions;

export const selectparcel = (state: RootState) => state.parcel.parcel;
export const selectparcels = (state: RootState) => state.parcel.parcels;

export default parcelSlice.reducer;
