import { render, screen, fireEvent } from '@testing-library/react';
import PersonForm from 'app/components/molecules/PersonForm/PersonForm';

const mockOnChange = jest.fn();

const defaultProps = {
  id: 1,
  nameValue: 'Juan Pérez',
  idValue: '12345678',
  phoneValue: '555-1234',
  onChange: mockOnChange,
};

describe('PersonForm', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('debe renderizar correctamente los inputs con los valores de los props', () => {
    render(<PersonForm {...defaultProps} />);

    expect(screen.getByPlaceholderText('Nombre completo')).toHaveValue('Juan Pérez');
    expect(screen.getByPlaceholderText('Número de identificación')).toHaveValue('12345678');
    expect(screen.getByPlaceholderText('Número de celular')).toHaveValue('555-1234');
  });

  it('debe llamar a la función onChange con los parámetros correctos cuando se cambia un campo', () => {
    render(<PersonForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Nombre completo'), {
      target: { value: 'Carlos González' },
    });


    expect(mockOnChange).toHaveBeenCalledWith(1, 'name', 'Carlos González');

    fireEvent.change(screen.getByPlaceholderText('Número de identificación'), {
      target: { value: '87654321' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(1, 'idNumber', '87654321');

    fireEvent.change(screen.getByPlaceholderText('Número de celular'), {
      target: { value: '555-9876' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(1, 'phoneNumber', '555-9876');
  });

  it('debe no llamar a onChange si no hay cambio', () => {
    render(<PersonForm {...defaultProps} />);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
