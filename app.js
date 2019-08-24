const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./models') // 引入資料庫

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 新增引擎
app.set('view engine', 'handlebars') // 使用引擎
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app)

app.listen(3000, () => {
  db.sequelize.sync() // 跟資料庫同步
})
