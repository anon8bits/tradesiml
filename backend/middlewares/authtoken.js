// middleware/auth.js
import { verify } from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
