import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from './utils/fetchImages';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      Notify.info('Please, enter something');
      return;
    }
    setIsLoading(true);
    try {
      const images = await fetchImages(searchQuery);
      if (images.hits.length === 0) {
        Notify.info(`Nothing was found on "${searchQuery}" request`);
      }
      setImages(images.hits);
      setQuery(searchQuery);
      setCurrentPage(1);
      setIsLoading(false);
      setResultsNumber(images.totalHits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoadMoreBtn = async e => {
    setCurrentPage(prevPage => prevPage + 1);
    setIsLoading(true);
    try {
      const images = await fetchImages(query, currentPage + 1);
      setImages(prevImages => [...prevImages, ...images.hits]);
      setIsLoading(false);
      setResultsNumber(images.totalHits);
    } catch (error) {
      console.log(error);
    }
  };

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
