import jwt from 'jsonwebtoken'


export const loginAuthenticator = (req, res, next) => {
    const userAuthToken = req.cookies.isLoggedIn
    console.log("userToken: " , userAuthToken)
    if (!userAuthToken) {
        return res.redirect('/login')
    }

    try {
        const decodedToken = jwt.verify(userAuthToken, "I Am Elden Lord")
        req.user = decodedToken
        console.log("decodedTOken", decodedToken)
        next()

    } catch (err) {
        console.log("Invalid token:", err.message);
        res.redirect("/login");
    }

}

