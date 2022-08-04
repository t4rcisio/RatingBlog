import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"


import Controller from "./Controller";


dotenv.config()
class UserController extends Controller {
  constructor() {
    super("User");
  }

  HashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async GetByID(UserID) {
    const parameters = {
      where: {
        UserID,
      },
    };
    const userSearch = await super.GetOne(parameters);

    console.log({ ...userSearch });

    if (userSearch.data.UserId == UserID) return true;

    return false;
  }

  async Create(request, response) {
    const [UserId, Password] = request.body;

    const userIdValidate = await this.GetByID(UserId);

    if (userIdValidate) {
      return response.status(409).send("Nick name already exist");
    }

    const params = {
      data: {
        UserId,
        Password: this.HashPassword(Password),
      },
    };

    const newUser = await super.Create(params);

    if (newUser.error) return response.status(500).send("Error to crete user");

    return response.status(200).response("User created");
  }

  async Login(request, response) {
    const [UserId, Password] = request.body;

    const params = {
      where: {
        UserId,
      },
    };

    const findUser = await super.GetOne(params);

    if (findUser.error) return response.status(500).send("Login server Error");

    if (findUser.data.UserID != UserId)
      return response.status(404).send("Incorrect nick or password");

    const hashPassword = findUser.data.Password;
    const hash = bcrypt.compareSync(Password, hashPassword);
    if (!hash) return response.status(404).send("Incorrect nick or password");

    const payload = {
        Id: findUser.data.id
        Perm:
    }

  }
}
