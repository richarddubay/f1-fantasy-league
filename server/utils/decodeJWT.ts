const jwt = require("jsonwebtoken");

type JwtPayload = {
  id: string;
  name: string;
  [key: string]: any;
};

// function parseJwt(token: string, secretOrPublicKey: string): JwtPayload | null {
function parseJwt(
  token: string,
  secretOrPublicKey: string = "abc123"
): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secretOrPublicKey) as JwtPayload;
    return {
      id: decoded.id,
      name: decoded.name,
    };
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export default parseJwt;
