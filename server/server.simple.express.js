import express from 'express';
import bodyParser from 'body-parser';
import { crud } from "./server.crud.js"
import { mongoDB } from './server.mongodb.js';


const app = express();
const port = process.env.PORT;
const USERSDB = './server/BBDD/users.json'

// Static server
app.use(express.static('src'));
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//API ENDPOINTS

// CREAR LOS ENDPOINT CON /api al inicio del endpoint para que no sufra conflictos en NETLIFY 

app.get('/api/countUsers/:nombre', async (req, res) => {
  const usuarios = await mongoDB.users.count()
  // lo que mostramos en la consola del terminal
  console.log(`Existen ${usuarios} usuarios en la base de datos`)
  //lo que enviamos de vuelta (send) al front
  res.send(`hola ${req.params.nombre}, hay ${usuarios} usuarios`)
})

app.get('/api/read/users', async (req, res) => {
  const user = await mongoDB.users.get()
  console.log('devolvemos al front todo el contenido de la coleccion users de la BBDD de MongoDB')
  res.json(user)
})


// Funcion para CREAR USUARIOS desde server.crud
app.post('/create/users', (req, res) => {
  crud.read(USERSDB, (users) => {
    //const email recoge el valor del email del usuario completo
    const email = req.body.email;
    console.log('aaaaaa',email)
    /** Devuelve true o false con .some,
     * comparando que no existe ningun usuario con el mismo email */
    const exists = users.some(user => user.email === email)
    console.log(exists)
    
    // si exists = true, esto indica que el email ya existe y responde .send el error
    if (exists) {
      return res.send({error: 'Email ya esta registrado.'});
    }
    /**  En caso contrario (false), indica que no existe ningun otro usuario con el mismo email
     *  y ejecuta el metodo .create en (USERDB = archivo JSON) con los datos del req.body
     * 
     * 
    */
    crud.create(USERSDB, req.body, (data) => {
      //devuelve por consola del terminal los datos de nuevo usuario
      console.log(`Creando nuevo usuario: ${data.email}`, data)
      //Devuelvo con res.send los datos del usuario como cadena de texto (stringify)
      res.send(JSON.stringify(data));
    });
  });
})


app.post('/login', async (req, res) => {
  crud.login(USERSDB, req.body, (foundUserData) => {
    console.log('Inicia sesion:', foundUserData)
    res.send(JSON.stringify(foundUserData));
  });
})

app.get('/read/users', (req, res) => {
  crud.read(USERSDB, (data) => {
    console.log('server read users', data)
    res.send(JSON.stringify(data));
  });
});


app.put('/update/users/:id', (req, res) => {
  crud.update(USERSDB, req.params.id, req.body, (data) => {
    console.log('server update users', data)

    res.send(JSON.stringify(data));
  });
});

app.delete('/delete/users/:id', (req, res) => {
  crud.delete(USERSDB, req.params.id, (data) => {
    console.log('server delete users', data)
    res.send(JSON.stringify(data));
  });
});



// OBSERVAMOS EL PUERTO DEL SERVIDOR
app.listen(port, console.log(`Escuchando PORT: ${port}`))