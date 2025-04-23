import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const AUTH_URL = '/auth'

export const authApi = createApi({
    baseQuery: fetchBaseQuery({  baseUrl: "http://localhost:3300" }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data,
                credentials: "include"
            })
        }),
        login: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
                credentials: "include",
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
                credentials: "include",
            })
        }),
        getProfile: build.query({
            query: () => ({
                url: `${AUTH_URL}/user`,
                method: 'GET',
                credentials: "include",
            })
        }),
        updateProfile: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/update`,
                method: 'PUT',
                body: data,
                credentials: "include",
            })
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetProfileQuery, useUpdateProfileMutation } = authApi;