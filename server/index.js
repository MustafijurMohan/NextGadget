require('dotenv').config();
const app = require('./app');
const hostname = '127.0.0.1'
const port = process.env.PORT || 4000;


// Home Page Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello Everyone. This is MERN Stack Ecommerce Project With Ostad Platform.')
})

// Undifined Routes
app.use((req, res) => {
    res.status(404).send('404 !!! Page not found.')
})


// Global Error 
app.use((err, req, res, next) => {
    // Log the error stack for debugging
    console.error(err.stack);

    // If headers have already been sent, delegate to the default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    // Determine the status code based on the error object or default to 500
    const status = err.status || 500;
    
    // Determine the error message and provide a generic fallback
    const message = err.message || 'Something Went Wrong!1';

    // If in development, include the stack trace for better debugging
    if (process.env.NODE_ENV === 'development') {
        return res.status(status).json({
            success: false,
            message: message,
            stack: err.stack
        });
    }

    // For production, return a clean error message without the stack trace
    return res.status(status).json({
        success: false,
        message: message
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running Successfull at http://${hostname}:${port}`);
})

