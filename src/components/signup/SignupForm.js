import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import './SignupForm.css'

export default class SignupForm extends PureComponent {
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
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>
					<label for="name">
            Name
          </label>
					<input id="name" type="text" name="name" value={
  						this.state.name || ''
  					} onChange={ this.handleChange } />

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

  				<label for=""cPassword>
            Confirm password
  				</label>
					<input id="cPassword" type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				
					<Button
						id="signupBtn"
						type="submit"
            color="primary"
            variant="raised"
            >
							 Login 
					</Button>
  			</form>
      </div>
		)
	}
}
