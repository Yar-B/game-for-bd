import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ВАЖНО: перед публикацией на GitHub Pages впиши сюда имя своего репозитория.
// Сайт будет жить по адресу https://<твой-логин>.github.io/<репозиторий>/,
// поэтому base должен точно совпадать с именем репозитория, например:
//   base: '/holiday-quest/'
// Если репозиторий называется иначе — замени строку ниже. Если сайт будет
// жить в корне домена (user.github.io без подпапки) — поставь base: '/'.
export default defineConfig({
  base: '/game-for-bd/',
  plugins: [react()],
});
