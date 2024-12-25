export const isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
};
