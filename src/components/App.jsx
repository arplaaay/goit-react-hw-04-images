import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import apiImages from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  // const [state, setState] = useState({
  //   images: [],
  //   largeImage: '',
  //   tag: '',
  //   searchName: '',
  //   page: 0,
  //   isLoading: false,
  //   isModalOpen: false,
  //   isNewSearchInput: true,
  // });

  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [tag, setTag] = useState('');
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLastPage = useRef(true);
  // console.log(isLastPage.current);

  useEffect(() => {
    if (!searchName || !page) {
      return;
    } else {
      async function getImages() {
        setIsLoading(true);

        try {
          const dataImages = await apiImages.getImages(searchName, page);
          const { length } = dataImages.hits;

          if (!length) {
            toast.error('There are no images matching your search!');
            isLastPage.current = true;
            setIsLoading(false);
            return;
          }

          const countTotalResults = page * 12;
          isLastPage.current = countTotalResults >= dataImages.totalHits;

          setImages(prevState => [...prevState, ...dataImages.hits]);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast.error('There are no images matching your search!');
        }
      }

      getImages();
    }
  }, [searchName, page]);

  const handleFormSubmit = input => {
    if (input === searchName) {
      return;
    } else {
      setSearchName(input);
      setPage(1);
      setImages([]);
      setIsModalOpen(false);
      setIsLoading(true);
    }
  };

  const handleButtonLoad = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const handleOpenModal = currentImageId => {
    setIsModalOpen(true);

    setLargeImage(
      images.find(image => image.id === currentImageId).largeImageURL
    );
    setTag(images.find(image => image.id === currentImageId).tags);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const { images, isLoading, isModalOpen, largeImage, tag } = this.state;

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} openModal={handleOpenModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleButtonLoad} />}
      {isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          largeImage={largeImage}
          alt={tag}
        />
      )}
      <ToastContainer />
    </div>
  );
}
