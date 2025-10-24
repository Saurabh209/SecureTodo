export const ErrorHandler = (err, req, res, next) => {
    console.log(err.message)
    err.message = err.message || "Something Wrong Here"
    err.statuscode = err.statuscode || 500
    return res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}