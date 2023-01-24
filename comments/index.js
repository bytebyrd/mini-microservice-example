const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.status(200).send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[postId] || [];
    comments.push( { id, content });
    commentsByPostId[postId] = comments;
    axios.post('http://localhost:4005/events', { type: 'COMMENT_CREATED', data: { ...comment, postId } })
    res.status(201).send(comments[comments.length - 1])
})

app.post('/events', (req, res) => {
    const event = req.body;
    if(event.type === "POST_CREATED"){
         commentsByPostId[event.data.postId] = []; 
    }
})

app.listen(4001, () => {
    console.log('Comments service is up')
} )