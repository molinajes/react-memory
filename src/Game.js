import React, { Component } from 'react';
import './Game.css';

import CardView from './CardView.js';
import MemoryCards from './MemoryCards';


class Game extends Component {
  constructor(props) {
    super(props);
    this.onCardClicked = this.onCardClicked.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
    this.memoryCards = new MemoryCards();
  }

  componentWillMount() {
    this.initGame();
  }

  initGame() {
    this.memoryCards.generateCards();
    this.setState({
      turnNo : 1,
      pairsFound : 0,
      clicks : 0,
      firstId : undefined,
      secondId : undefined
    });
  }

  getCardViews() {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.memoryCards.cards.forEach(c => {
      let cardView = <CardView key={c.id} 
      id={c.id} 
      image={c.image}
      flipped = {c.flipped}
      matched = {c.matched} 
      onClick={onClick}/>;
      cardViews.push(cardView);
    });
    return cardViews;
  }

  clearCards(id1,id2) {
    if (this.state.clicks !== 2) {
      return;
    }
    this.memoryCards.setFlipped(this.state.firstId,false);
    this.memoryCards.setFlipped(this.state.secondId,false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      clicks: 0,
      turnNo : this.state.turnNo+1
    });
  }

  onCardClicked(id,image) {
    if (this.state.clicks === 0 || this.state.clicks === 2) {
      if (this.state.clicks === 2) {
        this.clearCards(this.state.firstId,this.state.secondId);        
      }
      this.memoryCards.setFlipped(id,true);
      this.setState({
        firstId : id,
        clicks : 1
      });
    } else if (this.state.clicks === 1) {
      this.memoryCards.setFlipped(id,true);
      this.setState({
        secondId : id,
        clicks : 2
      });

      if (this.memoryCards.identicalImages(id,this.state.firstId)) {
        this.memoryCards.setMatched(this.state.firstId,true);
        this.memoryCards.setMatched(id,true);
        this.setState({
          pairsFound: this.state.pairsFound+1,
          firstId: undefined,
          secondId: undefined,
          turnNo : this.state.turnNo+1,
          clicks: 0
        });

      } else {
        setTimeout(() => { 
          this.clearCards(this.state.firstId,this.state.secondId);
        },5000); 
      }

    }
  }

  onPlayAgain() {
    this.initGame();
  }

  render() {
    let cardViews = this.getCardViews();
    let header = <div>
    <p>Turn: {this.state.turnNo}</p>
    <p>Pairs found: {this.state.pairsFound}</p></div>;

    if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
      header = <div><h1>GAME COMPLETE!</h1>
      <h3>You used {this.state.turnNo-1} turns</h3>
      <button onClick={this.onPlayAgain}>Play again?</button></div>;      
    }
    return (
      <div className="Game">
        <header className="Game-header">
          <div className="Game-title">Memory</div>
          {header}
        </header>
        <div align='center' style={{maxWidth:950,margin: '20px auto 0'}}>
          {cardViews}
        </div>
      </div>
    );
  }
}

export default Game;
