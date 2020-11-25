import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  ASCENDING,
  DESCENDING,
  BYAGE,
  BYRATING,
  BYDISTANCE,
} from '../constants';

const Sorting = ({ active, setSort }) => {
  return (
    <div>
      <FormControl style={{width: '100%', marginBottom: '20px'}}>
        <InputLabel htmlFor="grouped-select">Sorting</InputLabel>
        <Select native value={active} onChange={(event) => setSort(event.target.value)} id="grouped-select">
          <optgroup label={BYAGE}>
            <option value={`${BYAGE}: ${ASCENDING}`}>{`${BYAGE}: ${ASCENDING}`}</option>
            <option value={`${BYAGE}: ${DESCENDING}`}>{`${BYAGE}: ${DESCENDING}`}</option>
          </optgroup>
          <optgroup label={BYRATING}>
            <option value={`${BYRATING}: ${ASCENDING}`}>{`${BYRATING}: ${ASCENDING}`}</option>
            <option value={`${BYRATING}: ${DESCENDING}`}>{`${BYRATING}: ${DESCENDING}`}</option>
          </optgroup>
          <optgroup label={BYDISTANCE}>
            <option value={`${BYDISTANCE}: ${ASCENDING}`}>{`${BYDISTANCE}: ${ASCENDING}`}</option>
            <option value={`${BYDISTANCE}: ${DESCENDING}`}>{`${BYDISTANCE}: ${DESCENDING}`}</option>
          </optgroup>
        </Select>
      </FormControl>
    </div>
  );
}

export default Sorting;