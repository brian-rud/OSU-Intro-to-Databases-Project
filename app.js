const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const handlebars = require('express-handlebars').create({defaultLayout:'main'})
const bodyParser = require('body-parser')

// Import routes
const indexRouter = require('./routes/index')
const recipesRouter = require('./routes/recipes')
const dietsRouter = require('./routes/diets')
const cuisinesRouter = require('./routes/cuisines')
const ingredientsRouter = require('./routes/ingredients')

// App setup
const app = new express()
app.set('port', 4000)

// Setup rendering
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Routing
app.use('/', indexRouter)
app.use('/recipes', recipesRouter)
app.use('/diets', dietsRouter)
app.use('/cuisines', cuisinesRouter)
app.use('/ingredients', ingredientsRouter)

// Start the app
app.listen(app.get('port'), () => {
  console.log('App running and accessible at http://localhost:' + app.get('port'))
})

