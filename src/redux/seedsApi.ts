import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SeedType } from '../component/Seed'

// Define a service using a base URL and expected endpoints
export const seedsApi = createApi({
    reducerPath: 'seedsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_DB_URL }),
    endpoints: (builder) => ({
        getOneSeedById: builder.query<SeedType, number>({
            query: (id) => `seeds/${id}`,
        }),
        getAllSeeds: builder.query({
            query: () => 'seeds'
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOneSeedByIdQuery, useGetAllSeedsQuery } = seedsApi