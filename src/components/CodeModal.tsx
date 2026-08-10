import { useRef, useState, type ChangeEvent } from 'react';
import type { SubmitCodeResult } from '../hooks/useGameState';
import { Modal } from './Modal';

interface CodeModalProps {
  onClose: () => void;
  onSubmit: (code: string) => SubmitCodeResult;
}

export function CodeModal({ onClose, onSubmit }: CodeModalProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const attempt = (code: string) => {
    const result = onSubmit(code);
    if (!result.success) {
      setError(result.error ?? 'Малыш, я такой код не давал🤨');
      setValue('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Отсекаем всё, кроме цифр, и обрезаем до 6 символов — защита от
    // вставки мусора из буфера обмена и от аппаратной клавиатуры на десктопе.
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 6);
    setValue(digitsOnly);
    if (error) setError(null);
    if (digitsOnly.length === 6) attempt(digitsOnly);
  };

  return (
    <Modal onClose={onClose} labelledBy="code-modal-title">
      <h2 id="code-modal-title" className="modal-title">
        Введи код находки
      </h2>
      <p className="modal-hint">Капибариус выдал код — впиши все 6 цифр.</p>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        autoComplete="off"
        autoFocus
        value={value}
        onChange={handleChange}
        className="code-input"
        aria-label="Код из 6 цифр"
      />
      {error && (
        <p className="modal-error" role="alert">
          {error}
        </p>
      )}
    </Modal>
  );
}
