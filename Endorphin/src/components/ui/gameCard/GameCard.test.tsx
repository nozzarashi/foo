import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // добавляет метчеры
import { GameCard } from './GameCard';
import { store } from '@/redux/store/store';
import { Provider } from 'react-redux';

// Arrange (Подготовка), этап создания тестовых данных и моков, настройка окружения

// мокаем входные данные
const mockedProps = {
  name: 'Bloodborne',
  imgUrl: 'https://example.com/image.jpg',
  releaseYear: 2015,
  rating: 9.5,
  gameId: 12345,
};

//

describe('GameCard Component', () => {
  test('Должен корректно отображать переданные данные', () => {
    // функция render() из библиотеки testing-library рендери компонент в виртуальном дом для дальнейшего взаимодействия с ним

    render(
      <Provider store={store}>
        <GameCard {...mockedProps} />
      </Provider>
    );

    // screen - это объект предоставляемый библиотекой testing-library. Содержит набор методом для поиска элементов в виртуальном DOM

    const nameElement = screen.getByText(/Bloodborne/i);
    const yearElement = screen.getByText(/2015/);
    const ratingElement = screen.getByText(/9.5/);

    expect(nameElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });
});
