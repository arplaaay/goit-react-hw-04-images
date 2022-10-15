import { Component } from 'react';
import styles from './Modal.module.css';
import { PropTypes } from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = evt => {
    if (evt.key === 'Escape') {
      this.props.closeModal();
    } else return;
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal();
    } else return;
  };

  render() {
    const { largeImage, alt } = this.props;

    return (
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={largeImage} alt={alt} />
        </div>
      </div>
    );
  }
}
