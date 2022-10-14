import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img className={styles.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    </>
  );
};
