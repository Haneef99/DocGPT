import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DocumentItem {
  id: string;
  filename: string;
  uploaded_date: string;
}

export interface UploadResponse {
  documents: DocumentItem[];
}

export interface SearchQueryRequest {
  query: string;
  top_k?: number;
  document_id: string;
}

export interface SearchResultItem {
  document_id: string;
  filename: string;
  content: string;
  similarity_score: number;
}

export interface SearchQueryResponse {
  query: string;
  answer: string;
  sources: SearchResultItem[];
}

declare global {
  interface Window {
    Clerk: any;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/';

export const apiSlice = createApi({
  reducerPath: 'api', 
  
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, 
    
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  
  endpoints: (builder) => ({
    getSecureHello: builder.query<any, void>({
      query: () => 'my-profile', 
    }),
    
    uploadDocument: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
    }),
    
    getAllDocuments: builder.query<UploadResponse, void>({
      query: () => 'my-documents',
    }),

    searchDocuments: builder.mutation<SearchQueryResponse, SearchQueryRequest>({
      query: (searchPayload) => ({
        url: 'search',
        method: 'POST',
        body: searchPayload,
      }),
    }),
  }),
});

export const { 
  useGetSecureHelloQuery, 
  useUploadDocumentMutation, 
  useGetAllDocumentsQuery,
  useSearchDocumentsMutation
} = apiSlice;