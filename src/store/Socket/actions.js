import { notification } from 'antd';
export const INIT_SOCKET = 'INIT_SOCKET';

const initSocket = (socket) => {
  return {
    type: INIT_SOCKET,
    payload: socket,
  }
}

export const openSocket = (uid, token) => (dispatch) => {
  if (uid && token) {
    const socket = new WebSocket("ws://localhost:3000/ws/auth/?uid=" + uid + "&ws-auth-token=" + token);
    socket.onopen = () => dispatch(initSocket(socket));
    socket.onerror = (error) => {
      notification.error({
        message: error,
      });
    }

    socket.onmessage = function (message) {
      const obj = JSON.parse(message.data);
      notification.info({
        message: obj.body,
        duration: null
      });
    }
  } else console.log('you not logged');
}