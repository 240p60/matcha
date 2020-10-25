export const wsConnect = (uid, wsAuthToken) => {
  let socket = new WebSocket("ws://localhost:3000/ws/auth/?uid=" + uid + "&ws-auth-token=" + wsAuthToken)
  console.log("attempting websocket connection")
  console.log("ws://localhost:3000/ws/auth/?uid=" + uid + "&ws-auth-token=" + wsAuthToken)

  socket.onopen = () => {
    console.log("web socket successfully connected")
    sendMessage(1, "test message")
  }

  socket.onclose = (event) => {
    console.log("Socket was closed: ", event)
  }

  socket.onerror = (error) => {
    console.log("socket error: ", error)
  }

  socket.onmessage = (message) => {
    console.log("rx: ", message.data)
  }

  function sendMessage(receiver, body) {
    let message = {};
    message.type = "message";
    message.uidReceiver = receiver;
    message.body = body;
    let jsonMessage = JSON.stringify(message)
    console.log("tx: " + jsonMessage)
    socket.send(jsonMessage)
  }

  // setInterval(sendMessage, 7000)
}