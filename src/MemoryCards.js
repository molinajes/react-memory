import shuffle from 'shuffle-array';


class MemoryCards {
  constructor() {
    this.cards = [];
    this.NUM_IMAGES = 10;
  }

  generateCards() {
    this.cards = [];
    let id=1;
    for(let i=1; i <= this.NUM_IMAGES; i++) {
      let card1 = {
        id: id,
        image : i,
        flipped: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image : i,
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
    for(let i=0; i < 2*this.NUM_IMAGES; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }

  setFlipped(id,flip) {
    let card1 = this.getCard(id);
    card1.flipped = flip;
  }

  setMatched(id,matched) {
    let card1 = this.getCard(id);
    card1.matched = matched;
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

};

export default MemoryCards;
