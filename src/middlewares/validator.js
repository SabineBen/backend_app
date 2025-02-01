const { check } = require('express-validator');

const validateRegistration = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('name').notEmpty().withMessage('Name is required'),
    check('phoneNumber').notEmpty().withMessage('You must enter only numbers'),
];

const validateUpdateProfile = [
    check('name').optional().notEmpty().withMessage('Name is required'),
    check('country').optional().notEmpty().withMessage('Country is required'),
    check('phoneNumber')
        .optional()
        .isNumeric()
        .withMessage('Phone number must only contain numbers')
        .isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
];

const validateLogin = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateUpdateProfile
};
