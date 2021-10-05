import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../services/picture-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const KEY = '23664732-922ae8a04b91fba4e55f74778';

export default class ImagesInfo extends Component {
  state = {
    inputValue: null,
    error: null,
    status: Status.IDLE,
    page: 1,
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;
    const currentPage = this.state.page;
    const prevPage = prevState.page;

    if (prevValue !== nextValue) {
      this.setState({ status: Status.PENDING, page: 1 });

      API.fetchPictures(nextValue, currentPage, KEY)
        .then((images) => {
          if (images.hits.length === 0) {
            toast.error(`Не находим картинок по запросу ${nextValue}`);
          }
          this.setState({ images: images.hits, status: Status.RESOLVED });
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevPage !== currentPage) {
      API.fetchPictures(nextValue, currentPage, KEY)
        .then((images) => {
          if (images.hits.length === 0) {
            toast(`Закончились картинки по запросу ${nextValue}`);
          }
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: Status.RESOLVED,
          });
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, status, images } = this.state;

    console.log(images);

    if (status === 'idle') {
      return <div>Введите запрос.</div>;
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} />
          {images.length > 0 && <Button onClick={this.handleClick} />}
        </>
      );
    }
  }
}
