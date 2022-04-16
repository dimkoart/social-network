import { UserTokenPayload } from "../helpers/userTypes";

const jwt = require('jsonwebtoken');

class TokenService {
  generate(payload: UserTokenPayload) {
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY
    )
    return token
  }
}

module.exports = new TokenService();