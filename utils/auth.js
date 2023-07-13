const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

const nonAuthRoutes = ["/login", "/signup", "/"];

const requiresTokenCheck = (path) => path && !nonAuthRoutes.includes(path);

module.exports = {
  authMiddleware: function ({ req }) {
    const path = req.path;
    // if route is non-auth, return req
    const requiredTokenCheckResult = requiresTokenCheck(path);

    if (path !== "/") {
      console.log({ path, requiredTokenCheckResult });
    }

    if (requiredTokenCheckResult === false) {
      return req;
    }

    console.log({path, requiredTokenCheckResult});

    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      // if no token, return no token error
      console.log("No token found", { token });
      throw new Error("No token found");
    }

    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
