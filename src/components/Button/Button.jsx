import React, { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button className={s.Button} onClick={this.props.onClick} type='button'>
        Load more
      </button>
    );
  }
}
export default Button;
