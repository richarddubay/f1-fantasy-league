const jwt = require("jsonwebtoken");

type JwtPayload = {
  id: string;
  name: string;
  [key: string]: any;
};

// function parseJwt(token: string, secretOrPublicKey: string): JwtPayload | null {
function parseJwt(
  token: string,
  secretOrPublicKey: string = process.env.JWT_SECRET_KEY as string
): JwtPayload | null {
  if (!secretOrPublicKey) {
    throw new Error("JWT_SECRET_KEY environment variable is not set.");
  }

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
