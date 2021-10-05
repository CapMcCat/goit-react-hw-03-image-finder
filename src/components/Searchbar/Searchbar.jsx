import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  clearState = () => {
    return this.setState({
      inputValue: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (inputValue === '') {
      return toast('Введите Ваш запрос!');
    }

    this.props.onSubmit(inputValue);
    this.clearState();
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type='submit' className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            name='inputValue'
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
