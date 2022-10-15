import React, { Component } from 'react';
import './App.css';
import apiImages from '../services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    largeImage: '',
    tag: '',
    searchName: '',
    page: 1,
    isLoading: false,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      apiImages
        .getImages(searchName, page)
        .then(dataImages =>
          this.setState({ images: [...prevState.images, ...dataImages] })
        )
        .catch(console.log())
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleFormSubmit = input => {
    if (input === this.state.searchName) {
      return;
    } else {
      this.setState({
        searchName: input,
        page: 1,
        images: [],
        isModalOpen: false,
        isLoading: true,
      });
    }
  };

  handleButtonLoad = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleOpenModal = currentImageId => {
    this.setState(prevState => {
      return {
        isModalOpen: true,
        largeImage: prevState.images.find(
          imageId => imageId.id === currentImageId
        ).largeImageURL,
        tag: prevState.images.find(imageId => imageId.id === currentImageId)
          .tags,
      };
    });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isLoading, isModalOpen, largeImage, tag } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} openModal={this.handleOpenModal} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleButtonLoad} />}
        {isModalOpen && (
          <Modal
            closeModal={this.handleCloseModal}
            largeImage={largeImage}
            alt={tag}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
