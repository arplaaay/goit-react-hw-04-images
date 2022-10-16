import axios from 'axios';

const API_KEY = '30481667-781f04fd2c82c661abac917f2';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = async (searchName, page) => {
  const response = await axios.get(
    `?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

const apiImages = {
  getImages,
};

export default apiImages;
