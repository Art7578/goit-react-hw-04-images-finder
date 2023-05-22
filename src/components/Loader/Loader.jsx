import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.loader}>
      <span className={css.spinner}>
        <RotatingLines width="50" strokeColor="orange" animationDuration="1" />
      </span>
      Loading ...
    </div>
  );
};

export default Loader;