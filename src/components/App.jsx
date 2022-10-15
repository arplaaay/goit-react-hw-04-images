import { useState, useEffect } from 'react';
import './App.css';
import apiImages from '../services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [state, setState] = useState({
    images: [],
    largeImage: '',
    tag: '',
    searchName: '',
    page: 0,
    isLoading: false,
    isModalOpen: false,
    isNewSearchInput: true,
  });

  useEffect(() => {
    if (state.searchName) {
      apiImages
        .getImages(state.searchName, state.page)
        .then(dataImages =>
          setState(prev => ({
            ...prev,
            images: prev.isNewSearchInput
              ? dataImages
              : [...prev.images, ...dataImages],
          }))
        )
        .catch(console.log)
        .finally(() => setState(prev => ({ ...prev, isLoading: false })));
    }
  }, [state.page, state.searchName]);

  const handleFormSubmit = input => {
    if (input === state.searchName) {
      return;
    } else {
      setState(prev => ({
        ...prev,
        searchName: input,
        page: 1,
        images: [],
        isModalOpen: false,
        isLoading: true,
        isNewSearchInput: true,
      }));
    }
  };

  const handleButtonLoad = () => {
    setState(prev => ({
      ...prev,
      page: prev.page + 1,
      isLoading: true,
      isNewSearchInput: false,
    }));
  };

  const handleOpenModal = currentImageId => {
    setState(prev => ({
      ...prev,
      isModalOpen: true,
      largeImage: prev.images.find(imageId => imageId.id === currentImageId)
        .largeImageURL,
      tag: prev.images.find(imageId => imageId.id === currentImageId).tags,
    }));
  };

  const handleCloseModal = () => {
    setState(prev => ({ ...prev, isModalOpen: false }));
  };

  // const { images, isLoading, isModalOpen, largeImage, tag } = this.state;

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={state.images} openModal={handleOpenModal} />
      {state.isLoading && <Loader />}
      {state.images.length > 0 && !state.isLoading && (
        <Button onClick={handleButtonLoad} />
      )}
      {state.isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          largeImage={state.largeImage}
          alt={state.tag}
        />
      )}
      <ToastContainer />
    </div>
  );
}
