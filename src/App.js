import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImagesInfo from './components/ImagesInfo/ImagesInfo';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = (inputValue) => {
    return this.setState({ searchValue: inputValue });
  };

  render() {
    injectStyle();

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImagesInfo inputValue={this.state.searchValue} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
