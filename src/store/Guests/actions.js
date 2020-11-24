import { fetchInfoFailed } from '../actions';
export const INIT_GUESTS_LIST = 'INIT_GUESTS_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

const initDialogs = (dialogs) => {
  return {
    type: INIT_GUESTS_LIST,
    payload: dialogs
  }
}

// const removeUser = (uid) => {
//   return {
//     type: REMOVE_FROM_LIST,
//     payload: uid,
//   }
// }

// const unique = (arr) => {
//   let result = [];
//   let lookupObj = {};

//   if (arr.length) {
//     for (let obj of arr) {
//       lookupObj[obj.uid] = obj;
//     }
  
//     for (let i in lookupObj) {
//       result.push(lookupObj[i]);
//     }
//   }

//   return result;
// }

export const fetchInitGuests = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/history/scansOfMe/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      let data = await res.json();
      dispatch(initDialogs(data));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}

// export const fetchRemoveFromIgnore = (uid) => async (dispatch) => {
//   const token = sessionStorage.getItem('x-auth-token');
//   if (token) {
//     let res = await fetch('http://localhost:3000/ignore/unset/', {
//       method: 'DELETE',
//       body: JSON.stringify({
//         'x-auth-token': token,
//         otherUid: uid,
//       }),
//     });

//     res.status === 200 && dispatch(removeUser(uid));
//   }
// }