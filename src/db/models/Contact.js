import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';
import { handlerSaveError, saveUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

// якщо після (post) збереження (методу запитів до бази create ) сталась помилка - виконай наступну функцію, де можна вказати статус помилки
contactSchema.post('save', handlerSaveError);

contactSchema.pre('findOneAndUpdate', saveUpdateOptions);

contactSchema.post('findOneAndUpdate', handlerSaveError);

const ContactColection = model('contact', contactSchema);

export const sortFields = ['name'];

export default ContactColection;
