import axios from 'axios';

const API_KEY = '30481667-781f04fd2c82c661abac917f2';

export const getImages = (searchName, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response =>
      response.data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      }))
    );
};

const apiImages = {
  getImages,
};

export default apiImages;
