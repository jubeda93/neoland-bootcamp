export function checkUserLogged() {
    const user = JSON.parse(sessionStorage.getItem('User'))
    if (!user) {
        location.href = '/login.html'
        alert('Usuario no identificado')
    } 
    if (user.rol === "admin") {
       
        document.getElementById('adminLink')?.classList.remove('hidden')
        document.getElementById('panelClases')?.classList.remove('hidden')
        
    } if (user.rol !=="admin" && location.pathname === '/adminPanel.html' || user.rol !=="admin" && location.pathname === '/adminBooking.html') {
        location.href = '/mainMenu.html'
        alert('No tienes permiso para acceder a esta seccion')
        
    } 
}