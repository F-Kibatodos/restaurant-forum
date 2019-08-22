const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 新增引擎
app.set('view engine', 'handlebars') // 使用引擎

require('./routes')(app)

app.listen(3000)
