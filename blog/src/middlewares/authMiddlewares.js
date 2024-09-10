import jwt from 'jsonwebtoken';
//jwt để tạo or check token

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/auth/register');
    }
    //xác minh jwt
    jwt.verify(token, 'secret_key',(err, user) => {
        if (err) {
            return res.redirect('/auth/register');
        }
        req.user = user;
        next();
    });
};