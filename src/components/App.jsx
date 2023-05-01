import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import axios from 'axios';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
    setQuery(searchQuery);
    if (searchQuery === '') {
      Notify.info('Please, enter something');
      return;
    }
    setCurrentPage(1);
    setIsLoading(true);
  };

  const handleLoadMoreBtn = e => {
    setCurrentPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const API_KEY = '33482948-b5c83a7dc2a9b66355ab60109';
    const BASE_URL = 'https://pixabay.com/api/';
    async function fetchImages(searchQuery, page) {
      try {
        const response = await axios(
          `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    if (currentPage === 1) {
      fetchImages(query, currentPage)
        .then(images => {
          if (images.hits.length === 0) {
            Notify.info(`Nothing was found on "${query}" request`);
          }
          setImages(images.hits);
          setCurrentPage(1);
          setIsLoading(false);
          setResultsNumber(images.totalHits);
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }
    fetchImages(query, currentPage)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setIsLoading(false);
        setResultsNumber(images.totalHits);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  const shouldShowBtn = Math.ceil(resultsNumber / 12) > currentPage;
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery>
        <ImageGalleryItem images={images} />
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && shouldShowBtn && (
        <LoadMoreBtn onLoadMore={handleLoadMoreBtn} />
      )}
    </div>
  );
}
