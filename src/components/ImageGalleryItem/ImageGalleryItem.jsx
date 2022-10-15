import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, openModal, id }) => {
  return (
    <>
      <li className={styles.ImageGalleryItem} onClick={() => openModal(id)}>
        <img className={styles.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
