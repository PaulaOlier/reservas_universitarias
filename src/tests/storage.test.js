// src/tests/storage.test.js
import { beforeEach, expect, test } from 'vitest';
import { addReservation, loadData } from '../services/storage.js';

beforeEach(() => {
  localStorage.clear();
});

// Mejora: validación adicional de campos en addReservation()

test('no permite reservas duplicadas', () => {
  const r = { name: 'Pau', date: '2025-10-20', hour: '10:00', spaceId: 'aula-101' };
  addReservation(r);
  expect(() => addReservation(r)).toThrow();
});

test('guarda y carga reservas', () => {
  const r = { name: 'Carlos', date: '2025-11-01', hour: '08:00', spaceId: 'lab-ia' };
  const created = addReservation(r);
  const data = loadData();
  expect(data.reservations.some(rr => rr.id === created.id)).toBe(true);
});
//Verificacion y en esta rama todo esta bien 