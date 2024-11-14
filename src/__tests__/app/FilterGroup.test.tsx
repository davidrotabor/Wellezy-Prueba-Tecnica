import { render, screen, fireEvent } from '@testing-library/react';
import FilterGroup from 'app/components/molecules/FilterGroup/FilterGroup';

const mockOnFilterChange = jest.fn();

const defaultProps = {
  departureCity: 'Madrid',
  arrivalCity: 'Barcelona',
  airline: 'Iberia',
  onFilterChange: mockOnFilterChange,
  airlineOptions: ['Iberia', 'Vueling', 'Air Europa'],
};

describe('FilterGroup', () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('debe renderizar correctamente los campos con los valores iniciales', () => {
    render(<FilterGroup {...defaultProps} />);

    expect(screen.getByPlaceholderText('Ciudad de Partida')).toHaveValue('Madrid');
    expect(screen.getByPlaceholderText('Ciudad de Llegada')).toHaveValue('Barcelona');

    expect(screen.getByDisplayValue('Iberia')).toBeInTheDocument();
  });

  it('debe llamar a onFilterChange con los parámetros correctos cuando se cambia "Ciudad de Partida"', () => {
    render(<FilterGroup {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Ciudad de Partida'), {
      target: { value: 'Sevilla' },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      departureCity: 'Sevilla',
      arrivalCity: 'Barcelona',
      airline: 'Iberia',
    });
  });

  it('debe llamar a onFilterChange con los parámetros correctos cuando se cambia "Ciudad de Llegada"', () => {
    render(<FilterGroup {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Ciudad de Llegada'), {
      target: { value: 'Valencia' },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      departureCity: 'Madrid',
      arrivalCity: 'Valencia',
      airline: 'Iberia',
    });
  });

  it('debe llamar a onFilterChange con los parámetros correctos cuando se cambia la "Aerolínea"', () => {
    render(<FilterGroup {...defaultProps} />);

    fireEvent.change(screen.getByDisplayValue('Iberia'), {
      target: { value: 'Vueling' },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      departureCity: 'Madrid',
      arrivalCity: 'Barcelona',
      airline: 'Vueling',
    });
  });

  it('no debe llamar a onFilterChange si no hay cambios en los filtros', () => {
    render(<FilterGroup {...defaultProps} />);

    expect(mockOnFilterChange).not.toHaveBeenCalled();
  });
});
