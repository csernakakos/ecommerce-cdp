export default function errorHandler(error, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json({
        status: error,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    })
}