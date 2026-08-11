import { useEffect, useRef, useState } from 'react';
import { PrizeStatus, type Prize } from '../types';
import './Card.css';

interface CardProps {
  cardId: number;
  prize?: Prize;
  onClick: (cardId: number) => void;
}

export function Card({ cardId, prize, onClick }: CardProps) {
  const status = prize?.status ?? PrizeStatus.NOT_OPEN;
  const prevStatus = useRef(status);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevStatus.current !== status) {
      prevStatus.current = status;
      setIsFlipping(true);
      const timer = window.setTimeout(() => setIsFlipping(false), 600);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  const statusClass =
    status === PrizeStatus.OPEN_AND_COMLETE
      ? 'card--complete'
      : status === PrizeStatus.ONLY_OPEN
        ? 'card--open'
        : 'card--closed';

  const label =
    status === PrizeStatus.OPEN_AND_COMLETE
      ? `Приз №${cardId} найден`
      : status === PrizeStatus.ONLY_OPEN
        ? `Загадка №${cardId} получена, приз ещё не найден`
        : `Карточка №${cardId}, закрыта`;

  return (
    <button
      type="button"
      className={`card ${statusClass}${isFlipping ? ' card--flip' : ''}`}
      onClick={() => onClick(cardId)}
      aria-label={label}
    >
      <span className="card__inner">
        {status === PrizeStatus.OPEN_AND_COMLETE && prize ? (
          <img
            src={`${import.meta.env.BASE_URL}${prize.imagePath}`}
            alt=""
            className="card__thumb"
          />
        ) : status === PrizeStatus.ONLY_OPEN ? (
          <>
            <span className="card__icon" aria-hidden="true">
              ✦
            </span>
            <span className="card__label">загадка ждёт</span>
          </>
        ) : (
          <span className="card__number">?</span>
        )}
      </span>
    </button>
  );
}
