var jwt = require('jsonwebtoken');

validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            return res.status(403).json({
                ok: false,
                message: err.message
            });
        } else {
            req.body._userId = decoded.userId;
            req.body._userRole = decoded.role;
            next();
        }
    });
};

validateEmployeeRole = (req, res, next) => {

    const role = req.body._userRole;

    if (!role) {
        return res.status(403).json({
            ok: false,
            error: "Acceso denegado"
        });
    }

    if (role != "employee" && role != "admin") {
        return res.status(403).json({
            ok: false,
            error: "Acceso denegado"
        });
    }

    next();
};

validateAdminRole = (req, res, next) => {

    const role = req.body._userRole;
    
    if (!role) {
        return res.status(403).json({
            ok: false,
            error: "Acceso denegado"
        });
    }

    if (role != "admin") {
        return res.status(403).json({
            ok: false,
            error: "Acceso denegado"
        });
    }

    next();
};

module.exports = {
    validateUser,
    validateEmployeeRole,
    validateAdminRole
};