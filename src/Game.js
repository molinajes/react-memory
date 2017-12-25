import React, { Component } from 'react';
import './App.css';

import CardView from './CardView.js';
import shuffle from 'shuffle-array';

const NUM_IMAGES = 10;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      turnNo : 1,
      pairsFound : 0,
      clicks : 0,
      firstId : undefined,
      secondId : undefined,
      dirty : undefined
    };
    this.initGame();
    this.onCardClicked = this.onCardClicked.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
  }

  initGame() {
    this.generateCards();
    this.setState({
      turnNo : 1,
      pairsFound : 0,
      clicks : 0,
      firstId : undefined,
      secondId : undefined,
      dirty : undefined
    });
  }

  generateCards() {
    this.cards = [];
    let id=1;
    for(let i=1; i <= NUM_IMAGES; i++) {
      let card1 = {
        id: id,
        image : i+".jpg",
        flipped: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image : i+".jpg",
        flipped: false,
        matched: false
      };
      id++;
      this.cards.push(card1);
      this.cards.push(card2);
    }
    shuffle(this.cards);  
  }

  getCard(id) {
    for(let i=0; i < 2*NUM_IMAGES; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }

  identicalImages(id1,id2) {
    let card1 = this.getCard(id1);
    let card2 = this.getCard(id2);
    if (card1.image === card2.image) {
      return true;
    } else {
      return false;
    }
  }

  getCardViews() {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.cards.forEach(c => {
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
    let card1 = this.getCard(this.state.firstId);
    card1.flipped = false;
    let card2 = this.getCard(this.state.secondId);
    card2.flipped = false;
    this.setState({
      dirty:Date.now(),
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
      let card = this.getCard(id);
      card.flipped = true;
      this.setState({
        firstId : id,
        clicks : 1
      });
    } else if (this.state.clicks === 1) {
      let card = this.getCard(id);
      card.flipped = true;
      this.setState({
        secondId : id,
        clicks : 2
      });

      if (this.identicalImages(id,this.state.firstId)) {
        let card1 = this.getCard(this.state.firstId);
        card1.matched = true;
        let card2 = this.getCard(id);
        card2.matched = true;
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

    if (this.state.pairsFound === NUM_IMAGES) {
      header = <div><h1>GAME COMPLETE!</h1>
      <h3>You used {this.state.turnNo-1} turns</h3>
      <button onClick={this.onPlayAgain}>Play again?</button></div>;      
    }
    return (
      <div className="App">
        <header className="App-header">
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

