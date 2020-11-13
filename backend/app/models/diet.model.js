sql = require("./db");

class Diet {
	constructor(dietId, name){
		this.dietId	= dietId;
		this.name = name;
	}

	static fromReqBody(reqBody){
		return new Diet(
			reqBody.dietId,
			reqBody.name
			);
	}

	static fromDietDbDto(dietDbDto){
		return new Diet(
			dietDbDto.diet_id,
			dietDbDto.name
			);
	}
}

class DietDbDto {
	constructor(diet_id, name){
		this.diet_id = diet_id;
		this.name = name;
	}
}

Diet.fetchAll = result => {
	sql.query("SELECT * FROM diets", (err, res) => {
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return
		}

		let dietArray = [];
		res.forEach(dietDbDto => dietArray.push(Diet.fromDietDbDto(dietDbDto)));
		result(null, dietArray);
	})

}

module.exports = Diet;