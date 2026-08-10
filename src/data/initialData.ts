// ============================================================================
// ЗДЕСЬ РЕДАКТИРУЮТСЯ ЗАГАДКИ, КОДЫ И ПУТИ К КАРТИНКАМ.
//
// Этот файл — единственное место, которое нужно менять организатору перед
// праздником:
//   1. initialPrizesList — 12 призов. Впиши в mysteryText свой текст загадки
//      (куда идти, что искать). imagePath — путь к картинке приза внутри
//      папки public/images (файлы туда нужно положить самостоятельно,
//      см. README.md, раздел «Как заменить контент»).
//   2. initialCodesList — 12 секретных кодов, ровно по 6 цифр каждый,
//      в виде строк (важно — именно строк, не чисел, иначе потеряются
//      ведущие нули). Порядок кодов не важен: любой код подходит к любой
//      карточке, а вот порядок загадок в initialPrizesList — это и есть
//      порядок их открытия в игре, он должен идти от первой к последней.
//
// Данные из этого файла попадают в localStorage только один раз — при самом
// первом запуске игры на устройстве. Если хочешь сбросить уже начатую игру
// на телефоне после правки файла — воспользуйся скрытой кнопкой сброса
// (см. README.md).
// ============================================================================

import { PrizeStatus, type Prize } from '../types';

export const initialPrizesList: Prize[] = [
  {
    id: 1,
    mysteryText: 'Загадка №1 — здесь будет текст подсказки',
    imagePath: 'images/prize-01.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 2,
    mysteryText: 'Загадка №2 — здесь будет текст подсказки',
    imagePath: 'images/prize-02.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 3,
    mysteryText: 'Загадка №3 — здесь будет текст подсказки',
    imagePath: 'images/prize-03.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 4,
    mysteryText: 'Загадка №4 — здесь будет текст подсказки',
    imagePath: 'images/prize-04.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 5,
    mysteryText: 'Загадка №5 — здесь будет текст подсказки',
    imagePath: 'images/prize-05.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 6,
    mysteryText: 'Загадка №6 — здесь будет текст подсказки',
    imagePath: 'images/prize-06.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 7,
    mysteryText: 'Загадка №7 — здесь будет текст подсказки',
    imagePath: 'images/prize-07.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 8,
    mysteryText: 'Загадка №8 — здесь будет текст подсказки',
    imagePath: 'images/prize-08.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 9,
    mysteryText: 'Загадка №9 — здесь будет текст подсказки',
    imagePath: 'images/prize-09.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 10,
    mysteryText: 'Загадка №10 — здесь будет текст подсказки',
    imagePath: 'images/prize-10.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 11,
    mysteryText: 'Загадка №11 — здесь будет текст подсказки',
    imagePath: 'images/prize-11.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 12,
    mysteryText: 'Загадка №12 — здесь будет текст подсказки',
    imagePath: 'images/prize-12.svg',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
];

// Коды-заглушки. Каждый — ровно 6 цифр, хранится строкой. Замени на реальные
// перед праздником — можно в любом порядке, главное чтобы их тоже было 12.
export const initialCodesList: string[] = [
  '104729',
  '582043',
  '930156',
  '267481',
  '715360',
  '448902',
  '391647',
  '826015',
  '573298',
  '619734',
  '285461',
  '947083',
];
