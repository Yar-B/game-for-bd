import type { Prize } from '../types';
import { Card } from './Card';
import './CardGrid.css';

interface CardGridProps {
  prizes: Prize[];
  onCardClick: (cardId: number) => void;
}

const SLOT_IDS = Array.from({ length: 12 }, (_, i) => i + 1);

// Карточки на экране — это просто пронумерованные слоты 1..12. Они не
// привязаны к конкретному призу заранее: связь появляется только тогда,
// когда игрок вводит верный код (см. useGameState.submitCode).
export function CardGrid({ prizes, onCardClick }: CardGridProps) {
  return (
    <div className="card-grid">
      {SLOT_IDS.map((cardId) => (
        <Card
          key={cardId}
          cardId={cardId}
          prize={prizes.find((p) => p.cardId === cardId)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
