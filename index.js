const express = require('express');
const path = require('path')
const http = require('http');
const socketIo = require('socket.io');
const server =require('http').createServer();
const io = socketIo(server);

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

io.on('connection', (socket) => {
  socket.on('location', (data) => {
    io.emit('receiveLocation', {id: socket.id, ...data});
  })
  console.log('a user connected');
})


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})