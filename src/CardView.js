import React, { Component } from 'react';

class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.flipped) {
      this.props.onClick(this.props.id,this.props.image);      
    }
  }

  render() {
    let imPath = './images/back.jpg';
    if (this.props.flipped) {
      imPath = './images/' + this.props.image;
    }
    return (
      <div className="Card">
        <img src={require(`${imPath}`)} width="100" onClick={this.onClick}/>
      </div>
    );      
  };
};

export default CardView;
