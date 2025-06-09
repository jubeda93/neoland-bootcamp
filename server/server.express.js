import express from 'express';
import bodyParser from 'body-parser';
import { mongoDB } from "./server.mongodb.js";
import { gooogleOauth2 } from './server.oauth.js';

// Express 
const app = express();
const port = process.env.PORT;

// Static server
app.use(express.static('src'));
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// =================== GETTERS =================== //

// Get all users
app.get('/api/read/users', async (req, res) => {
  res.json(await mongoDB.users.get())
})

app.get('/api/read/user/:id', async (req, res) => {
  res.json(await mongoDB.users.getById(req.params.id))
  console.log('Buscando usuario con id:', req.params.id)


  app.get('/api/filter/users/:name', async (req, res) => {
    // TODO: ver parámetros de búsqueda
    // https://www.mongodb.com/docs/manual/reference/operator/query/
    res.json(await mongoDB.articles.get({ $text: { $search: req.params.name } }))
  })
})

// READ WORKOUT
app.get('/api/read/workouts/:date', async (req, res) => {
  try {
    const workouts = await mongoDB.workouts.getByDate(req.params.date)
    res.json(workouts)
  } catch (err) {
    console.error('Error leyendo workouts: ', err);
    res.status(500).send('Error leyendo workouts')
  }
})

// READ RESULTS USERS

app.get('/api/read/results/:userID', async (req, res) => {
  try {
    const results = await (await mongoDB.userResults.getById(req.params.userID))
    res.json(results)
  } catch (err) {
    console.error('Error leyendo results: ', err);
    res.status(500).send('Error leyendo results')
  }
})


//LOGOUT

app.get('/api/logout/:id', async (req, res) => {
  const response = await mongoDB.users.logOut(req.params.id)
  console.log('logOut', response)
  res.status(200).send('Logout')
})


// =================== POST =================== //
// CREAR USUARIO
app.post('/api/create/users', async (req, res) => {
  // 1- Comprabar si ya existe el usuario, usando getUsers
  const userExist = await mongoDB.users.get({ email: req.body.email })
  // 2- Si no existe, crealo
  if (userExist.length === 0) {
    const newUser = req.body
    delete newUser._id
    const signOn = await mongoDB.users.create(newUser)
    console.log('Nuevo usuario', newUser)
    res.json(signOn)
  } else {
    res.status(400).send('Este usuario ya existe')
  }
})

// endpoint para crear resultados
app.post('/api/create/results/:id', async (req, res) => {
  const resultsData = req.body
  console.log('Datos recibidos en el servidor:', resultsData);
  res.json(await mongoDB.userResults.create(resultsData))


})

// LOGIN
app.post('/api/login', async (req, res) => {
  // TODO: update token on DB
  const user = await mongoDB.users.logIn(req.body)
  if (user) {
    user.token = gooogleOauth2()
    console.log('Iniciando sesion:', user)
    res.json(user)
  } else {
    console.log('Error al iniciar sesion')
    res.status(401).send('Datos usuario incorrectos')
  }
})

// CREAR WORKOUT

app.post('/api/create/workout', async (req, res) => {
  console.log('Datos recibidos en el servidor:', req.body);

  if (req.body.fecha) {
    // Convertir la fecha a un objeto Date
    req.body.fecha = new Date(req.body.fecha).toISOString().split('T')[0];
  } else {
    return res.status(400).send('Falta el campo "fecha"');
  }

  try {
    const results = await mongoDB.workouts.create(req.body)
    res.json(results);

  } catch (err) {
    console.error('Error creando workout: ', err);
    res.status(500).send('Error al crear el workout')
  }
})

// AÑADIR USUARIO WORKOUT

app.patch('/api/workout/:id/reservar', async (req, res) => {
  const workoutId = req.params.id
  const { userId, email } = req.body


  if (!workoutId || !email || !userId) {
    return res.status(400).send('Faltan datos')
  }

  try {
    const results = await mongoDB.workouts.addUserWorkout(workoutId, email)

    if (!results || results.error) {
      return res.status(400).send(results.error)
    } else {
      // Corregido para enviar un JSON con mensaje, no como función

      res.json({ message: 'Reserva confirmada' })
    }
  } catch (err) {
    console.error('Error en addUserWorkout: ', err)
    res.status(500).send('Error al reservar workout')
  }
});

// BORRAR USUARIO DEL WORKOUT

app.patch('/api/workout/:id/borrar', async (req, res) => {
  const { email } = req.body
  try {
    const results = await mongoDB.workouts.deleteUserWorkout(req.params.id, email)
    res.json(results)
  } catch (err) {
    console.error('Error al cancelar reserva:', err);
    res.status(500).send('Error al cancelar reserva')
  }
})

// CREAR REGISTRO RESULTS



// =================== UPDATES =================== //


//update user
app.put('/api/update/user/:id', async (req, res) => {
  const userUpdate = req.body
  res.json(await mongoDB.users.update(req.params.id, userUpdate))
})

app.put('/api/update/rol/:id', async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = req.body
  res.json(await mongoDB.users.update(req.params.id, results))
})

// Upadate results
app.put('/api/update/results/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  console.log(req.body)
  const results = { results: req.body }
  res.json(await mongoDB.users.update(req.params.id, results))
})
// Upadate metrics
app.put('/api/update/metrics/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = { metrics: req.body }
  res.json(await mongoDB.users.update(req.params.id, results))
})
// Upadate dataProfile
app.put('/api/update/dataProfile/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = { dataProfile: req.body }
  res.json(await mongoDB.users.update(req.params.id, results))
})

// =================== DELETE =================== //

// Delete User
app.delete('/api/delete/users/:id', requireAuth, async (req, res) => {
  const deleteResult = await mongoDB.users.delete(req.params.id)
  res.json(deleteResult)
})

app.delete('/api/delete/workout/:id', requireAuth, async (req, res) => {
  const deleteResult = await mongoDB.workouts.delete(req.params.id)
  console.log('Borrando workout id:', req.params.id)
  res.json(deleteResult)
})

app.delete('/api/delete/result/:id', requireAuth, async (req, res) => {
  const deleteResult = await mongoDB.userResults.delete(req.params.id)
  console.log('Borrando result id:', req.params.id)
  res.json(deleteResult)
})

// Start server
app.listen(port, async () => {
  console.log(
    `Running server.express: http://127.0.0.1:${port}`

  );
})


// Authentication emulation"
function requireAuth(req, res, next) {
  // Simulation of authentication (OAuth2)
  if (req.headers.authorization === 'Bearer 123456') {
    next()
  } else {
    // Unauthorized
    console.log('No tiene authorization bearer')
    res.status(401).send('Unauthorized')

  }
}