import { useCallback, useEffect, useState } from 'react';
import { initialCodesList, initialPrizesList } from '../data/initialData';
import { PrizeStatus, type Prize } from '../types';

const PRIZES_KEY = 'prizesList';
const CODES_KEY = 'codesList';

function isPrize(value: unknown): value is Prize {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;
  const validStatus =
    p.status === PrizeStatus.NOT_OPEN ||
    p.status === PrizeStatus.ONLY_OPEN ||
    p.status === PrizeStatus.OPEN_AND_COMLETE;
  return (
    typeof p.id === 'number' &&
    typeof p.mysteryText === 'string' &&
    typeof p.imagePath === 'string' &&
    validStatus &&
    (p.cardId === null || typeof p.cardId === 'number')
  );
}

function isPrizesList(value: unknown): value is Prize[] {
  return Array.isArray(value) && value.length > 0 && value.every(isPrize);
}

function isCodesList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((c) => typeof c === 'string' && /^\d{6}$/.test(c));
}

function loadPrizes(): Prize[] {
  try {
    const raw = localStorage.getItem(PRIZES_KEY);
    if (!raw) return initialPrizesList;
    const parsed: unknown = JSON.parse(raw);
    return isPrizesList(parsed) ? parsed : initialPrizesList;
  } catch {
    return initialPrizesList;
  }
}

function loadCodes(): string[] {
  try {
    const raw = localStorage.getItem(CODES_KEY);
    if (!raw) return initialCodesList;
    const parsed: unknown = JSON.parse(raw);
    return isCodesList(parsed) ? parsed : initialCodesList;
  } catch {
    return initialCodesList;
  }
}

function persist(prizes: Prize[], codes: string[]): void {
  localStorage.setItem(PRIZES_KEY, JSON.stringify(prizes));
  localStorage.setItem(CODES_KEY, JSON.stringify(codes));
}

export interface SubmitCodeResult {
  success: boolean;
  error?: string;
}

export function useGameState() {
  const [prizes, setPrizes] = useState<Prize[]>(loadPrizes);
  const [codes, setCodes] = useState<string[]>(loadCodes);

  // Если это самый первый запуск на устройстве и в localStorage ещё пусто —
  // сразу записываем туда стартовые данные, а не ждём первого изменения.
  useEffect(() => {
    if (localStorage.getItem(PRIZES_KEY) === null || localStorage.getItem(CODES_KEY) === null) {
      persist(prizes, codes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitCode = useCallback(
    (cardId: number, rawCode: string): SubmitCodeResult => {
      const code = rawCode.trim().replace(/\D/g, '');
      if (code.length !== 6) {
        return { success: false, error: 'Код должен состоять из 6 цифр' };
      }
      if (!codes.includes(code)) {
        return { success: false, error: 'Малыш, я такой код не давал🤨' };
      }
      const nextPrizeIndex = prizes.findIndex((p) => p.status === PrizeStatus.NOT_OPEN);
      if (nextPrizeIndex === -1) {
        return { success: false, error: 'Все загадки уже открыты' };
      }
      const newCodes = codes.filter((c) => c !== code);
      const newPrizes = prizes.map((p, i) =>
        i === nextPrizeIndex ? { ...p, status: PrizeStatus.ONLY_OPEN, cardId } : p
      );
      setCodes(newCodes);
      setPrizes(newPrizes);
      persist(newPrizes, newCodes);
      return { success: true };
    },
    [codes, prizes]
  );

  const markFound = useCallback(
    (cardId: number) => {
      setPrizes((prev) => {
        const newPrizes = prev.map((p) =>
          p.cardId === cardId && p.status === PrizeStatus.ONLY_OPEN
            ? { ...p, status: PrizeStatus.OPEN_AND_COMLETE }
            : p
        );
        persist(newPrizes, codes);
        return newPrizes;
      });
    },
    [codes]
  );

  const resetProgress = useCallback(() => {
    localStorage.removeItem(PRIZES_KEY);
    localStorage.removeItem(CODES_KEY);
    window.location.reload();
  }, []);

  const getPrizeByCardId = useCallback(
    (cardId: number): Prize | undefined => prizes.find((p) => p.cardId === cardId),
    [prizes]
  );

  const foundCount = prizes.filter((p) => p.status === PrizeStatus.OPEN_AND_COMLETE).length;

  return {
    prizes,
    codesRemaining: codes.length,
    foundCount,
    totalCount: prizes.length,
    submitCode,
    markFound,
    resetProgress,
    getPrizeByCardId,
  };
}
