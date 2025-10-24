import jwt from 'jsonwebtoken'


export const loginAuthenticator = (req, res, next) => {
    const userAuthToken = req.cookies.isLoggedIn
    if (!userAuthToken) {
        return res.status(401).json({
            success:false,
            messege:"Unauthorized access"
        })
    }

    try {
        const decodedToken = jwt.verify(userAuthToken, process.env.JWT_SECRET)
        req.user = decodedToken
        next()

    } catch (err) {
        res.status(404).json({
            success:false,
            messege:"Invalid Token"
        });
    }

}

