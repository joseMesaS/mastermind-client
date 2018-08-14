import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import './LoginForm.css'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label for="email">
            Email
          </label>
					<input id="email" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />

  				<label for="password">
            Password
          </label>
					<input id="password" type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />

					<Button
						id="subBtn"
						type="submit"
            color="primary"
            variant="raised"
            
            className="create-game">
							 Login 
					</Button>
  			
  			</form>
		  </div>)
	}
}
