import jwt from 'jsonwebtoken'


// function for setting token in cookies
export const SetToken = (res,currentUser) => {
    const userAuthToken = jwt.sign({ _id: currentUser._id }, process.env.JWT_SECRET);
    res.cookie('isLoggedIn', userAuthToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: false
    }).status(201)
    return res.status(201).json({
        success:true,
        message:"Login Success!"
    });
}