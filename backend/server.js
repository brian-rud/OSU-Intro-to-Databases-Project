// add variables from .env file
dotenv = require('dotenv');
const result = dotenv.config()

if (result.error){
	throw result.error;
}

console.log(result.parsed);

// setup Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// setup app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// entity
require('./app/routes/user.routes')(app);
require('./app/routes/recipe.routes')(app);
require('.app/routes/ingredient.routes')(app);
require('./app/routes/diet.routes')(app);
require('./app/routes/cuisine.routes')(app);


// start server
const PORT = process.env.PORT || 8998
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});