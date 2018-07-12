import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getTurns, getGames} from '../../actions/games'
import './Board.css'

const classColors =  {'green': 0,'blue': 1,'yellow':2,'red':3, 'purple': 4, 'orange':5}
const numbersToColors =  {0:'green',1:'blue',2:'yellow',3:'red',4: 'purple',5: 'orange'}

class Board extends PureComponent  {
  state = {led1: '', led2:'',led3:'',led4:''}

  componentWillMount() {
    
    if (this.props.authenticated) {
      this.props.getTurns(this.props.gameId)
     
    }
  
  }

  selectColor = (e) => {
    if(this.state[e.target.id]===''){
      this.setState({[e.target.id]: 'green'})
    }else {
      const index = Object.keys(classColors).indexOf(this.state[e.target.id])
      this.setState({[e.target.id]: Object.keys(classColors)[(index+1) % Object.keys(classColors).length]})
    }
  }

 render() {
   
   

    return (
    <div>
      <div className='BoardContainer'>
        
          {this.props.turns && 
            this.props.turns.map(turn => {
              return <div className='boardRow'> {turn.user_input.map(input => {
               return ( 
                <div className='boardColumn'> 
                  <div className="led-box" >
                    <div id='led1' className={ `led ${numbersToColors[input]}`}></div>
                  </div>
                </div>
                )
              })}
               </div>
            }) 
          }   
    </div>
    <div className='boardColumn'> 
      <div onClick={this.selectColor} className="led-box">
        <div id='led1' className={ `led ${this.state.led1}`}></div>
      </div>
    </div>
    <button >Guess</button>
  </div>
  
  )
 }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  turns: state.turns
})


export default connect(mapStateToProps, {getTurns, getGames})(Board)