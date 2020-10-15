import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  rail: {
    height: 1,
  },
  track: {
    height: 1,
  },
});

function valuetext(value) {
  return value;
}

export default function RangeSlider({
  title,
  min = 1,
  max = 100,
  step = 1,
  defaultValue = [1, 10],
  onChange,
}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    onChange(title.toLowerCase(), newValue);
  };

  return (
    <>
      <div id="range-slider" className={`${title}-slider`}>
        {title}
      </div>
      <div className={classes.root}>
        <Slider
          value={defaultValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          color="secondary"
          classes={{
            rail: classes.rail,
            track: classes.track,
          }}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </>
  );
}
