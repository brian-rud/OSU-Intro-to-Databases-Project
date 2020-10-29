const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const handlebars = require('express-handlebars').create({defaultLayout:'main'})
const bodyParser = require('body-parser')

const app = new express()

app.use(express.static('public'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.get('/', (req,res) => {

  res.render('index');
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

app.listen(4000, () => {
  console.log('App listenign on port 4000')
})

