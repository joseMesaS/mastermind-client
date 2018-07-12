import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getTurns, getGames, addTurn} from '../../actions/games'
import './Board.css'

const classColors =  {'green': 0,'blue': 1,'yellow':2,'red':3, 'purple': 4, 'orange':5 }
const numbersToColors =  {0:'green',1:'blue',2:'yellow',3:'red',4: 'purple',5: 'orange'}

class Board extends PureComponent  {
  state = {led1: 'green', led2:'green',led3:'green',led4:'green'}

  componentWillMount() {
    
  }

  selectColor = (e) => {
    if(this.state[e.target.id]===''){
      this.setState({[e.target.id]: 'green'})
    }else {
      const index = Object.keys(classColors).indexOf(this.state[e.target.id])
      this.setState({[e.target.id]: Object.keys(classColors)[(index+1) % Object.keys(classColors).length]})
    }
  }

  makeTurnHandler = (e) => {
    e.preventDefault()
    const input = Object.values(this.state).map(color => {
      return classColors[color]
    })
    this.props.addTurn(this.props.gameId, input)
    
  }

 render() {
   
   

  return (
    <div>
      <div className='inputColors' >
          
        <div className='rowInputs'> 
            {Object.keys(this.state).map( key =>{
              return (
                  <div key={key} className='boardColumn'> 
                    <div  className="led-box">
                      <div onClick={this.selectColor} id={key} className={ `led ${this.state[key]}`}></div>
                    </div>
                  </div>
              )
            })}
          </div>
          <br></br>
          <a href="something" onClick={this.makeTurnHandler} className="guessBtn">Guess</a>
        {/* <button className='guessBtn'  >Guess</button> */}
      </div>
    </div>
  
  )
 }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  turns: state.turns
})


export default connect(mapStateToProps, {getTurns, getGames, addTurn})(Board)