import jwt from 'jsonwebtoken'


// function for setting token in cookies
export const SetToken = async (res, currentUser) => {
    const userAuthToken = await jwt.sign({ _id: currentUser._id }, process.env.JWT_SECRET);
    res.cookie('isLoggedIn', userAuthToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 100 * 60 * 60 * 1000),
        secure: true,
        sameSite: "none"
    })
    return res.status(201).json({
        success: true,
        message: "Login Success!"
    });
}