var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {
  async create(email) {
    var user = await User.findByEmail(email);

    if (user != undefined) {
      try {
        await knex.insert({
          user_id: user.id,
          used: 0,
          token: Date.now,
        });
      } catch (error) {
        console.log(err);
      }
    } else {
      return {
        status: false,
        err: "O email informado não existe no banco de dados!",
      };
    }
  }
}

module.exports = new PasswordToken();
