import { render, screen } from '@testing-library/react';
import History from './History';

describe('History component', () => {
  test('renders correctly with data', () => {
    const calculations = [
      { num1: 1, num2: 2, answer: 3, userAnswer: 3, isCorrect: true },
      { num1: 4, num2: 5, answer: 9, userAnswer: 8, isCorrect: false }
    ];

    render(<History calculations={calculations} />);
    expect(screen.getByText(/question/i)).toBeInTheDocument();
    expect(screen.getByText(/user answer/i)).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    calculations.forEach(({ num1, num2, userAnswer, isCorrect }) => {
      expect(screen.getByText(`${num1} + ${num2}`)).toBeInTheDocument();
      expect(screen.getByText(userAnswer.toString())).toBeInTheDocument();
      expect(screen.getByText(isCorrect ? 'correct' : 'wrong')).toBeInTheDocument();
    });
  });

  // Add a new test to check for the empty table message
  test('displays empty table message when no data is present', () => {
    render(<History calculations={[]} />);
    expect(screen.getByText(/The table is currently empty/i)).toBeInTheDocument();
  });
});
