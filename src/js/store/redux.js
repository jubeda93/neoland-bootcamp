// @ts-check
/** @import { User } from '../classes/User.js' */
/** @import { Results } from '../classes/Results.js'* /


/**
 * @module redux/store
*/

/**
 * @typedef {Object.<(string), any>} State
 * @property {User [] | []} users
 * @property {Results [] | []} results
 /** @property {boolean} isLoading
 /** @property {boolean} error
 */
/**
 * @type {State}
 */

//==============="BASE DE DATOS"===============

export const INITIAL_STATE = {
  //articles: [],
  users: [],
  //results: []
  //isLoading: false,// Podría usarse para controlar cuando estamos realizando un fetch
  //error: false,// Podría usarse para controlar cuando sucede un error
}

/**
 * @typedef {Object} ActionTypeUser
 * @property {string} type
 * @property {User} [user]
 */
/**
 * @typedef {Object} ActionTypeResults
 * @property {string} type
 * @property {Results} [results]
 */
//==============="ACCIONES EJECUTABLES SOBRE BASE DE DATOS"===============

const ACTION_TYPES = {

  //====== User ======//

  CREATE_USER: 'CREATE_USER',
  // READ_USER: 'READ_LIST',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  DELETE_ALL_USER: 'DELETE_ALL_USERS',
  //======== Results ===========//
  // CREATE_RESULTS: 'CREATE_RESULTS',
  // // READ_USER: 'READ_LIST',
  // UPDATE_RESULTS: 'UPDATE_RESULTS',
  // DELETE_RESULTS: 'DELETE_RESULTS',
  // DELETE_ALL_RESULTS: 'DELETE_ALL_RESULTS',
  // ...
}

/**
 * Reducer for the app state.
 *
 * @param {State} state - The current state
 * @param {ActionTypeUser | ActionTypeResults} action - The action to reduce
 * @returns {State} The new state
 */

//==============="METODO PARA MODIFICAR BASE DE DATOS"===============

const appReducer = (state = INITIAL_STATE, action) => {
  //const actionWithResults = /** @type {ActionTypeResults} */(action)
  const actionWithUser = /** @type {ActionTypeUser} */(action)
  switch (action.type) {

    //ACTION TYPE USUARIO
    case ACTION_TYPES.CREATE_USER:
      return {
        ...state,
        users: [
          ...state.users,
          actionWithUser.user  // EQUIVALENTE A USER_DB.push(newUSer)
        ]
      };
      case ACTION_TYPES.UPDATE_USER:
        console.log('Actualizacion del Usuario en Redux', actionWithUser.user)
        return {
          ...state,
          users: state.users.map((/** @type {User} */user) => {
            if (user._id === actionWithUser?.user?._id) {
              return actionWithUser.user
            }
            return user
          })
        };
      case ACTION_TYPES.DELETE_USER:
        return {
          ...state,
          users: state.users.filter((/** @type {User} */user) => user._id !== actionWithUser?.user?._id)
        };
    default:
      return { ...state };
  }
}

/**
 * @typedef {Object} PublicMethods
 * @property {function} create
 * @property {function} read
 * @property {function} update
 * @property {function} delete
 * @property {function} [deleteById]
 * @property {function} getById
 * @property {function} getAll
 * @property {function} deleteAll
 * @property {function} [deleteByEmail]
 * @property {function} [getByEmail]
 */
/**
 * @typedef {Object} Store
 * @property {PublicMethods} user
 * @property {PublicMethods} results
 * @property {function} getState
 */
/**
 * Creates the store singleton.
 * @param {appReducer} reducer
 * @returns {Store}
 */
const createStore = (reducer) => {
  let currentState = INITIAL_STATE
  let currentReducer = reducer

  // Private methods
  /**
   *
   * @param { ActionTypeUser | ActionTypeResults } action
   * @param {function | undefined} [onEventDispatched]
   */
  const _dispatch = (action, onEventDispatched) => {
    let previousValue = currentState;
    let currentValue = currentReducer(currentState, action);
    currentState = currentValue;

    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: {
        type: action.type,
        changes: _getDifferences(previousValue, currentValue)
      },
      cancelable: true,
      composed: true,
      bubbles: true
    }));
    if (onEventDispatched) {
      // console.log('onEventDispatched', onEventDispatched);
      onEventDispatched();
      // onEventDispatched.call(this, {
      //   type: action.type,
      //   changes: _getDifferences(previousValue, currentValue)
      // })
    }
  }
  /**
   * Returns a new object with the differences between the `previousValue` and
   * `currentValue` objects. It's used to create a payload for the "stateChanged"
   * event, which is dispatched by the store every time it changes.
   *
   * @param {State} previousValue - The old state of the store.
   * @param {State} currentValue - The new state of the store.
   * @returns {Object} - A new object with the differences between the two
   *     arguments.
   * @private
   */
  const _getDifferences = (previousValue, currentValue) => {
    return Object.keys(currentValue).reduce((diff, key) => {
      if (previousValue[key] === currentValue[key]) return diff
      return {
        ...diff,
        [key]: currentValue[key]
      };
    }, {});
  }

  // //     =====================  ACTIONS ======================

  // /**
  //  * Creates a new Article inside the store
  //  * @param {Article} article
  //  * @param {function | undefined} [onEventDispatched]
  //  * @returns void
  //  */
  // //const createArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_ARTICLE, article }, onEventDispatched);

  /**
   * Creates a new Article inside the store
   * @param {User} user
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const createUser = (user, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_USER, user }, onEventDispatched);

  /**
     * Deletes an User
   * @param {User} user
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const deleteUser = (user, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_USER, user }, onEventDispatched);

  /**
   * Creates a new Results inside the store
   * @param {Results} results
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
   const createResults = (results, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_RESULTS, results }, onEventDispatched);

  /**
   * Updates an article
   * @param {User} user
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const updateUser = (user, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_USER, user }, onEventDispatched);

  //  * Reads the list of articles
  //  * @param {function | undefined} [onEventDispatched]
  //  * @returns void
  //  */
  // const readList = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST }, onEventDispatched);
  // /**
  //  * Updates an article
  //  * @param {Article} article
  //  * @param {function | undefined} [onEventDispatched]
  //  * @returns void
  //  */
  // const updateArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_ARTICLE, article }, onEventDispatched);
  // /**
  //  * Deletes an article
  //  * @param {Article} article
  //  * @param {function | undefined} [onEventDispatched]
  //  * @returns void
  //  */
  // const deleteArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_ARTICLE, article }, onEventDispatched);

  // /**
  //  * Deletes all the articles
  //  * @param {function | undefined} [onEventDispatched]
  //  * @returns void
  //  * */
  // const deleteAllArticles = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_ALL_ARTICLES }, onEventDispatched);

  //     ===================================== GETTERS ===========================================

  // /**
  //  * Returns the article with the specified id
  //  * @param {string} id
  //  * @returns {Article | undefined}
  //  */
  // const getArticleById = (id) => { return currentState.articles.find((/** @type {Article} */article) => article._id === id) };

  /**
   * Returns the article with the specified id
   * @param {string} id
   * @returns {User | undefined}
   */
  const getUserById = (id) => { return currentState.users.find((/** @type {User} */user) => user._id === id) };

  /**
* Returns the article with the specified id
* @param {string} email
* @returns {User | undefined}
*/
  const getUserByEmail = (email) => { return currentState.users.find((/** @type {User} */user) => user.email === email) };

  const getAllUsers = () => { return currentState.users }

  // /**
  //  * Returns all the articles
  //  * @returns {Array<Article>}
  //  */
  // const getAllArticles = () => { return currentState.articles };

  //     ===================================    Public methods  ===================================
  /**
   *
   * @returns {State}
   */
  const getState = () => { return currentState };

  // ================================== Namespaced actions ============================


  // /** @type {PublicMethods} */
  // const article = {
  //   create: createArticle,
  //   read: readList,
  //   update: updateArticle,
  //   delete: deleteArticle,
  //   getById: getArticleById,
  //   getAll: getAllArticles,
  //   deleteAll: deleteAllArticles
  // }

  /** @type {PublicMethods} */
  const user = {
    create: createUser,
    read: function () { console.log('update') },
    update: updateUser,
    delete: deleteUser,
    deleteById: function () { console.log('update') },
    getById: getUserById,
    getByEmail: getUserByEmail,
    getAll: getAllUsers,
    deleteAll: function () { console.log('deleteAll') },
  }
  
  /** @type {PublicMethods} */
  const results = {
    create: createResults,
    read: function () { console.log('read') },
    update: function () { console.log('update') },
    delete: function () { console.log('delete') },
    getById: function () { console.log('getById') },
    getByEmail: function () { console.log('getByEmail') },
    getAll: function () { console.log('getAll') },
    deleteAll: function () { console.log('update') },


  }

  return {
    // Actions
    user,
    results,
     //Public methods
    getState 
  }
}

// Export store
export const store = createStore(appReducer)