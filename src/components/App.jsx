import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from 'images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Message from './Message/Message';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import mapper from './utils/mapper';
import Error from './Error/Error';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchQuery, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [tag, setTag] = useState('');
  const [showModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  const openModal = (tag, largeImageURL) => {
    toggleModal();
    setLargeImage(largeImageURL);
    setTag(tag);
  };

  const fetchGallery = (searchQuery, page) => {
    fetchImages(searchQuery, page)
      .then(res => {
        const nextImages = mapper(res.data.hits);

        if (!res.data.hits.length) {
          setImages([]);
          toast.error('Sorry, image not found.');
          return;
        }

        setImages(prevState => [...prevState, ...nextImages]);
      })
      .catch(error => {
        setError(error);
        toast.error('Something went wrong');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);
    fetchGallery(searchQuery, page);
  }, [searchQuery, page]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length < 1 && (
        <Message>
          <h2>The gallery is empty</h2>
          <p>Use search field!</p>
        </Message>
      )}

      {error && <Error message={error.message} />}
      {images.length && (
        <ImageGallery images={images} onOpenModal={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 11 && <Button onBtnClick={onLoadBtnClick} />}
      {showModal && (
        <Modal largeImg={largeImage} altTag={tag} onModalClick={toggleModal} />
      )}
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
