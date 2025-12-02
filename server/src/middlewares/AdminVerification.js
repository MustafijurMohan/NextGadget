

exports.AdminVerification = async (req, res, next) => {
    try {

        // console.log(req.user)
        // console.log(req.user?.isAdmin)

         // Ensure req.user exists (from protect middleware)
        if(!req.user) {
            const err = new Error("Not authorized. Please login first.")
            err.status = 401
            return next(err)
        }


        // Check if user has admin role/flag
        if(!req.user?.isAdmin) {
            const err = new Error("Access denied. Admins only.")
            err.status = 403
            return next(err)
        }

        // User is admin → continue
        next()
    } catch (error) {
        next(error)
    }
}