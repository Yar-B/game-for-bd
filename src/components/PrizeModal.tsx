import type { Prize } from '../types';
import { Modal } from './Modal';

interface PrizeModalProps {
  prize: Prize;
  isLast: boolean;
  onClose: () => void;
}

export function PrizeModal({ prize, isLast, onClose }: PrizeModalProps) {
  return (
    <Modal onClose={onClose} labelledBy="prize-modal-title" className="prize-modal">
      <h2 id="prize-modal-title" className="modal-title">
        Приз найден!
      </h2>
      <img
        src={`${import.meta.env.BASE_URL}${prize.imagePath}`}
        alt={`Приз №${prize.id}`}
        className="prize-image"
      />
      {isLast && (
        <p className="prize-final">
          Все 12 призов найдены — квест пройден. Спасибо, что играли!
        </p>
      )}
      <button type="button" className="btn btn--ghost" onClick={onClose}>
        Закрыть
      </button>
    </Modal>
  );
}
