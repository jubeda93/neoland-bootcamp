import express from 'express';
import bodyParser from 'body-parser';
import { mongoDB } from "./server.mongodb.js";
import { gooogleOauth2 } from './server.oauth.js';

const app = express();
const port = process.env.PORT;

// Static server
app.use(express.static('src'));
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/check/:nombre', async (req, res) => {
  const usuarios = await mongoDB.users.count()
  res.send(`Hola ${req.params.nombre}, hay ${usuarios} usuarios`)
})

app.get('/api/read/users', async (req, res) => {
  res.json(await mongoDB.users.get())
})

app.get('/api/read/users/:id', async (req, res) => {
  const users = await mongoDB.users.get({ _id: req.params.id })
  console.log('users', users,)
  res.json(users)
  
})

app.post('/api/create/users', async (req,res) => {
    // 1- Comprabar si ya existe el usuario, usando getUsers
  const userExist = await mongoDB.users.get({email: req.body.email})    
    // 2- Si no existe, crealo
    if (userExist.length === 0) {
      const newUser = req.body
      delete newUser._id
      const signOn = await mongoDB.users.create(newUser)
      console.log('Nuevo usuario',newUser)
      res.json(signOn)
    } else {
      res.status(400).send('USUARIO EXISTENTE')
    }
})
// UPDATE RESULTS
app.put('/api/update/results/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = {results: req.body}
  res.json(await mongoDB.users.update(req.params.id, results))
})
// UPDATE METRICS
app.put('/api/update/metrics/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = {metrics: req.body}
  res.json(await mongoDB.users.update(req.params.id, results))
})
// UPDATE DATAPROFILE
app.put('/api/update/dataProfile/:id', requireAuth, async (req, res) => {
  // Como los datos que enviamos solo son resultados, creamos una variable con los resultados:
  const results = {dataProfile: req.body}
  res.json(await mongoDB.users.update(req.params.id, results))
})


app.delete('/api/delete/users/:id', requireAuth, async (req, res) => {
  const deleteResult = await mongoDB.users.delete(req.params.id)
  res.json( deleteResult )
})

app.get('/api/filter/users/:name', async (req, res) => {
  // TODO: ver parámetros de búsqueda
  // https://www.mongodb.com/docs/manual/reference/operator/query/
  res.json(await mongoDB.articles.get({ $text: { $search: req.params.name } }))
})

app.post('/api/login', async (req, res) => {
  // TODO: update token on DB
  const user = await mongoDB.users.logIn(req.body)
  if (user) {
    // TODO: use OAuth2
    // ...
    // Simulation of authentication (OAuth2)
    user.token = gooogleOauth2()
    // Remove password
    // delete user.password
    console.log('Iniciando sesion:', user)
    res.json(user)
  } else {
    // Unauthorized
    console.log('Error al iniciar sesion')
    res.status(401).send(user)
  }
})

app.get('/api/logout/:id', async (req, res) => {
  const response = await mongoDB.users.logOut(req.params.id)
  console.log('logOut', response)
  res.status(200).send('Logout')
})

// Use a regexp that matches all 'diary', 'menus', 'stats' routes
app.get('/diary', (req, res) => res.redirect('/'))
app.get('/menus', (req, res) => res.redirect('/'))
app.get('/stats', (req, res) => res.redirect('/'))

app.listen(port, async () => {
  const usuarios = await mongoDB.users.count()
  console.log(`Servidor express escuchando en el puerto ${port}: ${usuarios} users`);
})

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