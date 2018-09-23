'use strict'

const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = express.Router();

const chats = require('./bot')

app.use(express.static(path.join(__dirname, '../public')))

router.get('/', (req, res) => {
    res.sendFile(path.resolve('../views/chatBot.html'))
})

app.use('/', router)

chats.load(io)

http.listen(3000, () => {
    console.log("Server started on port: 3000")
})