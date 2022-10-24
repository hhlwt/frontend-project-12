import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import routes from "../routes";

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const response = await axios.get(routes.dataPath(), {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.channels;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action);
      });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;