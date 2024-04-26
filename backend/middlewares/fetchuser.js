import jwt from 'jsonwebtoken';
const JWT_secret = "395539685e5fe9ef44a24c1e9f25b811";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
   // console.log(token)
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using correct token' });
    }
    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
    } catch (error) {
        return res.status(401).send({ error: 'Please authenticate using correct token' });
    }
    next();
};

export default fetchuser;
