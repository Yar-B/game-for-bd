import './LoadingScreen.css';

interface LoadingScreenProps {
  fadingOut?: boolean;
}

export function LoadingScreen({ fadingOut = false }: LoadingScreenProps) {
  return (
    <div
      className={`loading-screen${fadingOut ? ' loading-screen--fade-out' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-screen__ring" aria-hidden="true" />
      <p className="loading-screen__text">Готовим квест…</p>
    </div>
  );
}
