const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const handlebars = require('express-handlebars').create({defaultLayout:'main'})
const bodyParser = require('body-parser')
const cors = require('cors');

// add variables from .env file
dotenv = require('dotenv');
const result = dotenv.config()

if (result.error){
  throw result.error;
}

console.log(result.parsed);

// Import routes
const indexRouter = require('./routes/index')
const recipesRouter = require('./routes/recipes')
const dietsRouter = require('./routes/diets')
const cuisinesRouter = require('./routes/cuisines')
const ingredientsRouter = require('./routes/ingredients')
const mealRouter = require('./routes/meals')

// App setup
const app = new express()
const port = process.env.PORT || process.env.FRONTEND_PORT;

// Setup rendering
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

// Routing
app.use('/', indexRouter)
app.use('/recipes', recipesRouter)
app.use('/diets', dietsRouter)
app.use('/cuisines', cuisinesRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/meals', mealRouter)

// Start the app
app.listen(port, () => {
  console.log('App running and accessible at http://localhost:' + app.get('port'))
})

