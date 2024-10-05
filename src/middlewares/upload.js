import multer from 'multer';
import createHttpError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  //   destination: (req, file, callback) => {
  //     callback(null, TEMP_UPLOAD_DIR);
  //     },

  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, callback) => {
    // callback(null, file.originalname); - якщо потрібно зберегти файл з початковим ім"ям, таким яким його завантажують
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

//не обов"язкове налаштування для встановлення максимального розміру файлу що завантажується у байтах
const limits = {
  fileSize: 1024 * 1024 * 5,
};

//якщо потрібно щоб файли із розширенням .ехе не можна було завантажити
const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return callback(createHttpError(400, '.exe is not valid extension'));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
