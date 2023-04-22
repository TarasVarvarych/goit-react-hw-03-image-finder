import axios from 'axios';

const API_KEY = '33482948-b5c83a7dc2a9b66355ab60109';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(searchQuery, page = 1) {
  try {
    const response = await axios(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
