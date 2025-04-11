// /server/index.js
import * as http from "node:http";
import * as url from "node:url";

// JSON QUE SIMULA LA BBDD

const USUARIOJSON = [
    {
        "name": "name_1",
        "id": "id_1",
        "rol": "coach",
        "box": "Via"
    },
    {
        "name": "name_2",
        "id": "id_2",
        "rol": "user",
        "box": "Via"
    },
    {
        "name": "name_3",
        "id": "id_3",
        "rol": "user",
        "box": "Moncada"
    },
    {
        "name": "name_4",
        "id": "id_5",
        "rol": "user",
        "box": "Moncada"
    },
    {
        "name": "name_5",
        "id": "id_5",
        "rol": "admin",
        "box": "valencia"
    },
    {
        "name": "name_6",
        "id": "id_6",
        "rol": "user",
        "box": "Via"
    },
    {
        "name": "name_7",
        "id": "id_7",
        "rol": "coach",
        "box": "Moncada"
    },





]

//Direccion solicitada desde del navegador 

http.createServer(function server_onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    let direccion = new URL(`http://${process.env.IP ?? 'localhost'}:${process.env.PORT}${request.url}`)
    let responseJSON = {}

    const menuNav = `
    <menu>
        <ul><a href="/index">Home</a></ul>
        <ul><a href="/login">Log In</a></ul>
        <ul><a href="/signup">Registro</a></ul>
        <ul><a href="/users">Ver usuarios</a></ul>
    </menu>
    `

    // Router
    switch (pathname) {
        case '/':
        case 'index':
        case 'index.html':
            console.log(`HOME solicitado`);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(`<h1>HOME</h1>"${menuNav}`);
            break
        case '/signup':
        case '/signup.html':
            console.log(`SIGN UP solicitado`);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(`
                    <h1>SIGN UP</h1>
                    <form action="/api/create/user">
                      <input type="text" name="name" placeholder="Nombre de usuario" required>
                      <input type="text" name="rol" placeholder="Rol de usuario" required>
                      <input type="text" name="box" placeholder="Nombre del Box" required>
                      <button type="submit">Sign Up</button>
                    </form>
                    `);
            break;
        case '/users':
        case '/users.html':
            console.log / ("Ver usuarios solicitado")
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(JSON.stringify(USUARIOJSON));
            break;
        case '/api/get/users':
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(USUARIOJSON));
            break;
        case '/api/create/user':
            console.log(`API solicitado: crear usuario ${direccion.searchParams.get('name')}`);
            response.writeHead(200, { 'Content-Type': 'application/json' });

            // Simulamos la creacion en BBDD
            USUARIOJSON.push({
                name: direccion.searchParams.get('name'),
                rol: direccion.searchParams.get('rol'),
                box: direccion.searchParams.get('box'),
            })
            responseJSON.user = {
                name: direccion.searchParams.get('name'),
                rol: direccion.searchParams.get('rol'),
                box: direccion.searchParams.get('box')
            }
            response.write(JSON.stringify(responseJSON));
            break;
        default:
            console.log(`Request for ${pathname} received.`);
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write("<h1>404 Not found</h1>");

    }

    // console.log("Request for " + pathname + " received.");
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.write("<h1>Hello World</h1>");
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');