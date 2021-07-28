module.exports = require('mongoose').connect('mongodb://localhost/azuki_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})