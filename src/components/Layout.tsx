import * as React from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Calculation from './calculation/Calculation';
import History from './history/History';
import { Box } from '@mui/material';
import { selectCalculationsHistory } from '../slices/calculationSlice';

export default function FixedContainer() {
    const calculationsHistory = useSelector(selectCalculationsHistory);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ alignContent: 'center', fontSize: '32px' }}>Calculation Game</Box>
                <Calculation />
                <History calculations={calculationsHistory} />
            </Container>
        </React.Fragment>
    );
}
