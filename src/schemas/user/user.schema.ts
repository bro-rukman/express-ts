import * as joi from '@hapi/joi';

export const user_register = joi.object({
  username: joi.string().required().label('username field is required'),
  region: joi.string().required().label('region field is required'),
  password: joi
    .string()
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$'))
    .required()
    .label('Password at least 6 character and must contains at least one capital number and special character'),
});
export const user_login = joi.object({
  username: joi.string().required().label('username field is required'),
  password: joi.string().required().label('password field is required'),
});

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
