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
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ activeChannel: 1 }),
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.activeChannel = payload.currentChannelId;
        channelsAdapter.setAll(state, payload.channels);
      });
  },
});

export const { setActiveChannel } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;