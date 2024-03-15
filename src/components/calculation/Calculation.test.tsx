import { render, fireEvent, screen } from '@testing-library/react';
import Calculation from './Calculation';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Calculation component', () => {
  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <Calculation />
      </Provider>
    );

    expect(screen.getByTestId('answer-label')).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
    expect(screen.queryByText(/clear history/i)).not.toBeInTheDocument();
  });

  test('allows user to input answer and submit', () => {
    render(
      <Provider store={store}>
        <Calculation />
      </Provider>
    );
    const answerInput = screen.getByLabelText(/your answer/i);
    fireEvent.change(answerInput, { target: { value: 5 } });
    expect(answerInput).toHaveValue(5);

    fireEvent.click(screen.getByText(/submit/i));

  });

  test('clears history when clear history button is clicked', () => {
    render(
      <Provider store={store}>
        <Calculation />
      </Provider>
    );
  });
});
