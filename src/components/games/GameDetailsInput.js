import * as React from 'react'

export default class GameDetailsInput extends React.PureComponent {

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.name && this.state.description) {
      this.props.addPizza({
        name: this.state.name,
        description: this.state.description,
        ingredients: []
      })
    }
  }

  render() {
    return (<div>
      <h2>Add a Code</h2>

      <form onSubmit={this.handleSubmit}>
        <label>
          Your Code:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>)
  }
}