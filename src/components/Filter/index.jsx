import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Range, InputOptions } from '../index';
import styles from './Filter.module.scss';
import { ReactComponent as Arrow } from '../../assets/img/arrow.svg';

const useStyles = makeStyles({
  root: {
    marginRight: 0,
  },
  label: {
    '& > span': {fontFamily: 'Montserrat'},
  },
});

export const Filter = ({ filters, changeFilters, active, onClick, onSubmit }) => {
  const arrowRef = React.useRef(null);
  const classes = useStyles();

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
      <div className={cx(styles.FiltersList, { [styles.activeList]: active })}>
        <div className={styles.FiltersContainer}>
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
          <FormControlLabel
            className={`${classes.root} ${classes.label}`}
            control={<Checkbox checked={filters.online} onChange={() => changeFilters('online', !filters.online)} name="online" />}
            label="Only online users"
          />
          <FormControlLabel
            className={`${classes.root} ${classes.label}`}
            control={<Checkbox checked={filters.wasntLiked} onChange={() => changeFilters('wasntLiked', !filters.wasntLiked)} name="wasntLiked" />}
            label="Show liked users"
          />
          <InputOptions
            name="options"
            input={filters.options}
            onChange={changeFilters}
          />
        </div>
        <div className={styles.FiltersActionBlock}>
          <Button
            onClick={() => applyFilters()}
            type="submit"
            subClass="submit"
            text="Apply Filters"
          />
        </div>
      </div>
    </div>
  );
};
