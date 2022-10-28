import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import routes from "../routes";

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const response = await axios.get(routes.dataPath(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.messages;
  }
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;