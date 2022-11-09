/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (userToken) => {
    const response = await axios.get(routes.dataPath(), {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ activeChannel: 1 }),
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
    addChannel(state, { payload }) {
      channelsAdapter.addOne(state, payload);
      state.activeChannel = payload.id;
    },
    deleteChannel(state, { payload }) {
      channelsAdapter.removeOne(state, payload);
      if (state.activeChannel === payload) {
        state.activeChannel = 1;
      }
    },
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.activeChannel = payload.currentChannelId;
        channelsAdapter.setAll(state, payload.channels);
      });
  },
});

export const {
  setActiveChannel, addChannel, deleteChannel, updateChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
