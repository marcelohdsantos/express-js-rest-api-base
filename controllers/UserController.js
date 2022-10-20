var User = require("../models/User");
const { use } = require("../routes/routes");

class UserController {
  async index(req, res) {
    var users = await User.findAll();
    res.json(users);
  }

  async findUser(req, res) {
    var id = req.params.id;    

    var user = await User.findById(id);

    if(user == undefined) {
        res.status(404)
        res.json({})
    } else {
        res.status(200)
        res.json(user)
    }
  }

  async create(req, res) {
    var { email, name, password } = req.body;

    if (email == undefined) {
      res.status(400).json({ err: "O email é inválido!" });
    }

    if (name == undefined) {
      res.status(400).json({ err: "Nome inválido" });
      return;
    }

    if (password == undefined) {
      res.status(400).json({ err: "Senha inválida!" });
      return;
    }

    var emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406);
      res.json({ err: "O e-mail já está cadastrado." });
      return;
    }

    await User.new(email, password, name);

    res.status(200).json({ msg: "Tudo ok!" });
  }

  async edit(req, res) {
    var {name, role, email} = req.params.body 
    
    var result = await User.update(id, email, name, role);

    if (result != undefined) {
        if(result.status) {
            res.status(200);
            res.send('Tudo ok!');
        } else {
            res.status(406)
            res.send(result.err)
        }
    } else {
        res.status(406);
        res.send("Ocorreu um erro no servidor!");
    }
  }

  async remove(req, res) {

    var id = req.params.id;

    var result = await User.delete(id)

    if(result.status) {
      res.status(200);
      res.send("Tudo ok")
    } else {
      res.status(406);
      res.send(result.err)
    }
  }
}

module.exports = new UserController();
