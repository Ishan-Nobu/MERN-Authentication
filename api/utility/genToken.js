const jwt = require('jsonwebtoken')

// generate jwt token
const genToken = (user_id, res) => {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '15d' });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/"
    })
}

module.exports = genToken;