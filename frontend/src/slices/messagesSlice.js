import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { deleteChannel, fetchChannels } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload.messages);
      })
      .addCase(deleteChannel, (state, { payload }) => {
        const messages = Object.values(state.entities);
        const filteredMessages = messages.filter(({ channelId }) => channelId !== payload);
        messagesAdapter.setAll(state, filteredMessages);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
