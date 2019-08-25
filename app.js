const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const db = require('./models') // 引入資料庫
const passport = require('./config/passport')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 新增引擎
app.set('view engine', 'handlebars') // 使用引擎
app.use(bodyParser.urlencoded({ extended: true }))
// setup session and flash
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
// setup passport
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

require('./routes')(app, passport)
app.use('/upload', express.static(__dirname + '/upload'))

app.listen(process.env.PORT || 3000, () => {
  db.sequelize.sync() // 跟資料庫同步
})
