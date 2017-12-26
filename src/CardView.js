import React, { Component } from 'react';
import './Game.css';

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
      imPath = './images/' + this.props.image + ".jpg";
    }

    let className="Card";
    if (this.props.matched) {
      className=className+" Matched";
    }
    return (
        <img className={className} src={require(`${imPath}`)} width="100" height="100" alt="" onClick={this.onClick}/>
    );      
  };
};

export default CardView;
