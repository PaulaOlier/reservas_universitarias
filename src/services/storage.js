// src/services/storage.js
const KEY = 'reservas_universitarias_v1';

/**
 * Carga el estado (espacios y reservas) desde localStorage.
 * Si no existe, crea un estado inicial con espacios de ejemplo.
 */
export function loadData() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const init = { spaces: sampleSpaces(), reservations: [] };
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
  return JSON.parse(raw);
}

/** Guarda el estado completo en localStorage */
export function saveData(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/**
 * Agrega una reserva verificando duplicados (spaceId + date + hour).
 * Lanza Error si existe duplicado o datos inválidos.
 */
export function addReservation(reservation) {
  if (!reservation || !reservation.name || !reservation.date || !reservation.hour || !reservation.spaceId) {
    throw new Error('Datos de reserva incompletos.');
  }

  const state = loadData();
  const exists = state.reservations.some(r =>
    r.spaceId === reservation.spaceId &&
    r.date === reservation.date &&
    r.hour === reservation.hour
  );
  if (exists) throw new Error('Ya existe una reserva para ese espacio, fecha y hora.');

  const newRes = { ...reservation, id: Date.now() };
  state.reservations.push(newRes);
  saveData(state);
  return newRes;
}

/** Elimina reserva por id */
export function deleteReservation(id) {
  const state = loadData();
  state.reservations = state.reservations.filter(r => r.id !== id);
  saveData(state);
}

/** Espacios de ejemplo (puedes cambiar rutas a las imágenes en public/assets) */
function sampleSpaces() {
  return [
    { id: 'aula-101', name: 'Aula 101', type: 'Aula', image: 'public/assets/aula1.jpg' },
    { id: 'cancha-1', name: 'Cancha 1', type: 'Cancha', image: 'public/assets/cancha1.jpg' },
    { id: 'lab-ia', name: 'Laboratorio IA', type: 'Laboratorio', image: 'public/assets/lab1.jpg' }
  ];
}
