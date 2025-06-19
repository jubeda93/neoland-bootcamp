import { getAPIData } from './getAPIData.js'
import { checkUserLogged } from './checkUserLogged.js'
import { Workout } from './classes/Workout.js'


window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

   let addWorkout = document.getElementById('classForm') 
   addWorkout?.addEventListener('submit', createWorkout)
   let buscarWorkout = document.getElementById('searchForm')
   buscarWorkout?.addEventListener('submit', readWorkouts)

   const adminTable = document.getElementById('tbodyWorkouts')
    adminTable?.addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteWorkout')) {
      const workoutId = event.target.dataset.id
      const confirmar = confirm('¿Seguro que quieres borrar esta clase?')
      if (confirmar) {
        await deleteWorkout(workoutId)
        await readWorkouts()
      }
    }
  });
   checkUserLogged()
   fechaMin()
   
}
   

async function createWorkout(event) {
  event.preventDefault()

  const hora = document.getElementById('horaWorkout').value
  const fecha = document.getElementById('fechaWorkout').value
  const plazas = parseInt(document.getElementById('plazasWorkout').value)
  const disciplina = document.getElementById('disciplina').value
    
  if (plazas > 20) {
      alert('El numero maximo de plazas es 20')
      throw new Error('El número máximo de plazas es 20.')
    } 

  if (!hora || !fecha || isNaN(plazas || !disciplina)) {
    alert('Por favor, rellena todos los campos correctamente.')
    return
  }

  const newWorkout = new Workout(hora,fecha,plazas,disciplina)

  try {
    const response = await getAPIData('/api/create/workout', 'POST', newWorkout)
    if (response?.acknowledged) {
      alert('Clase creada correctamente')
    } else {
      alert('Error al crear la clase')
    }
  } catch (error) {
    console.error('Error al crear la clase:', error)
    alert('Hubo un problema al crear la clase. Por favor, inténtalo de nuevo.')
  }

}

function fechaMin() {
  const dateInput = document.getElementById('fechaWorkout')
  const minDate = new Date().toISOString().split('T')[0]
  dateInput.min = minDate
}


async function readWorkouts(e) {
  e.preventDefault()
    const selectedDate = document.getElementById('searchDate').value
    if (!selectedDate) {
        alert('Por favor, selecciona una fecha para buscar.')
        return
    }

    const workouts = await getAPIData(`/api/read/workouts/${selectedDate}`, 'GET')

    const tablaWorkouts = document.getElementById('classTable')
    tablaWorkouts.classList.remove('hidden')
    renderTablaWorkouts(workouts)

}

function renderTablaWorkouts(workout) {
    const tbody = document.getElementById('tbodyWorkouts')
    tbody.innerHTML = ''
    if (!workout.length) {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td colspan="6">No hay workouts para esta fecha</td>`
        tbody.appendChild(tr)
        return
    }
    
    workout.forEach( workout => {
        const emailsApuntados = workout.usuarios.join('<br>')
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${workout.hora}</td>
        <td>${workout.disciplina}</td>
        <td>${workout.plazas}</td>
        <td>${workout.usuarios.length}</td>
        <td class="apuntados">${emailsApuntados}</td>
        <td><button class="deleteWorkout" data-id="${workout._id}"> 🗑️ Borrar Clase</button></td>
        `   
        tbody.appendChild(tr)
    })
}


async function deleteWorkout(workoutId) {
  try {
    const response = await getAPIData(`/api/delete/workout/${workoutId}`, 'DELETE');
    

    if (response.success) {
      return alert('No se pudo borrar la clase');
      // recarga la tabla
    } else {
      alert(response.message ||  'Clase borrada correctamente');
    }
  } catch (error) {
    console.error('Error al borrar la clase:', error);
    alert('Hubo un problema al borrar la clase.');
  }
}

