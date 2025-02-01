const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Invalid token payload or missing userId' });
        }

        const admin = await prisma.admin.findUnique({ where: { id: decoded.userId } });

        if (!admin) {
            return res.status(403).json({ message: 'Admin not found' });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }

        req.admin = admin;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authAdmin };
