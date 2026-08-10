import { Modal } from './Modal';

interface ConfirmPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmPopup({ onConfirm, onCancel }: ConfirmPopupProps) {
  return (
    <Modal onClose={onCancel} labelledBy="confirm-popup-title" className="confirm-popup">
      <h3 id="confirm-popup-title" className="modal-title">
        Точно?
      </h3>
      <div className="confirm-actions">
        <button type="button" className="btn btn--primary" onClick={onConfirm}>
          Точнее некуда!
        </button>
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Ой, случайно нажал(
        </button>
      </div>
    </Modal>
  );
}
