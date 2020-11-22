import { notification } from 'antd';
import { addMessage, addNotice, fetchInfoFailed } from '../actions';
export const INIT_SOCKET = 'INIT_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';

const initSocket = (socket) => {
  return {
    type: INIT_SOCKET,
    payload: socket,
  }
}

const closeSocket = () => {
  return {
    type: CLOSE_SOCKET,
  }
}

export const openSocket = (uid, token) => (dispatch) => {
  if (uid && token) {
    const socket = new WebSocket("ws://localhost:3000/ws/auth/?x-auth-token=" + token);
    socket.onopen = () => dispatch(initSocket(socket));
    socket.onerror = (error) => {
      notification.error({
        message: error,
      });
    }

    socket.onclose = () => {
      dispatch(closeSocket());
      dispatch(fetchInfoFailed({error: 'Unauthorized'}));
    }

    socket.onmessage = async function (message) {
      const obj = JSON.parse(message.data);
      obj.type === 'message' && dispatch(addMessage({
        uidSender: parseInt(obj.uidSender),
        uidReceiver: parseInt(uid),
        body: obj.body,
      }));

      if (obj.type === 'notif') {
        dispatch(addNotice(await obj));
        notification.info({
          message: obj.body,
        });
      }
    }
  } else console.log('you not logged');
}