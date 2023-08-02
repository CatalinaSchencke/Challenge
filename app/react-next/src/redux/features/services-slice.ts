import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: ServiceState;
}

type ServiceState = {
    services: Array<Service>;
}

type Service = {
    id: string;
    data: ServiceData;
}

type ServiceData = {
    value: number;
    service: string;
    date: string;
    pending: boolean;
}

const initialState = {
    value: {
        services: [],
    } as ServiceState,
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addServices: (state, action: PayloadAction<Array<Service>>) => {
            return {
                value: {
                    services: action.payload,
                }
            }
        }
    }
});

export const { addServices } = auth.actions;
export default auth.reducer;