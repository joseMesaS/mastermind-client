import React, {PureComponent} from 'react'
import {getGames, createGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'
import { Link } from 'react-router-dom'

class HallOfFame extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderUser = (user) => {
    // const {users, history} = this.props

    return (<Card key={user.id} className="game-card">
      <CardContent>
        <Typography color="textSecondary">
        </Typography>
        <Typography variant="headline" component="h2">
            {user.score} Points - {user.name}
        </Typography>
        <Typography color="textSecondary">
          Score: {user.score}
        </Typography>
        <Typography color="textSecondary">
          Won: {user.won}
        </Typography>
        <Typography color="textSecondary">
          Lost: {user.lost}
        </Typography>
        <Typography color="textSecondary">
          Tied: {user.tied}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/games/${game.id}`)}
        >
          Watch
        </Button>
      </CardActions> */}
    </Card>)
  }

  render() {
    const {games, users, authenticated, createGame} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (
    <Paper className="outer-paper">
      <Button
        color="primary"
        variant="raised"
        className="create-game"
        component={Link} 
        to='/games'
      >
        Return to Gameslist
      </Button>

      <div className="games_list">
        {users.map(user => this.renderUser(user))}
      </div>
    </Paper>

    
)

}
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : Object.values(state.users).sort((a, b) => b.score - a.score),
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame})(HallOfFame)
