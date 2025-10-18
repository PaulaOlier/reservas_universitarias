// src/main.js
import { loadData, addReservation, deleteReservation } from './services/storage.js';

const form = document.getElementById('reservation-form');
const selectEl = document.getElementById('space-select');
const spaceList = document.getElementById('space-list');
const reservationsList = document.getElementById('reservations-list');

let state = loadData();

renderAll();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    const spaceId = selectEl.value;

    // Validaciones simples aquí: se delega la validación de duplicados a storage
    if (!name || !date || !hour || !spaceId) throw new Error('Completa todos los campos.');

    const today = new Date().toISOString().slice(0, 10);
    if (date < today) throw new Error('No puedes reservar en el pasado.');

    const newRes = addReservation({ name, date, hour, spaceId });
    state = loadData();
    renderReservations();
    form.reset();
    alert('Reserva creada ✅');

  } catch (err) {
    alert('Error: ' + err.message);
  }
});

function renderAll() {
  renderSpaces();
  renderSelect();
  renderReservations();
}

function renderSpaces() {
  spaceList.innerHTML = '';
  state.spaces.forEach(s => {
    const div = document.createElement('div');
    div.className = 'space-card';
    div.innerHTML = `
      <h3>${s.name} (${s.type})</h3>
      <img src="${s.image}" alt="${s.name}">
    `;
    spaceList.appendChild(div);
  });
}

function renderSelect() {
  selectEl.innerHTML = '';
  state.spaces.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    selectEl.appendChild(opt);
  });
}

function renderReservations() {
  const s = loadData(); // siempre recargar desde storage para coherencia
  reservationsList.innerHTML = '';
  s.reservations
    .slice()
    .sort((a,b)=> b.id - a.id) // mostrar últimas primero
    .forEach(r => {
      const card = document.createElement('div');
      card.className = 'reservation-card';
      card.innerHTML = `
        <div>
          <div><strong>${escapeHtml(r.name)}</strong></div>
          <div>${r.date} — ${r.hour}</div>
          <div>${r.spaceId}</div>
        </div>
        <div>
          <button data-id="${r.id}" class="cancel-btn">Cancelar</button>
        </div>
      `;
      reservationsList.appendChild(card);
    });

  // delegación de eventos para todos los botones Cancelar
  reservationsList.querySelectorAll('.cancel-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = Number(e.currentTarget.dataset.id);
      if (confirm('¿Cancelar reserva?')) {
        deleteReservation(id);
        state = loadData();
        renderReservations();
      }
    });
  });
}

/** Pequeña función para escapar texto que viene del usuario (previene XSS simple) */
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' })[m];
  });
}
