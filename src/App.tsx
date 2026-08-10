import { useEffect, useRef, useState } from 'react';
import './App.css';
import { CardGrid } from './components/CardGrid';
import { CodeModal } from './components/CodeModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Modal } from './components/Modal';
import { MysteryModal } from './components/MysteryModal';
import { PrizeModal } from './components/PrizeModal';
import { useGameState } from './hooks/useGameState';
import { PrizeStatus } from './types';

type ActiveModal =
  | { type: 'code'; cardId: number }
  | { type: 'mystery'; cardId: number }
  | { type: 'prize'; cardId: number }
  | { type: 'no-codes' }
  | null;

type LoadingPhase = 'loading' | 'fading' | 'ready';

const LOADING_MS = 3000;
const FADE_MS = 500;
const RESET_HOLD_MS = 3000;

function App() {
  const [phase, setPhase] = useState<LoadingPhase>('loading');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const holdTimer = useRef<number | null>(null);

  const {
    prizes,
    codesRemaining,
    foundCount,
    totalCount,
    submitCode,
    markFound,
    resetProgress,
    getPrizeByCardId,
  } = useGameState();

  // Загрузочный экран показывается ровно 3 секунды при каждом открытии
  // страницы, затем плавно (400–600 мс) уступает место сетке карточек.
  useEffect(() => {
    const toFading = window.setTimeout(() => setPhase('fading'), LOADING_MS);
    const toReady = window.setTimeout(() => setPhase('ready'), LOADING_MS + FADE_MS);
    return () => {
      window.clearTimeout(toFading);
      window.clearTimeout(toReady);
    };
  }, []);

  const closeModal = () => setActiveModal(null);

  const handleCardClick = (cardId: number) => {
    const prize = getPrizeByCardId(cardId);
    if (!prize) {
      setActiveModal(codesRemaining === 0 ? { type: 'no-codes' } : { type: 'code', cardId });
      return;
    }
    if (prize.status === PrizeStatus.ONLY_OPEN) {
      setActiveModal({ type: 'mystery', cardId });
    } else if (prize.status === PrizeStatus.OPEN_AND_COMLETE) {
      setActiveModal({ type: 'prize', cardId });
    }
  };

  // Неприметный сброс прогресса для организатора: долгое нажатие (3 с) на
  // заголовок очищает localStorage и перезагружает игру. См. README.md.
  const clearHoldTimer = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };
  const startHold = () => {
    clearHoldTimer();
    holdTimer.current = window.setTimeout(resetProgress, RESET_HOLD_MS);
  };

  return (
    <>
      {phase !== 'ready' && <LoadingScreen fadingOut={phase === 'fading'} />}

      <div className={`app${phase === 'ready' ? ' app--visible' : ''}`} aria-hidden={phase !== 'ready'}>
        <header className="app__header">
          <h1
            className="app__title"
            onPointerDown={startHold}
            onPointerUp={clearHoldTimer}
            onPointerLeave={clearHoldTimer}
            onContextMenu={(e) => e.preventDefault()}
          >
            Квест находок
          </h1>
          <p className="app__progress">
            Найдено {foundCount} из {totalCount}
          </p>
        </header>
        <main className="app__main">
          <CardGrid prizes={prizes} onCardClick={handleCardClick} />
        </main>
      </div>

      {activeModal?.type === 'code' && (
        <CodeModal
          onClose={closeModal}
          onSubmit={(code) => {
            const result = submitCode(activeModal.cardId, code);
            if (result.success) {
              setActiveModal({ type: 'mystery', cardId: activeModal.cardId });
            }
            return result;
          }}
        />
      )}

      {activeModal?.type === 'mystery' &&
        (() => {
          const prize = getPrizeByCardId(activeModal.cardId);
          if (!prize) return null;
          const cardId = activeModal.cardId;
          return (
            <MysteryModal
              prize={prize}
              onClose={closeModal}
              onConfirmFound={() => {
                markFound(cardId);
                setActiveModal({ type: 'prize', cardId });
              }}
            />
          );
        })()}

      {activeModal?.type === 'prize' &&
        (() => {
          const prize = getPrizeByCardId(activeModal.cardId);
          if (!prize) return null;
          return (
            <PrizeModal prize={prize} isLast={foundCount === totalCount} onClose={closeModal} />
          );
        })()}

      {activeModal?.type === 'no-codes' && (
        <Modal onClose={closeModal} labelledBy="no-codes-title">
          <h2 id="no-codes-title" className="modal-title">
            Коды закончились
          </h2>
          <p className="modal-hint">
            Все секретные коды уже разошлись. Если карточка ещё закрыта — значит приза для неё не
            осталось.
          </p>
          <button type="button" className="btn btn--ghost" onClick={closeModal}>
            Понятно
          </button>
        </Modal>
      )}
    </>
  );
}

export default App;
