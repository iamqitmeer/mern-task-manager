import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    console.log("decodeToken.id --->", decodeToken.id);

    req.id = decodeToken.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
