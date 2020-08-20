const Peer = require("simple-peer")

const peer = new Peer({
  //Need to know which peer is initializing session 
  //Check to see if url is /#init, set to true or false whether its first peer or not 
  initiator: location.hash === '#init',
  //Weird, usually set to false. Figure out how to traverse your network
  trickle: false
}) 
//Goal is to have peers discover each other --usually done through server 
//For this project, we will have text box which we can copy and paste into each other page 

//listen for own events
peer.on('signal', function (data) {
  document.getElementById("yourId").value = JSON.stringify(data)
})

//Configuring connect button when another person clicks connect
document.getElementById('connect').addEventListener('click', function () {
  const otherId = JSON.parse(document.getElementById('otherId').value)
  //signal the peer with our otherId
  peer.signal(otherId)
})

//send peer messages
document.getElementById('send').addEventListener('click', function () {
  const yourMessage = document.getElementById('yourMessage').value
  document.getElementById('messages').textContent += yourMessage + '\n'
  peer.send(yourMessage)
})

//display data the peer has sent {text}
peer.on('data', function (data) {
  document.getElementById('messages').textContent += data + '\n'
})