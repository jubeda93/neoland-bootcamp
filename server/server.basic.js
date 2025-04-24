// /server/server.basic.js
import * as http from "node:http";
import * as url from "node:url";

const usersDB = []

http.createServer(function server_onRequest(request, response) {
  let pathname = url.parse(request.url).pathname;
  let direccion = new URL(`http://${process.env.IP ?? 'localhost'}:${process.env.PORT}${request.url}`)
  let responseJSON = {}


//Routers (lee el pathname y redirige al sitio en cuestion)
  switch (pathname) {
    case '/':
    case '/index':
    case '/index.html':
      console.log('Pagina de Inicio solicitada');
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('<h1>Inicio</h1>');
      break
    case '/logIn':
    case '/logIn.html':
      console.log('Pagina de Loggeo solicitada');
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('Log In');
      break
    case '/signup':
    case '/signup.html':
      console.log('Pagina de Registro solicitada');
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(`
        <h1>SIGN UP</h1>
        <form action="/api/create/user">
          <input type="text" name="name" placerholder="Nombre" required> 
          <button type = "submit">Sign Up</button>
        </form>
        `)
     
      break;
    case '/profile':
    case '/profile.html':
       console.log('Pagina de Perfil solicitada');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h1>My Perfil</h1>');
        break;
    case '/api':
        console.log('<h1>Api solicitada</h1>');
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(articlesJSON));
        break;
    case '/api/get/users':
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.write(JSON.stringify(usersDB));
      break;
    case '/api/create/user':
        console.log(`Api solicitada : crear usuario ${direccion.searchParams.get('name')}`)
        response.writeHead(200, { 'Content-Type': 'application/json'});
        usersDB.push({
        name: direccion.searchParams.get('name')
        })
        responseJSON.user = {
          name: direccion.searchParams.get('name')
        }
            response.write(JSON.stringify(responseJSON))
        break;
     default:
        console.log("Request for " + pathname + " received.");
        response.writeHead(404, { 'Content-Type': 'text/html'});
        response.write('<h1>Error 404!!</h1>');
      }

      
      // response.write("<h1>Hello Bootcamp Neoland!</h1>");
      response.end();
  }).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');