import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, addTurn} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import GameDetailsInput from './GameDetailsInput'
import './GameDetails.css'
import Button from 'material-ui/Button'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  // makeMove = (toRow, toCell) => {
  //   const {game, updateGame} = this.props

  //   const board = game.board.map(
  //     (row, rowIndex) => row.map((cell, cellIndex) => {
  //       if (rowIndex === toRow && cellIndex === toCell) return game.turn
  //       else return cell
  //     })
  //   )
  //   updateGame(game.id, board)
  // }

player = (game, userId) => {
  if (game.players.find(p => p.user.id === userId)) {
    return game.players.find(p => p.user.id === userId).role
  } else {
    return null
  }
}

getOpponent = (player, game) => {
  if (player === 'Player 2') {
    return 'Your opponent is ' + game.players.find(p => p.role === 'Player 1').user.email
  } else if (player === 'Player 1') {
    if(game.players.length > 1) {
      return 'Your opponent is ' + game.players.find(p => p.role === 'Player 2').user.email
    } else {
    return `Waiting for opponent`
    }
  }
}
  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
    )
 if (game === null || users === null) return 'Loading...'

    if (!game) return 'Not found'


    // const player = game.players.find(p => p.user.id === userId).role

   

    // const winner = game.players
    //   .filter(p => p.symbol === game.winner)
    //   .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <p>Solution: {game.solution}</p>

      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>
      <p>Name: {users[userId].email}</p>
      <p>{userId && this.player(game, userId)}</p>

      <p>{this.getOpponent(this.player(game, userId), game)}
      </p>
      <p>
        {this.player(game, userId) === game.winner && 'Congrats, you won'}
        {(this.player(game,userId) !== game.winner && game.winner.includes('Player')) && 'Sorry, you lost'}
        {game.winner === 'no winner' && 'No winners, it is a tie'}
      </p>

      {!this.player(game, userId) &&         
        <Button
          color="primary"
          variant="raised"
          onClick={this.joinGame}
          className="create-game"
        >
          Join Game
        </Button>
      }
     
      {
        (this.player(game, userId) === game.currentTurn 
          && game.players.length > 1 
          && game.winner === "none"
        ) 
        && <GameDetailsInput gameId={game.id} addTurn ={this.props.addTurn} />
      }
      {/* {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      } */}

      {/* {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      } */}

      
      
      {/* {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      } */}

      <hr />
      

      {/* {
        game.status !== 'pending' &&
        // <Board board={game.board} makeMove={this.makeMove} />
        <p>Some text</p>
      } */}
     

    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, addTurn
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
