// import { text } from "body-parser"
import { checkUserLogged } from "./checkUserLogged.js"
import { getAPIData } from "./getAPIData.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

  checkUserLogged()
 
   showAllUsers()
    let editUser = document.getElementById('editUserAll')
    editUser?.addEventListener('click', enableEditUsers)
    let showUsers = document.getElementById('showUsersBTN')
    showUsers?.addEventListener('click', showAllUsers)
    let changeRol = document.getElementById('saveUsersBTN')
    changeRol?.addEventListener('click', saveUsersChanges)
    let mostrarNuevos = document.getElementById('newUsersBTN')
    mostrarNuevos?.addEventListener('click', showNewUsers)
    let showDeleteCheck = document.getElementById('DeleteUsers')
    showDeleteCheck?.addEventListener('click', deleteSelectUsers)
    let tablaUsuarios= document.getElementById('gestionUsuariosBTN')
    tablaUsuarios?.addEventListener('click', showUsersTable)
    let formNewUser= document.getElementById('newUserAdminBTN')
    formNewUser?.addEventListener('click', showNewUserForm)
}

const API_PORT = location.port ? `:${1993}` : ''

//ShowAllUsers muestra una lista de todos los usuarios
async function showAllUsers() {

  document.getElementById('tbodyUsers').innerHTML = '';
  document.getElementById('tableTittle').textContent = 'Lista de usuarios:'
  document.getElementById('showUsersBTN').classList.add('hidden')
  document.getElementById('subTableTittle').classList.add('hidden')
  document.getElementById('tablaUsuarios').classList.remove('hidden')
  document.getElementById('DeleteUsers').classList.remove('hidden')
  document.getElementById('editUserAll').classList.remove('hidden')


  let users = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/users`, 'GET',);

    const dataUser = users.map((user) => {
    return{
      email: user.email,
      rol: user.rol,
      tarifa: user.tarifa,
      _id: user._id
    }
  })
  console.log('Mostrando todos los usuarios: ' +  dataUser.length)
  for (let i=0; i < dataUser.length; i++){
    const row = document.createElement('tr')
    const cellEmail = document.createElement('td')
    const cellRol = document.createElement('td')
    const cellTarifa = document.createElement('td')
    const cellCheck = document.createElement('td')
    const check = document.createElement('input')
    check.type = 'checkbox'
    check.classList.add('check')
    cellCheck.appendChild(check)
    
    

    row.classList.add('userRow')
    row.setAttribute('rol', dataUser[i].rol)
    row.setAttribute('tarifa', dataUser[i].tarifa)
    row.setAttribute('email', dataUser[i].email)
    row.setAttribute('id', dataUser[i]._id)

    

    cellRol.textContent = dataUser[i].rol
    cellEmail.textContent = dataUser[i].email
    cellTarifa.textContent = dataUser[i].tarifa

    row.appendChild(cellEmail)
    row.appendChild(cellRol)
    row.appendChild(cellTarifa)
    row.appendChild(cellCheck)

    document.getElementById('tbodyUsers').appendChild(row);
    document.getElementById('newUsersBTN').classList.remove('hidden')
    document.getElementById('editUserAll').classList.remove('hidden')
    document.getElementById('saveUsersBTN').classList.add('hidden')
   
  }

}

async function showUsersTable(){
  document.getElementById('gestionUsuariosForm').classList.remove('hidden')
  document.getElementById('gestionUsuariosBTN').classList.add('hidden')
  document.getElementById('newUserAdminBTN').classList.remove('hidden')
  const signInForm = document.querySelector('sign-in-lit')
  signInForm.shadowRoot.getElementById('signIn').classList.add('hidden')
  

}


//En esta funcion hago una serie de modificaciones en el componente WEB para el interfaz del Admin
async function showNewUserForm() {
  document.getElementById('gestionUsuariosBTN').classList.remove('hidden')
  document.getElementById('gestionUsuariosForm').classList.add('hidden')
  console.log('Sacamos registerForm')
   const signInForm = document.querySelector('sign-in-lit')
   signInForm.shadowRoot.getElementById('signIn').classList.remove('hidden')
   signInForm.shadowRoot.getElementById('userLog').classList.add('hidden')
   signInForm.shadowRoot.getElementById('userLogText2').classList.add('hidden')
   signInForm.shadowRoot.getElementById('userLogText').classList.add('hidden')
   signInForm.shadowRoot.getElementById('signInTitle').textContent = 'Registrar nuevo usuario'
   signInForm.shadowRoot.getElementById('signInButton').textContent = 'Dar de alta'
   

}

// Funcion para mostrar solamente los usuarios nuevos (trial)
async function showNewUsers() {
  document.getElementById('tableTittle').textContent = 'Usuarios nuevos:'
  document.getElementById('subTableTittle').classList.remove('hidden')

  let trialCount = 0
  const rows = document.getElementsByClassName('userRow')
  for (let i=0; i < rows.length; i++){
    const userRol = rows[i].getAttribute('rol')
    if (userRol !== 'trial'){
      rows[i].classList.add('hidden')
    } if (userRol === 'trial'){
      
      trialCount++
      rows[i].classList.remove('hidden')
    }
  }

  if (trialCount === 0){
    document.getElementById('tableTittle').textContent = 'No hay usuarios nuevos'
    document.getElementById('subTableTittle').classList.add('hidden')
    document.getElementById('tablaUsuarios').classList.add('hidden')
    document.getElementById('DeleteUsers').classList.add('hidden')
    document.getElementById('editUserAll').classList.add('hidden')
  }

  document.getElementById('newUsersBTN').classList.add('hidden')
  document.getElementById('showUsersBTN').classList.remove('hidden')
}


// Funcion para habilitar los selectores en la tabla (rol y tarifa)

async function enableEditUsers() {
  const rows = document.getElementsByClassName('userRow')
  const rolOptions = ['trial', 'cliente', 'coach', 'admin']
  const tarifaOptions = ['trial','scaled', 'pro', 'elite','coach', 'admin']
  document.getElementById('showUsersBTN').classList.remove('hidden')


  for (let i=0 ; i< rows.length; i++){
    const cells = rows[i].getElementsByTagName('td')
    const currentRol = cells[1].textContent
    const currentTarifa = cells[2].textContent

    const rolSelector = document.createElement('select')
    const tarifaSelector = document.createElement('select')
    rolSelector.style.textTransform = 'capitalize';
    tarifaSelector.style.textTransform = 'capitalize';
    rolSelector.classList.add('selectRol')
    tarifaSelector.classList.add('selectTarifa')

    rolOptions.forEach(option => {
      const opt = document.createElement('option')
      opt.value = option
      opt.textContent = option
      if (option === currentRol) opt.selected = true
      rolSelector.appendChild(opt)
    })

    tarifaOptions.forEach(option => {
      const opt = document.createElement('option')
      opt.value = option
      opt.textContent = option
      if (option === currentTarifa) opt.selected = true
      tarifaSelector.appendChild(opt)
    })

    cells[1].innerHTML = ''; 
    cells[1].appendChild(rolSelector);

    cells[2].innerHTML = ''; 
    cells[2].appendChild(tarifaSelector);
    }
    document.getElementById('editUserAll').classList.add('hidden')
    document.getElementById('saveUsersBTN').classList.remove('hidden')
    
  }

// ============ Funcion para actualizar el rol de lo usuarios

async function saveUsersChanges() {
  const rows = document.getElementsByClassName('userRow')
  for (let i = 0; i < rows.length; i++) {
    const rolSelector = rows[i].getElementsByClassName('selectRol')[0]
    const tarifaSelector = rows[i].getElementsByClassName('selectTarifa')[0]
    const newRol = rolSelector.value
    const newTarifa = tarifaSelector.value
    const _id = rows[i].id
    const currentEmail = rows[i].getAttribute('email')
    const currentRol = rows[i].getAttribute('rol')
    const currentTarifa = rows[i].getAttribute('tarifa')
    
    if (newRol !== currentRol || newTarifa !== currentTarifa) {
      let payload = {rol: newRol, tarifa: newTarifa} 
      await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${_id}`, 'PUT', payload)
      console.log('Actulizando datos del usuario ' + currentEmail)
     }
  } 
  showAllUsers()
}



  //=========== Funcion para borrar los usuarios seleccionados ===============//
  async function deleteSelectUsers() {
    const rows = document.getElementsByClassName('userRow')
    const selectedUsers = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const checkbox = document.getElementsByClassName('check')[i];
      if (checkbox.checked) {
        selectedUsers.push(row.id);
      }
    }

    // Hacemos una verificacion antes de borrar los usuarios y contemplamos los casos posibles 
    
    if (selectedUsers.length > 0) {
      const confirmDelete = confirm(`¿Estás seguro de eliminar a los usuarios seleccionados?`)
    if (confirmDelete) {
      for (let i = 0; i < selectedUsers.length; i++) {
      const _id = selectedUsers[i]
      await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/users/${_id}`, 'DELETE',)
    }
      showAllUsers()
    } else {
      console.log('Eliminación cancelada')
    }
    } else {
    console.error('No hay usuarios seleccionados')
    alert('Debes seleccionar al menos un usuario')
    }
  }

 
























// async function saveUsersChanges() {
//   const roles = document.getElementsByClassName('rol-selector');
//   const tarifas = document.getElementsByClassName('tarifa-selector');
//   const userIds = document.getElementsByClassName('check');

//   console.log(roles)
//   console.log(tarifas)

//   const updates = [];

//   for (let i = 0; i < roles.length; i++) {
//     const rol = roles[i].value;
//     const tarifa = tarifas[i].value;
//     const _id = userIds[i].value;

//     updates.push({
//       _id,
//       rol,
//       tarifa,
//     });
    
//     await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${_id}`, 'PUT', JSON.stringify({rol,tarifa}));
  
    
//   }
// }

// // Funcion para agregar class show-trial y ocultar y mostrar botones de tabla usuario

// async function showTrialUser() { 

//     // document.getElementById('tbodyUsers').classList.add('show-trial')

//     document.getElementById('tableTittle').innerHTML = 'Nuevos usuarios'
//     document.getElementById('subTableTittle').classList.remove('hidden')
//     // document.getElementById('UsersBTN').classList.remove('hidden')
//     document.getElementById('newUsersBTN').classList.add('hidden')
//   }


// // Funcion para eliminar los usuarios seleccionados

// async function borrarSeleccionUsuarios() {
//   const checkboxes = document.getElementsByClassName('check');
//       (console.log(checkboxes))
//       const listaUsuarioDelete = []

//   for (let i = 0; i < checkboxes.length; i++) {
//     if (checkboxes[i].checked) {
//       listaUsuarioDelete.push(checkboxes[i].value)
//       confirm('Estas seguro de borrar los usuarios seleccionados?')
//       await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/users/${checkboxes[i].value}`, 'DELETE');
//     }
//   }
//   // location.reload()
//   console.log(listaUsuarioDelete)
// }
