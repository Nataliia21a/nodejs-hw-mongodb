import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';
import { releaseNumberRegex } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(releaseNumberRegex).required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().required().messages({
    'any.required': 'isFavorite: must be exist',
  }),
  contactType: Joi.string().valid(...contactTypeList),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(releaseNumberRegex),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
