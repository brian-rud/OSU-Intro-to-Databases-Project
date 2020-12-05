sql = require("./db");

class Meal {
	constructor (mealId, name){
		this.mealId	= mealId;
		this.name = name;
	}

	static fromReqBody(reqBody){
		return new Meal(
			reqBody.mealId,
			reqBody.name
		);
	}

	static fromMealDbDto(mealDbDto){
		return new Meal(
		 mealDbDto.meal_id,
		 mealDbDto.name
		);
	}

	static fromNewMealDbDto(mealId, newMealDbDto) {
        return new Meal(
            mealId,
            newMealDbDto.name
        )
    }
}

class MealDbDto {
	constructor (meal){
		this.meal_id = meal.mealId;
		this.name = meal.name;
	}
}

Meal.fetchAll = result => {
	sql.query("SELECT * FROM meals", (err, res) => {
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return
		}

		let mealArray = [];
		res.forEach(mealDbDto => mealArray.push(Meal.fromMealDbDto(mealDbDto)));
		result(null, mealArray);
	})

}

Meal.create = (newMeal, result) => {
    let mealDbDto = new MealDbDto(newMeal);
    console.log("Creating meal:", mealDbDto);

    sql.getConnection((err, connection) => {
        connection.beginTransaction(err => {

            sql.query("INSERT INTO meals SET ?", mealDbDto, (err, res) => {
                if (err) {
                    connection.rollback();
                    connection.release();
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                connection.commit();
                connection.release();

                var newMealResult = Meal.fromNewMealDbDto(res.insertId, mealDbDto);

                console.log("Created meal: ", newMealResult);
                result(null, newMealResult);
            });
        });
    });
};

Meal.updateOne = (body, result) => {
	console.log("Updating meal:", body);

	sql.getConnection((err, connection) => {
		connection.beginTransaction(err => {
			sql.query("UPDATE meals SET name = ? WHERE meal_id = ?", [body.name, body.mealId], (err, res) => {
				if (err) {
					connection.rollback();
					connection.release();
					console.log("error:", err);
					result(err, null);
					return;
				}

				connection.commit();
				connection.release();

				console.log("Updated meal: ", res.insertId);
				result(null, res.insertId);
			});
		});
	});
};

Meal.deleteOne = (mealId, result) => {
	sql.getConnection((err, connection) => {
		connection.beginTransaction(err => {
			sql.query("DELETE FROM meals WHERE meal_id = ?", [mealId], (err, res) => {
				if (err) {
					connection. rollback();
					connection.release();
					console.log("error:", err);
					result(err, null);
					return;
				}

				connection.commit();
				connection.release();

				console.log("Deleted meal:", res.insertId);
				result(null, res.insertId);
			});
		});
	});
}

module.exports = Meal;