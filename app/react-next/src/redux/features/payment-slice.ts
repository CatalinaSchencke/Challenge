import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: PaymentState;
}

type PaymentState = {
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
    } as PaymentState,
} as InitialState;

export const payment = createSlice({
    name: "payment",
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

export const { addServices } = payment.actions;
export default payment.reducer;