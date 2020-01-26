import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, name, price, description, status } = this.props.details;
    
    return (
      <li className="menu-fish">
        <img src={image}></img>
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
      </li>
    )
  }
}

export default Fish;