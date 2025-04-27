import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;

export const mongoDB = {
  users: {
    get: getUsers,
    count: countUsers,
    logIn: logInUser,
    logOut: logoutUser
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
 * Retrieves user(s) from the 'users' collection in the 'WodTrack-DDBB' database
 * based on the provided user ID.
 *
 * @param {{_id: string}} param - An object containing the user's ID.
 * @returns {Promise<Array<{name: string, email: string}>>} - A promise that resolves to an array of users
 * with selected fields (name and email).
 */

async function getUsers({_id}){
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');

  const adminUser = await usersCollection.find({ _id: new ObjectId(_id) }).project({rol: 1}).toArray()
  // 2. Si lo es, devolver los clientes
  if (adminUser[0].rol === 'admin') {
    return await usersCollection.find({rol:'user'}).project({email: 1}).toArray()
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
  const shoppinglistDB = client.db('WodTrack-DDBB');
  const usersCollection = shoppinglistDB.collection('users');
  return await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { token: null } })
}

