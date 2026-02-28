import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  }),

});

export const { useGetSecureHelloQuery } = apiSlice;