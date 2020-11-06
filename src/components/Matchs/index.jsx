import React from 'react';
import { Item } from './Item';
import { Filter } from '../Filter';

import styles from './Matchs.module.scss';

export default function Matchs() {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [filters, setFilters] = React.useState({
    rating: {
      min: 0,
      max: 100,
    },
    age: {
      min: 18,
      max: 30,
    },
    radius: {
      min: 1,
      max: 1000,
    },
    online: false,
  });

  const actionOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const changeFilters = (name, value) => {
    setFilters({
      ...filters,
      [name]: { min: value[0], max: value[1] },
    });
  };

  const applyFilters = React.useCallback(() => {
    fetch('http://localhost:3000/search/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        rating: filters.rating,
        age: filters.age,
        radius: {
          radius: filters.radius.max,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [filters]);

  React.useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className={styles.matchs}>
      <div className={styles.inner}>
        <Filter
          filters={filters}
          changeFilters={changeFilters}
          active={openFilter}
          onClick={actionOpenFilter}
          onSubmit={applyFilters}
        />
        <div className={styles.matchsContainer}>
          {Array.isArray(users) &&
            !!users.length &&
            users.map((item) => {
              return !item.isLiked ? (item.fname === 'admin' ? null : (
                <Item key={item.uid} data={item} />
              )) : null;
            })}
        </div>
      </div>
    </div>
  );
}
