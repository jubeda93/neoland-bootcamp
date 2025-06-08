import { getAPIData, } from "./getAPIData.js"
import { checkUserLogged } from "./checkUserLogged.js"


window.addEventListener("DOMContentLoaded", onDOMContentLoaded)


function onDOMContentLoaded() {
    checkUserLogged()
    const showResults = document.getElementById('showResultsHistory')
    showResults?.addEventListener('click', readUserResults)

    document.addEventListener('click', async(e) => {
        if (e.target.classList.contains('deleteResult')) {
            const id = e.target.dataset.id
            if(!id || !confirm('¿Seguro que quieres borrar este resultado?')) return
            await deleteResult(id)
        }
    })
    const hideResults = document.getElementById('newResultsForm')
    hideResults?.addEventListener('click', hideFormResults)
    
}

async function readUserResults() {
    const user = JSON.parse(sessionStorage.getItem('User'))
    const userId = user._id
    const results = await getAPIData(`/api/read/results/${userId}`, 'GET')

    document.getElementById('newResultsForm').classList.remove('hidden')
    document.getElementById('showResultsHistory').classList.add('hidden')
    
    renderResults(results)
}

function renderResults(results){
    const tbody = document.getElementById('tbodyResults')
    document.getElementById('resultsTable').classList.remove('hidden')
    tbody.innerHTML = ''
    if (!results.length) {
        const row = document.createElement('tr')
        row.innerHTML = `<td colspan="2">No hay resultados</td>`
        tbody.appendChild(row)
        return
    }

    results.forEach( result => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${result.fecha}</td>
        <td>${result.benchpress}</td>
        <td>${result.deadlift}</td>
        <td>${result.backsquat}</td>
        <td>${result.frontsquat}</td>
        <td>${result.snatch}</td>
        <td>${result.cleanjerk}</td>
        <td>${result.powerclean}</td>
        <td>${result.squatclean}</td>
        <td>${result.shpress}</td>
        <td>${result.pushpress}</td>
        <td>${result.pushjerk}</td>
        <td><button class="deleteResult" data-id="${result._id}">Borrar</button></td>
        `   
        tbody.appendChild(row)
    })
    
}

async function deleteResult(id) {
    await getAPIData(`/api/delete/result/${id}`, 'DELETE')
    await readUserResults()
    
}

async function hideFormResults() {
    document.getElementById('resultsTable').classList.add('hidden')
    document.getElementById('newResultsForm').classList.add('hidden')
    document.getElementById('showResultsHistory').classList.remove('hidden')
    
}