import { apiSlice } from "../Api/RootApi";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentItem } from "../Api/RootApi";

interface DocumentState {
    documents: DocumentItem[];
}

const initialState: DocumentState = {
    documents: [],
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentItem[]>) => {
      state.documents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.uploadDocument.matchFulfilled,
      (state, { payload }) => {
        state.documents = payload.documents;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.getAllDocuments.matchFulfilled,
      (state, { payload }) => {
        state.documents = payload.documents;
      }
    );
  },
});

export const { setDocuments } = documentSlice.actions;

export const selectDocuments = (state: { document: DocumentState }) => state.document.documents;

export default documentSlice.reducer;