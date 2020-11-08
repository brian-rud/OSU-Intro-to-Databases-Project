const sql = require('./db.js');

class User {
	constructor(email, firstName, lastName, password) {

		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;

	}

	static fromReqBody(reqBody) {
		return new User(
			reqBody.email,
			reqBody.firstName,
			reqBody.lastName,
			reqBody.password
			);
	}

	static fromUserDbDto(userDbDto){
		return new User(
			userDbDto.email,
			userDbDto.first_name,
			userDbDto.last_name,
			userDbDto.password
			);
	}
}

class UserDbDto {
	constructor(email, first_name, last_name, password) {
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
	}
}

User.fetchAll = result => {
	sql.query("SELECT * from users", (err, res) => {
		if (err){
			console.log("Error: ", err);
			result(null, err);
			return;
		}

		var userArray = [];
		res.forEach(userDbDto => userArray.push(User.fromUserDbDto(userDbDto)));
		console.log("users: ", userArray);
		result(null, userArray);

	})
}

module.exports = User;