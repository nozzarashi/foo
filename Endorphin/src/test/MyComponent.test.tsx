import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // добавляет метчеры
import userEvent from '@testing-library/user-event';

import { MyComponent } from '@/test/MyComponent';

describe('MyComponent', () => {
  test('Показываем начальное значение', () => {
    render(<MyComponent />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test(`Значение должно увеличиваться при клике на кнопку`, async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button', { name: /Нажми на меня/i }));

    const nextValue = screen.getByText(/1/);

    expect(nextValue).toBeInTheDocument();
  });
});
