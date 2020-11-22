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

	static fromNewCuisineDbDto(cuisineId, newCuisineDbDto) {
        return new Cuisine(
            cuisineId,
            newCuisineDbDto.name,
            newCuisineDbDto.description
        )
    }
}

class CuisineDbDto {
	constructor (cuisine){
		this.cuisine_id = cuisine.cuisineId;
		this.name = cuisine.name;
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

Cuisine.create = (newCuisine, result) => {
    let cuisineDbDto = new CuisineDbDto(newCuisine);
    console.log("Creating cuisine:");
    console.log(cuisineDbDto);

    sql.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {

            sql.query("INSERT INTO cuisines SET ?", cuisineDbDto, (err, res) => {
                if (err) {
                    connection.rollback();
                    connection.release();
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                connection.commit();
                connection.release();

                var newCuisineResult = Cuisine.fromNewCuisineDbDto(res.insertId, cuisineDbDto);

                console.log("Created cuisine: ", newCuisineResult);
                result(null, newCuisineResult);
            });
        });

    });
};


module.exports = Cuisine;