import Joi from 'joi';

// Validation schema for signup
export const signupSchema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required'
        })
});

// Validation schema for login
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Middleware to validate request body against a schema
export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message.replace(/\"/g, '') // Remove quotes from error messages
        }));
        
        return res.status(400).json({
            message: 'Validation error',
            errors
        });
    }
    
    next();
};
