export function checkUserLogged() {
    const user = JSON.parse(sessionStorage.getItem('User'))
    if (!user) {
        location.href = '/login.html'
        alert('Usuario no identificado')
    } 
    if (user.rol === "admin") {
        document.getElementById('adminLink')?.classList.remove('hidden')
        
    }
}