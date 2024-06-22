import jwt from 'jsonwebtoken';

const fetchuser = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token1" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token2" });
    }
};

export default fetchuser;
