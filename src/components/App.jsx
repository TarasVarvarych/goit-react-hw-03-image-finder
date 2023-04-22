import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from './utils/fetchImages';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    resultsNumber: 0,
    isLoading: false,
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      Notify.info('Please, enter something');
      return;
    }

    this.setState({ isLoading: true });
    try {
      const images = await fetchImages(searchQuery);
      if (images.hits.length === 0) {
        Notify.info(`Nothing was found on "${searchQuery}" request`);
      }
      this.setState({
        images: images.hits,
        query: searchQuery,
        currentPage: 1,
        isLoading: false,
        resultsNumber: images.totalHits,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleLoadMoreBtn = async e => {
    const { query, currentPage } = this.state;
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    this.setState({ isLoading: true });
    try {
      const images = await fetchImages(query, currentPage + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        isLoading: false,
        resultsNumber: images.totalHits,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { images, isLoading, resultsNumber, currentPage } = this.state;
    const shouldShowBtn = Math.ceil(resultsNumber / 12) > currentPage;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && shouldShowBtn && (
          <LoadMoreBtn onLoadMore={this.handleLoadMoreBtn} />
        )}
      </div>
    );
  }
}
