const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Post = require("./models/Post")
const bodyParser = require('body-parser')


mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://localhost:27017/testDB", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to DB!')
    })

app.use(bodyParser.json())

app.get('/posts',async (req,res) => {
    res.json(await Post.find())
})

app.post("/posts", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })
    await post.save()
    res.send(post)
})

app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

app.listen(2000)


