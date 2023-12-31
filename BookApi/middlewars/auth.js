const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            const userId = decodedToken.userId;
            req.auth = {
                userId: userId
            };
            next();
        } else {
            res.status(401).json({ error: 'Non autorisé' });
        }
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        res.status(401).json({ error: 'Non autorisé' });
    }
};