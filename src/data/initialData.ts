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
//   3. loadingImagePaths — список картинок, которые выезжают снизу экрана на
//      загрузочном экране (при каждом открытии страницы берётся случайная
//      из списка). Пути такие же относительные, файлы кладутся в
//      public/images.
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
    mysteryText: 'Они обязательно пригодятся для исполнения твоих желаний🥰 Находятся в новой старой мебели🤓',
    imagePath: 'images/candles.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 2,
    mysteryText: 'Это для перекуса! Чтобы поднять настроение❤️ Они решили измерить свой вес🐍',
    imagePath: 'images/snake-marm.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 3,
    mysteryText: 'Ну какой же праздник без него?🎂 Сама знаешь где искать😋',
    imagePath: 'images/cake.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 4,
    mysteryText: 'Говорят, что может придавать ослепительный эффект... для улыбки, решил затаиться рядом с себе подобными💥',
    imagePath: 'images/tictac.avif',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 5,
    mysteryText: 'Сюрприз!🤩 Меня очень все любят, тем более детки, поэтому сегодня буду рядом с ними, кукареку!',
    imagePath: 'images/kinder.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 6,
    mysteryText: 'Давно меня не ели, совсем что ли про меня забыли!🥲 Буду ждать у выхода😡',
    imagePath: 'images/fruittella.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 7,
    mysteryText: 'Классная штука, но сама по себе не очень интересная🤔 Бабушка у нас спала и ей разве было удобно???',
    imagePath: 'images/flash.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 8,
    mysteryText: 'Мы настолько соленые, что решили помыться!🥴',
    imagePath: 'images/marm2.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 9,
    mysteryText: 'Скорее убери меня отсюда! Тут можно получить ожоги, а я люблю водичку и 🍊',
    imagePath: 'images/capy.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 10,
    mysteryText: 'Это еще к чаю, все-таки день рождения!🥳 Можешь найти рядом с подозреваемыми🦹🏿‍♀️',
    imagePath: 'images/choco.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 11,
    mysteryText: 'Я уже устала лежать на подоконнике в зеленой комнате на 2 этаже!🤬 Забирай меня наконец!',
    imagePath: 'images/ear-stick.png',
    status: PrizeStatus.NOT_OPEN,
    cardId: null,
  },
  {
    id: 12,
    mysteryText: 'Ну как так-то! Новенькая, а завалялась среди пустых коробок!',
    imagePath: 'images/camera.png',
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

// Картинки для загрузочного экрана. Выезжает снизу на 1/3 экрана — при каждом
// открытии страницы случайно берётся одна из этого списка. Можно оставить
// один путь (тогда картинка всегда одна и та же) или добавить сколько угодно
// своих — чем их больше, тем разнообразнее ощущается загрузка.
export const loadingImagePaths: string[] = [
  'images/loading-banner1.png',
  'images/loading-banner2.png',
  'images/loading-banner3.png',
  'images/loading-banner4.png',
  'images/loading-banner5.png',
  'images/loading-banner6.png',
  'images/loading-banner7.png',
  'images/loading-banner8.png',
  'images/loading-banner9.png',
  'images/loading-banner10.png',
];
