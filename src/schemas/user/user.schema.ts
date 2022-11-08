import * as joi from '@hapi/joi';

export const user_register = joi.object({
  username: joi.string().required(),
  region: joi.string().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
export const user_login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
