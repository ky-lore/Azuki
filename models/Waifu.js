const { model, schema } = require('mongoose')

const Waifu = new Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    srcName: { type: String, required: true },
    img: { type: String, required: true },
    tags: { type: Array, required: true }
})

