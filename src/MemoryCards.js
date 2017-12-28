import shuffle from 'shuffle-array';

class MemoryCards {
  constructor() {
    this.cards = [];
    this.NUM_IMAGES = 10;
  }

  generateCardSet() {
    //
    // Generate a set of cards with image pairs
    //
    this.cards = [];
    let id=1;
    for(let i=1; i <= this.NUM_IMAGES; i++) {
      let card1 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      this.cards.push(card1);
      this.cards.push(card2);
      id++;
    }

    // Randomize the card set
    shuffle(this.cards);  
  }

  getCard(id) {
    for(let i=0; i < 2*this.NUM_IMAGES; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }

  flipCard(id, imageUp) {
    this.getCard(id).imageUp = imageUp;
  }

  setCardAsMatched(id, matched) {
    this.getCard(id).matched = matched;
  }

  cardsHaveIdenticalImages(id1, id2) {
    if (this.getCard(id1).image === this.getCard(id2).image) {
      return true;
    } else {
      return false;
    }
  }

};

export default MemoryCards;
