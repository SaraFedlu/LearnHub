const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
            console.log('User:', req.user);
        } else {
            console.log('User:', req.user);
            res.status(403).json({ msg: 'Access denied' });
        }
    };
};

module.exports = { roleMiddleware };