/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const response = await axios.get(routes.dataPath(), {
      headers: { Authorization: `Bearer ${token}` },
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
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
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
