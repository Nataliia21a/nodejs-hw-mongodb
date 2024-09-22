import { Schema, model } from 'mongoose';

import { handlerSaveError, saveUpdateOptions } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handlerSaveError);
sessionSchema.pre('findOneAndUpdate', saveUpdateOptions);
sessionSchema.post('findOneAndUpdate', handlerSaveError);

export const SessionCollection = model('session', sessionSchema);
