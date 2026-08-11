import { useEffect, useState } from 'react';
import { loadingImagePaths } from '../data/initialData';
import './LoadingScreen.css';

interface LoadingScreenProps {
  fadingOut?: boolean;
}

const loadingTexts = [
  '✨Загрузка призов...',
  '🎁Поиск подарков...',
  '🔮Придумывание загадок...',
  '🧩Сбор карточек...',
  '🍀Раскладывание сюрпризов...',
];

function pickRandomImagePath(): string | null {
  if (loadingImagePaths.length === 0) return null;
  const index = Math.floor(Math.random() * loadingImagePaths.length);
  return loadingImagePaths[index];
}

function pickRandomLoadingText(): string {
  const index = Math.floor(Math.random() * loadingTexts.length);
  return loadingTexts[index];
}

export function LoadingScreen({ fadingOut = false }: LoadingScreenProps) {
  // Картинка и текст выбираются один раз при появлении экрана (а не при
  // каждом ре-рендере), иначе они бы менялись прямо во время затухания.
  const [imagePath] = useState(pickRandomImagePath);
  const [loadingText] = useState(pickRandomLoadingText);
  const [imageReady, setImageReady] = useState(false);

  // Предзагружаем картинку через Image() и показываем (с анимацией выезда)
  // только когда она реально уже в кэше браузера — иначе на медленной сети
  // можно на секунду увидеть пустое место или битую иконку вместо неё.
  useEffect(() => {
    if (!imagePath) return;
    const img = new Image();
    img.onload = () => setImageReady(true);
    img.src = `${import.meta.env.BASE_URL}${imagePath}`;
    if (img.complete) setImageReady(true);
  }, [imagePath]);

  return (
    <div
      className={`loading-screen${fadingOut ? ' loading-screen--fade-out' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-screen__ring" aria-hidden="true" />
      <p className="loading-screen__text">{loadingText}</p>
      {imagePath && imageReady && (
        <img
          src={`${import.meta.env.BASE_URL}${imagePath}`}
          alt=""
          className="loading-screen__image"
        />
      )}
    </div>
  );
}
