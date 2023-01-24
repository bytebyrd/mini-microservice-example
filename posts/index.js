const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
const posts = {}
app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.status(200).send(posts)
});

app.get('/posts/:postId', (req, res) => {
    try{
        const { postId } = req.params;
        const post = posts[postId];
        if(!post){
            throw new Error('No data available');
        }
        res.status(200).send(post)
    }catch(e){
        res.status(400).send({ error: e.message })
    }
   
    
})
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;
    posts[id] = { id, title }
    axios.post('http://localhost:4005/events', { type: "POST_CREATED", data: { id, title }})
    res.status(201).send(posts[id]);
})

app.listen(4000, () => {
    console.log('Server is up')
})