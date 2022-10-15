import { useEffect } from 'react';
import styles from './Modal.module.css';
import { PropTypes } from 'prop-types';

export default function Modal({ closeModal, largeImage, alt }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscapeClick);

    return () => document.removeEventListener('keydown', onEscapeClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEscapeClick = evt => {
    if (evt.key === 'Escape') {
      closeModal();
    } else return;
  };

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    } else return;
  };

  // const { largeImage, alt } = this.props;

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
