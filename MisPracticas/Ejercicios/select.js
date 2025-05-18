window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

    let editUser = document.getElementById('editar')
    editUser?.addEventListener('click', editarSexo)
    
}


async function editarSexo() {

   let rol = document.getElementsByClassName('rol')
   let sexo = document.getElementsByClassName('sexo')
   console.log(rol)
   console.log(sexo)
   
   let rolSelector = document.createElement('select')
   let sexoSelector = document.createElement('select')


   rol[0].innerHTML = ''
   sexo[0].innerHTML = ''
   rol[0].appendChild(rolSelector)
   sexo[0].appendChild(sexoSelector) 
   




}