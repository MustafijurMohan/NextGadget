const express = require('express');
const app = express();
const router = require('./src/routes/api');

 // Security middleware require
const rateLimit = require('express-rate-limit')
const sanitize = require('mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors')
const hpp = require('hpp');
const xss = require('xss')
const { connectDB } = require('./src/config/database');
const { connectCloudinary } = require('./src/config/cloudinary');


// Express Implement
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }, { limit: '50mb' }))

// Database Connection
connectDB()
// Cloudinary Connection
connectCloudinary()

 // Security Middleware Implement
app.use(helmet())
app.use(cors())
app.use(hpp())

app.use((req, res, next) => {
	req.body = sanitize(req.body)
	req.query = sanitize(req.query)
	req.params = sanitize(req.params)
	next()
})

// Simple middleware to sanitize input
app.use((req, res, next) => {
	if(req.body) {
		for(let key in req.body) {
			if(typeof req.body[key] === 'string') {
				req.body[key] === xss(req.body[key])
			}
		}
	}
	next()
})

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)
if (process.env.NODE_ENV === "production") {
	app.use(limiter);
}


// Manageing Backend API Routing
app.use('/api/v1', router)


module.exports = app;   