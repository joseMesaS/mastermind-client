import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'

export const ADD_TURN = 'ADD_TURN'
export const GET_TURNS = 'GET_TURNS'
export const UPDATE_TURN_SUCCESS = 'UPDATE_TURN_SUCCESS'

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
})

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateTurns = turns => ({
  type: GET_TURNS,
  payload: turns
})

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
})

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
})

const updateTurnSuccess = turn => ({
  type: UPDATE_TURN_SUCCESS,
  payload: turn
})


export const getGames = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err))
}

export const joinGame = (gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err))
}

export const createGame = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err))
}

export const updateGame = (gameId, board) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ board })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err))
}


export const addTurn = (gameId, userInput) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  console.log(gameId, userInput)
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/turns/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ userInput })
    .then(response => dispatch(updateTurnSuccess(response.body)))
    .catch(err => console.error(err.message))
}

export const getTurns = (gameId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  console.log(gameId)
  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/turns/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => console.log(result.body))
    .catch(err => console.error(err.message))
}

