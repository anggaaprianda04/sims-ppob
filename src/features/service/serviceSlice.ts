import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

const initialState: ServiceState = {
    service_code: '',
    service_name: '',
    service_icon: '',
    service_tariff: 0,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setSelectedService: (state, action: PayloadAction<ServiceState>) => {
            return { ...action.payload };
        },
        clearSelectedService: () => initialState,
    },
});

export const { setSelectedService, clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
