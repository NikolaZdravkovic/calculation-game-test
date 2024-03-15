import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { CalculationProps } from '../types';

interface CalculationState {
    currentCalculation: CalculationProps;
    calculationsHistory: CalculationProps[];
    isClearHistoryButtonVisible: boolean;
}

const initialState: CalculationState = {
    currentCalculation: generateRandomCalculation(),
    calculationsHistory: [],
    isClearHistoryButtonVisible: false,
};

export const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        setCurrentCalculation: (state, action: PayloadAction<CalculationProps>) => {
            state.currentCalculation = action.payload;
        },
        addToHistory: (state) => {
            state.calculationsHistory.push(state.currentCalculation);
            state.isClearHistoryButtonVisible = true; // Show the clear history button after adding to history
        },
        generateNewCalculation: (state) => {
            state.currentCalculation = generateRandomCalculation();
        },
        clearHistory: (state) => {
            state.calculationsHistory = [];
            state.isClearHistoryButtonVisible = false; // Hide the clear history button after clearing history
        },
        setClearHistoryButtonVisibility: (state, action: PayloadAction<boolean>) => {
            state.isClearHistoryButtonVisible = action.payload;
        },
    },
});

export const { setCurrentCalculation, addToHistory, generateNewCalculation, clearHistory, setClearHistoryButtonVisibility } = calculationSlice.actions;

export const selectCurrentCalculation = (state: RootState) => state.calculation.currentCalculation;
export const selectCalculationsHistory = (state: RootState) => state.calculation.calculationsHistory;
export const selectIsClearHistoryButtonVisible = (state: RootState) => state.calculation.isClearHistoryButtonVisible;

export default calculationSlice.reducer;

function generateRandomCalculation(): CalculationProps {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;
    return {
        num1,
        num2,
        answer,
        userAnswer: '',
        isCorrect: null,
    };
}
