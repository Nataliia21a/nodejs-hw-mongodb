import { Schema, model } from 'mongoose';

import { handlerSaveError, saveUpdateOptions } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      email: true,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handlerSaveError);
userSchema.pre('findOneAndUpdate', saveUpdateOptions);
userSchema.post('findOneAndUpdate', handlerSaveError);

export const userCollection = model('user', userSchema);
