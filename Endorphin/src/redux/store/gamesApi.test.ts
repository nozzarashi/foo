import { buildGetGamesUrl } from './gamesApi';

describe('Функция buildGetGamesUrl', () => {
  const MOCKED_DATE = '2025-08-05';

  // специальная функция jest, вот эта функция будет выполняться ПЕРЕД каждым тестом
  // тут говорим jest, что нужно перехватить время и задаем ФИКСИРОВАННОЕ время, которое не будет меняться при каждом тесте, иначе всему тесту пизда

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(MOCKED_DATE));
  });

  // а эта шляпа будет выполняться ПОСЛЕ каждого теста, чтоб ниче не сломалось, просто возвращаем время в нормальное (текущее)

  afterEach(() => {
    jest.useRealTimers();
  });

  test('должен возвращать правильный URL для получения списка игр с параметрами по умолчанию', () => {
    // 1 ЭТАП: Arrange

    const arg = {
      sorting: '-rating',
    };

    // 2 ЭТАП: Act
    const resultUrl = buildGetGamesUrl(arg);

    // 3 ЭТАП: Assert

    expect(resultUrl).toContain('&page=1');
    expect(resultUrl).toContain('&ordering=-rating');
    expect(resultUrl).toContain('&dates=1970-01-01,2025-08-05');

    expect(resultUrl).not.toContain('&genres=');
    expect(resultUrl).not.toContain('&search=');
  });

  test('должен корректно собирать url со всеми предоставленными параметрами', () => {
    const arghs = {
      page: 10,
      genres: [
        { name: 'Action', slug: 'action' },
        {
          name: 'Adventure',
          slug: 'adventure',
        },
        {
          name: 'Strategy',
          slug: 'strategy',
        },
      ],
      searchValue: 'Dota 2',
      sorting: '-rating',
    };

    const resultUrl = buildGetGamesUrl(arghs);
    expect(resultUrl).toContain('&page=10');
    expect(resultUrl).toContain('&genres=action,adventure,strategy');
    expect(resultUrl).toContain('&ordering=-rating');
    expect(resultUrl).toContain('&dates=1970-01-01,2025-08-05');
  });
});
