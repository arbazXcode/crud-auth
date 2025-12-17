
const errorHandler = async (err, req, res, next) => {
    const statuCode = err.statuCode || 500

    res.status(statuCode).json({
        success: false,
        message: err.message || "Internal sever error"
    })
}
export default errorHandler