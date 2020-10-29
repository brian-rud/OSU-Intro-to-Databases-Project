const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const handlebars = require('express-handlebars').create({defaultLayout:'main'})
const bodyParser = require('body-parser')

const app = new express()

app.set('port', 4000)

app.use(express.static('public'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/recipes', (req,res) => {
  res.render('recipes')
})

app.get('/diets', (req,res) => {
  res.render('diets')
})

app.get('/cuisines', (req,res) => {
  res.render('cuisines')
})

app.get('/ingredients', (req,res) => {  
  res.render('ingredients')  
})

app.listen(app.get('port'), () => {
  console.log('App running and accessible at http://localhost:' + app.get('port'))
})

