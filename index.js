const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

const category_router = require('./router/category.router.js')
const quiz_router = require('./router/quizdata.router.js')
const leaderboard_router = require('./router/leaderboard.router.js')
const login_router = require('./router/login.router.js')
const signup_router = require('./router/signup.router.js')
const user_router = require('./router/user.router.js')
const score_router = require('./router/score.router.js')

const { DBConnection } = require('./db/db.connection.js')
DBConnection();

app.use('/categories', category_router)
app.use('/leaderboard', leaderboard_router)
app.use('/quiz', quiz_router)
app.use('/login', login_router)
app.use('/signup', signup_router)
app.use('/user', user_router)
app.use('/scores', score_router)


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check", errorMessage:"something went wrong ! Error 404" })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errorMessage key for more details", errorMessage: err.message })
})

app.listen(PORT, () => {
  console.log('server started');
});