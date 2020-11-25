import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchInfoFailed } from '../../store/actions';
import { Pagination } from '../index';
import { Item } from './Item';
import { Filter } from '../Filter';

import styles from './Matchs.module.scss';

export default function Matchs() {
  let length;
  length = window.innerWidth >= 1280 ? 3 : window.innerWidth < 1280 && window.innerWidth >= 660 ? 2 : 1;
  const [itemsAmount, setItemsAmount] = React.useState({min: 1, max: length});
  const dispatch = useDispatch();
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
    options: {
      value: [],
    },
    online: false,
    wasntLiked: false,
  });

  const changeAmount = (page) => {
    if (page === 1) {
      setItemsAmount({
        min: page,
        max: page * length,
      })
    } else {
      setItemsAmount({
        min: (page - 1) * length + 1,
        max: page * length,
      })
    }
  }

  const actionOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const changeFilters = (name, value) => {
    if (name === 'options') {
      setFilters({
        ...filters,
        [name]: {value: value },
      });
    } else if (name === 'online' || name === 'wasntLiked') {
      setFilters({
        ...filters,
        [name]: value,
      });
    } else setFilters({
        ...filters,
        [name]: { min: value[0], max: value[1] },
      });
  };

  const applyFilters = React.useCallback(async () => {
    let token = sessionStorage.getItem('x-auth-token');
    if (token) {
      let data = {
        'x-auth-token': token,
        rating: filters.rating,
        age: filters.age,
        radius: {
          radius: filters.radius.max,
        },
      };
      if (filters.options.value.length) {
        data.interests = filters.options.value;
      }

      if (filters.wasntLiked) {
        data.wasntLiked = filters.wasntLiked;
      }

      if (filters.online) {
        data.online = filters.online;
      }

      let res = await fetch('http://localhost:3000/search/', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (res.status === 202) {
        dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
      } else {
        let data = await res.json();
        setUsers(data);
      }
    } else dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
  }, [filters, dispatch]);

  React.useEffect(() => {
    applyFilters();
  }, []);

  const setLike = async (uid) => {
    let res = await fetch('http://localhost:3000/like/set/', {
      method: 'PUT',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    });

    res.status === 200 && applyFilters();
  }

  const unsetLike = async (uid) => {
    let res = await fetch('http://localhost:3000/like/unset/', {
      method: 'DELETE',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    });

    res.status === 200 && applyFilters();
  }

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
          {(Array.isArray(users) && users.length) ? users.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return (item.fname === 'admin' ? null : (
                <Item setLike={setLike} unsetLike={unsetLike} key={item.uid} data={item} />
              ));
            } else return null;
          }) : <div className={styles.EmptyDialogs}>No matching users</div>}
        </div>
        {(Array.isArray(users) && users.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(users.length / length)}/> : null}
      </div>
    </div>
  );
}
