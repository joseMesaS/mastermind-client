import * as React from 'react'

export default class GameDetailsInput extends React.PureComponent {

  handleChange = (event) => {
    const value = event.target.value;
    const userInput = event.target.name;

    this.setState({
      [userInput]: value.split('').map(v => +v)
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.state.userInput.length !== 4) {
        console.log("Your input is not 4")
    }
    return this.props.addTurn(this.props.gameId, this.props.userId, this.state.userInput)
  }


  render() {
    return (<div>
      <h2>Add a Code</h2>

      <form onSubmit={this.handleSubmit}>
        <label>
          Your Code:
          <input type="text" name="userInput" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>)
  }
}