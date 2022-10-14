import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => {
        const { id, webformatURL, tags } = image;
        return (
          <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} />
        );
      })}
    </ul>
  );
};
