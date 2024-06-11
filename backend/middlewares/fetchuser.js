import jwt from 'jsonwebtoken';

const fetchuser = (req, res, next) => {
    const token = req.cookies.authtoken;
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using correct token' });
    }
    jwt.verify(token, process.env.JWT_secret, (err, user) => {
        if (err) return res.status(403).send("Invalid Token");
        req.user = user; 
        next();
    });
};

export default fetchuser;
