import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;

export const mongoDB = {
  users: {
    get: getUsers,
    getById: getUserById,
    count: countUsers,
    logIn: logInUser,
    logOut: logoutUser,
    create: createUser,
    delete: deleteUser,
    update: updateUser,

  }
}

async function countUsers() {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.countDocuments()
}


async function getUsers(filter){
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.find(filter).project({password: 0}).toArray()
}

async function createUser(user) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.insertOne(user)
}

async function getUserById(id) {
  const client = new MongoClient(URI);
  const wodTrackDB = client.db('WodTrack-DDBB');
  const usersCollection = wodTrackDB.collection('users');
  return await usersCollection.findOne({ _id: new ObjectId(id) })
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
  console.log('DB updateUsers', updates)
  return returnValue
}

