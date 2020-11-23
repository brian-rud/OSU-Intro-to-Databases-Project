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

	static fromNewDietDbDto(dietId, newDietDbDto) {
       	return new Diet(
            dietId,
            newDietDbDto.name,
            newDietDbDto.description
        )
    }
}

class DietDbDto {
	constructor(diet){
		this.diet_id = diet.dietId;
		this.name = diet.name;
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

Diet.create = (newDiet, result) => {
    let dietDbDto = new DietDbDto(newDiet);
    console.log("Creating diet:");
    console.log(dietDbDto);

    sql.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {

            sql.query("INSERT INTO diets SET ?", dietDbDto, (err, res) => {
                if (err) {
                    connection.rollback();
                    connection.release();
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                connection.commit();
                connection.release();

                var newDietResult = Diet.fromNewDietDbDto(res.insertId, dietDbDto);

                console.log("Created diet: ", newDietResult);
                result(null, newDietResult);
            });
        });

    });
};

module.exports = Diet;