import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    const searchValue = e.currentTarget.value.toLowerCase();
    setSearchQuery(searchValue);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Please, enter a search term');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};