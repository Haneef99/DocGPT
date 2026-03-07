import { apiSlice } from "../Api/RootApi";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentItem } from "../Api/RootApi";

interface DocumentState {
    documents: DocumentItem[];
    currentSelectedDocument: DocumentItem | null;
}

const initialState: DocumentState = {
    documents: [],
    currentSelectedDocument: null,
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentItem[]>) => {
      state.documents = action.payload;
    },
    setCurrentSelectedDocument: (state, action: PayloadAction<DocumentItem | null>) => {
      state.currentSelectedDocument = action.payload;
    }
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
  selectors: {
    selectDocuments: (state) => state.documents,
    selectCurrentSelectedDocument: (state) => state.currentSelectedDocument
  }
});

export const { setDocuments, setCurrentSelectedDocument } = documentSlice.actions;

export const {selectDocuments, selectCurrentSelectedDocument} = documentSlice.selectors;

export default documentSlice.reducer;