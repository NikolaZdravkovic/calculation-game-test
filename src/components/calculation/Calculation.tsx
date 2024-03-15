import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToHistory, selectCalculationsHistory, setCurrentCalculation, generateNewCalculation, clearHistory, selectIsClearHistoryButtonVisible, setClearHistoryButtonVisibility } from '../../slices/calculationSlice';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';

const Calculation = () => {
    const currentCalculation = useSelector((state: any) => state.calculation.currentCalculation);
    const calculationsHistory = useSelector(selectCalculationsHistory);
    const isClearHistoryButtonVisible = useSelector(selectIsClearHistoryButtonVisible);
    const dispatch = useDispatch();
    const [showClearButton, setShowClearButton] = useState(isClearHistoryButtonVisible);

    useEffect(() => {
        setShowClearButton(isClearHistoryButtonVisible);
    }, [isClearHistoryButtonVisible]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isCorrect = currentCalculation.userAnswer === currentCalculation.answer;
        dispatch(setCurrentCalculation({ ...currentCalculation, isCorrect }));
        dispatch(addToHistory());
        dispatch(generateNewCalculation());
    };

    const handleClearLocalStorage = () => {
        localStorage.clear();
        dispatch(clearHistory());
        dispatch(setClearHistoryButtonVisibility(false));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(setCurrentCalculation({ ...currentCalculation, userAnswer: value ? parseInt(value) : '' }));
    };
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <div className="Calculation">
            <Box style={{ padding: '20px', marginBottom: '20px' }} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} component={Paper}>
                <div style={{ paddingBottom: '20px' }}>
                    <form style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingTop: '20px' }} onSubmit={handleSubmit}>
                        <Typography variant="h6" sx={{ paddingRight: '20px' }}>
                            {currentCalculation.num1} + {currentCalculation.num2} =
                        </Typography>
                        <TextField
                            id="input-field"
                            data-testid="answer-label"
                            style={{ paddingRight: '10px', width: `${matches ? 'auto' : "72%"} ` }}
                            label="Your answer"
                            variant="outlined"
                            type="number"
                            value={currentCalculation.userAnswer}
                            onChange={handleInputChange}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: `${matches ? 'none' : '10px'}` }}>
                            Submit
                        </Button>
                    </form>
                </div>
                <Box sx={{ alignSelf: 'center' }}>
                    {showClearButton && (
                        <Button onClick={handleClearLocalStorage} variant="outlined" color="secondary">
                            Clear History
                        </Button>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default Calculation;
