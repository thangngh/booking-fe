import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetRefreshTokenAction = createAsyncThunk(
    "/auth/refresh-token", async () => {
        // call api from lib directory
    }
)