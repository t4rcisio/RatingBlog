import bcrypt from "bcryptjs";

import Controller from "./Controller";

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

    const FindUser = await super.GetByID(params);
  }
}
