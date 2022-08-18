const staffAuthMiddleware = (req, res, next) => {
    /**
     * const token = request.body.token;
     * const user_name = request.body.user_name;
     * const dob = request.body.dob;
     * const gender = request.body.gender;
    */
    
    // object destructuring;
    const {token} = req.body;
    if(token !== 'staff'){
        return res.json(http_formatter(null, 'User not authorized', false));
    }
    next();
}

module.exports = staffAuthMiddleware;