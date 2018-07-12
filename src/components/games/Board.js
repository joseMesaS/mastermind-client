import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getTurns, getGames, addTurn} from '../../actions/games'
import './Board.css'

const classColors =  {'green': 0,'blue': 1,'yellow':2,'red':3, 'purple': 4, 'orange':5 }
const numbersToColors =  {0:'green',1:'blue',2:'yellow',3:'red',4: 'purple',5: 'orange'}

class Board extends PureComponent  {
  state = {led1: 'green', led2:'green',led3:'green',led4:'green'}

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

  makeTurnHandler = () => {
    const input = Object.values(this.state).map(color => {
      return classColors[color]
    })
    this.props.addTurn(this.props.gameId, input)
    this.props.getTurns(this.props.gameId)
  }

  renderScore = (colors,positions) => {
    const arr = []
    for (let index = 0; index < positions; index++) {
      arr.push( <div className='scorePoint white'  ></div>)
    }
    for (let index = 0; index < colors ; index++) {
      arr.push( <div className='scorePoint black'  ></div>)
    }
    
    return arr
  }

 render() {
   
   

  return (
    <div>
      <div className='BoardContainer'>
        
          {this.props.turns && 
            this.props.turns.map(turn => {
              return <div key={turn.id} className='boardRow'> {turn.user_input.map((input,i) => {
               return ( 
                <div key={i} className='boardColumn'> 
                  <div className="led-box" >
                    <div id='led1' className={ `led ${numbersToColors[input]}`}></div>
                  </div>
                </div>
                )
              })}<div className='scoreBox'>
                  <div className='scoreRow'>{this.renderScore(turn.colors_score, turn.postitons_score)[0] }{this.renderScore(turn.colors_score, turn.postitons_score)[1] }</div>
                  <div className='scoreRow'>{this.renderScore(turn.colors_score, turn.postitons_score)[2] }{this.renderScore(turn.colors_score, turn.postitons_score)[3] }</div>
                </div>
               </div> 
            }) 
          }   
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