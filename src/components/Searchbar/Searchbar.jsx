import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchName, setsearchName] = useState('');

  const handleNameChange = evt => {
    const { value } = evt.currentTarget;

    setsearchName(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Please, write something to find ', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    onSubmit(searchName);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <AiOutlineSearch size="20px" />
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={searchName}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
