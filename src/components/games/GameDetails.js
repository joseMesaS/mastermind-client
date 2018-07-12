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
    return 'Your opponent is ' + game.players.find(p => p.role === 'Player 1').user.name
  } else if (player === 'Player 1') {
    if(game.players.length > 1) {
      return 'Your opponent is ' + game.players.find(p => p.role === 'Player 2').user.name
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

    return (<Paper className="outer-paper">
      <p>Solution: {game.solution}</p>

      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>
      <p>Name: {users[userId].name}</p>
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
       
      <GameDetailsInput gameId={ game.id } addTurn ={ this.props.addTurn } />
     
    </Paper>
    <Paper className='board-paper'><Board   gameId = {this.props.match.params.id} /></Paper>
     </div>)
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
