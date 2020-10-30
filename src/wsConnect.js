export const wsConnect = (uid, wsAuthToken) => {
  let socket = new WebSocket("ws://localhost:3000/ws/auth/?uid=" + uid + "&ws-auth-token=" + wsAuthToken);
  console.log("attempting websocket connection");
  console.log("ws://localhost:3000/ws/auth/?uid=" + uid + "&ws-auth-token=" + wsAuthToken);

  socket.onopen = () => {
    console.log("web socket successfully connected");
    console.log(socket);
    return socket;
  }
  //
  // socket.onclose = (event) => {
  //   console.log("Socket was closed: ", event)
  // }
  //
  // socket.onerror = (error) => {
  //   console.log("socket error: ", error)
  // }
  //
  // socket.onmessage = (message) => {
  //   console.log("rx: ", message.data)
  // }
  //

  // setInterval(sendMessage, 7000)
}