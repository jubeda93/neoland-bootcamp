import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;

export const mongoDB = {
  users: {
    get: getUsers,
    getClient:getClients,
    count: countUsers,
    logIn: logInUser,
    logOut: logoutUser,
    create: createUser,
    delete: deleteUser,
    update: updateUser,

  }
}

async function countUsers() {
  //
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.countDocuments()
}

/**
 * Gets an array of users from the 'users' collection in the 'shoppingList' database.
 *
 * @returns {Promise<Array<object>>} - The array of users.
 */
async function getUsers(filter){
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  
  return await usersCollection.find(filter).project({_id: 1, email: 1, results: 1, metrics: 1, dataProfile: 1 }).toArray()
}

async function createUser(user) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.insertOne(user)
}


/**
 * Retrieves user(s) from the 'users' collection in the 'WodTrack-DDBB' database
 * based on the provided user ID.
 *
 * @param {{_id: string}} param - An object containing the user's ID.
 * @returns {Promise<Array<{name: string, email: string}>>} - A promise that resolves to an array of users
 * with selected fields (name and email).
 */

async function getClients({ _id }){
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  // 1. Comprobar si el id del usuario proporcionado es administrador
  const adminUser = await usersCollection.find({ _id: new ObjectId(_id) }).project({role: 1}).toArray()
  // 2. Si lo es, devolver los clientes
  if (adminUser.length && adminUser[0]?.role === 'admin') {
    return await usersCollection.find({ role: 'user' }).project({name: 1, email: 1}).toArray()
  } else {
    return {
      error: 'Unauthorized'
    }
  }
}

/**
 * Finds a user in the 'users' collection in the 'shoppingList' database given
 * an email and password.
 *
 * @param {{email: string, password: string}} data - The data to query the user.
 * @returns {Promise<object>} The user object if found, null otherwise.
 */
async function logInUser({email, password}) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  // TODO: update token on DB
  return await usersCollection.findOne({ email, password }, { projection: { password: 0 } })
}

/**
 * Logs out a user by setting the 'token' field to null in the 'users' collection
 * in the 'shoppingList' database.
 *
 * @param {{id: string}} data - The data to query the user.
 * @returns {Promise<UpdateResult>} The result of the update operation.
 */
async function logoutUser({id}) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { token: null } })
}

/**
 * Deletes an article from the 'articles' collection in the 'shoppingList' database.
 *
 * @param {string} id - The ID of the article to be deleted.
 * @returns {Promise<string>} The ID of the deleted article.
 */
async function deleteUser(id) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  const returnValue = await usersCollection.deleteOne({ _id: new ObjectId(id) });
  console.log('DB deleteUser', returnValue, id,)
  return id
}

async function updateUser(id, updates) {
  const client = new MongoClient(URI);
  const shoppinglistDB = client.db('WodTrack-DDBB');
  const usersCollection = shoppinglistDB.collection('users');
  const returnValue = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  console.log('DB updateUsers', returnValue, updates)
  return returnValue
}

