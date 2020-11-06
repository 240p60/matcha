import React from 'react';
import cx from 'classnames';
import {Button, Range} from '../index';
import styles from './Filter.module.scss';
import { ReactComponent as Arrow } from '../../assets/img/arrow.svg';

export const Filter = ({ filters, changeFilters, active, onClick, onSubmit }) => {
  const arrowRef = React.useRef(null);

  const applyFilters = () => {
    onSubmit();
    onClick();
  }

  return (
    <div className={styles.FilterBlock}>
      <div className={styles.HeaderFilterBlock}>
        <h3>Filters</h3>
        <div ref={arrowRef} className={styles.arrowBlock} onClick={onClick}>
          <Arrow
            className={cx(styles.arrow, { [styles.activeArrow]: active })}
          />
        </div>
      </div>
      <div className={cx(styles.FiltesList, { [styles.activeList]: active })}>
        <Range
          title="Rating"
          defaultValue={[filters.rating.min, filters.rating.max]}
          onChange={changeFilters}
        />
        <Range
          title="Age"
          min={18}
          defaultValue={[filters.age.min, filters.age.max]}
          onChange={changeFilters}
        />
        <Range
          title="Radius"
          min={1}
          max={10000}
          step={100}
          defaultValue={[filters.radius.min, filters.radius.max]}
          onChange={changeFilters}
        />
        <div className={styles.FiltersActionBlock}>
          <Button
            onClick={applyFilters}
            type="submit"
            subClass="submit"
            text="Apply Filters"
          />
        </div>
      </div>
    </div>
  );
};
