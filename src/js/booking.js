import { checkUserLogged } from "./checkUserLogged.js"
import { getAPIData } from './getAPIData.js'


window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {
    checkUserLogged();
    setFechaActual()
    const fechaInput = document.getElementById('fecha');
    fechaInput.addEventListener('change', cargarWorkoutsPorFecha);
}

async function reservarWorkout(workoutId) {
    const user = JSON.parse(sessionStorage.getItem('User'))
    const { _id, email } = user;
    await getAPIData(`/api/workout/${workoutId}/reservar`, 'PATCH', { userId: _id, email: email })
}

async function cargarWorkoutsPorFecha() {
    const fecha = document.getElementById('fecha').value
    if (!fecha) return
    const workouts = await getAPIData(`/api/read/workouts/${fecha}`, 'GET')
    renderWorkout(workouts)
}

function setFechaActual() {
    const hoy = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    const dateInput = document.getElementById('fecha');
    if (dateInput) {
        dateInput.value = hoy
        dateInput.min = hoy
        cargarWorkoutsPorFecha()
    }
}

async function renderWorkout(workouts) {
    const tbody = document.getElementById('tbodyBooking')
    tbody.innerHTML = ''

    if (workouts.length === 0 || !workouts) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="6" class="emptyWorkouts">No hay workouts para esta fecha</td>`;
        tbody.appendChild(tr);
        return
    }

    const user = JSON.parse(sessionStorage.getItem('User'))
    const userEmail = user.email

    workouts.forEach(workout => {
        const plazasDisponibles = workout.plazas - workout.usuarios.length
        const yaApuntado = workout.usuarios.includes(userEmail)
        const emailsApuntados = workout.usuarios
            .map(email => email.split('@')[0])
            .join('<br>')

        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${workout.hora}</td>
        <td>${workout.disciplina}</td>
        <td>${workout.plazas}</td>
        <td>${plazasDisponibles}</td>
        <td>
            ${yaApuntado
                ? `<button class="cancelarBtn">Cancelar</button>`
                : `<button ${plazasDisponibles <= 0 ? 'disabled' : ''} class="reservarBtn">Reservar</button>`
            }
        </td>
        <td><div class="scrollable-content">${emailsApuntados}</div></td>
        `

        // Botón Reservar
        const reservarBtn = tr.querySelector('.reservarBtn')
        if (reservarBtn) {
            reservarBtn.addEventListener('click', async () => {
                reservarBtn.disabled = true
                try {
                    await reservarWorkout(workout._id)
                    await cargarWorkoutsPorFecha()
                } catch (err) {
                    console.error('Error al reservar workout:', err)
                    reservarBtn.disabled = false
                }
            })
        }

        // Botón Cancelar
        const cancelarBtn = tr.querySelector('.cancelarBtn')
        if (cancelarBtn) {
            cancelarBtn.addEventListener('click', async () => {
                cancelarBtn.disabled = true
                try {
                    await cancelarReserva(workout._id, userEmail)
                    await cargarWorkoutsPorFecha()
                } catch (err) {
                    console.error('Error al cancelar reserva:', err)
                    cancelarBtn.disabled = false
                }
            })
        }

        tbody.appendChild(tr)
    })
}

async function cancelarReserva(workoutId, email) {
    await getAPIData(`/api/workout/${workoutId}/borrar`, 'PATCH', { email })
}
