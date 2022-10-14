import React, { Component } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import apiImages from '../services/api';

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

    // console.log('prevState.searchName:', prevState.searchName);
    // console.log('this.state.searchName:', this.state.searchName);
    // console.log('Изменился запрос');

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

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        <ToastContainer />
      </div>
    );
  }
}
