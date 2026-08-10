import { useState } from 'react';
import type { Prize } from '../types';
import { ConfirmPopup } from './ConfirmPopup';
import { Modal } from './Modal';

interface MysteryModalProps {
  prize: Prize;
  onClose: () => void;
  onConfirmFound: () => void;
}

export function MysteryModal({ prize, onClose, onConfirmFound }: MysteryModalProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <Modal onClose={onClose} labelledBy="mystery-modal-title">
        <h2 id="mystery-modal-title" className="modal-title">
          Загадка №{prize.id}
        </h2>
        <p className="mystery-text">{prize.mysteryText}</p>
        <button type="button" className="btn btn--primary" onClick={() => setConfirming(true)}>
          Нашёл!
        </button>
      </Modal>
      {confirming && (
        <ConfirmPopup
          onCancel={() => setConfirming(false)}
          onConfirm={() => {
            setConfirming(false);
            onConfirmFound();
          }}
        />
      )}
    </>
  );
}
