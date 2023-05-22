import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onModalClick, largeImg, altTag }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClick]);

  return (
    <div className={css.overlay} onClick={() => onModalClick()}>
      <div className={css.modal}>
        {/* {this.props.children} */}
        <img src={largeImg} alt={altTag} className={css.image} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClick: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  altTag: PropTypes.string.isRequired,
};

export default Modal;