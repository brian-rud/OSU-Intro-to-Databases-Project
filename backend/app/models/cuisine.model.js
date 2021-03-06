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
            newCuisineDbDto.name
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
    console.log("Creating cuisine:", cuisineDbDto);

    sql.getConnection((err, connection) => {
        connection.beginTransaction(err => {

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

Cuisine.updateOne = (body, result) => {
	console.log("Updating cuisine:", body);

	sql.getConnection((err, connection) => {
		connection.beginTransaction(err => {
			sql.query("UPDATE cuisines SET name = ? WHERE cuisine_id = ?", [body.name, body.cuisineId], (err, res) => {
				if (err) {
					connection.rollback();
					connection.release();
					console.log("error:", err);
					result(err, null);
					return;
				}

				connection.commit();
				connection.release();

				console.log("Updated cuisine: ", res.insertId);
				result(null, res.insertId);
			});
		});
	});
};

Cuisine.deleteOne = (body, result) => {
	//TODO: fix frontend so form sends in the below format
	body = {cuisineId: body};

	sql.query('DELETE FROM cuisines WHERE cuisine_id=?', [parseInt(body.cuisineId)], (cuisineErr, cuisineRes) => {
		if (cuisineErr) {
			console.log('Error: ', cuisineErr)
			result(cuisineErr, null);
			return
		}

		sql.query("DELETE FROM recipe_cuisines WHERE cuisine_id=?", [parseInt(body.cuisineId)], (recipeCuisineErr, recipeCuisineRes) => {
			if (recipeCuisineErr) {
				console.log('Error: ', recipeCuisineErr)
				result(recipeCuisineErr, null);
				return
			}

			console.log('rows affected: ', cuisineRes.affectedRows);
			result(null, cuisineRes.affectedRows);
		});
	});
}

module.exports = Cuisine;