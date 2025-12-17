
const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal sever error"
    })
}
export default errorHandler