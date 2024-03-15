import { CalculationProps } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

interface HistoryProps {
    calculations: CalculationProps[]; 
}

const History = ({ calculations }: HistoryProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">User Answer</TableCell>
                        <TableCell align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {calculations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="subtitle1" align="center">The table is currently empty.</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        calculations.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{row.num1} + {row.num2}</TableCell>
                                <TableCell align="right">{row.userAnswer}</TableCell>
                                <TableCell align="right">
                                    {row.isCorrect !== null && (
                                        <span style={{ color: `${row.isCorrect ? 'green' : 'red'}` }}>{row.isCorrect ? 'correct' : 'wrong'}</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default History;
