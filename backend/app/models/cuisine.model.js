sql = require("./db");

class Cuisine {
	constructor (cuisineId, name){
		this.cuisineId	= cuisineId;
		this.name = name;
	}

	static fromReqBody(reqBody){
		return new Cuisine(
			reqBody.cuisineId,
			reqBody.name
		);
	}

	static fromCuisineDbDto(cuisineDbDto){
		return new Cuisine(
		 cuisineDbDto.cuisine_id,
		 cuisineDbDto.name
		);
	}
}

class CuisineDbDto {
	constructor (cuisine_id, name){
		this.cuisine_id = cuisine_id;
		this.name = name;
	}
}

Cuisine.fetchAll = result => {
	sql.query("SELECT * FROM cuisines", (err, res) => {
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return
		}

		let cuisineArray = [];
		res.forEach(cuisineDbDto => cuisineArray.push(Cuisine.fromCuisineDbDto(cuisineDbDto)));
		result(null, cuisineArray);
	})

}

module.exports = Cuisine;