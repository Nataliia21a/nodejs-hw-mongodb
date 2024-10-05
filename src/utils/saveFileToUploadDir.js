import * as fs from 'node:fs/promises';
import * as path from 'path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

//ф-ція переміщує файл з папки temp у папку upload
export const saveFileToUploadDir = async (file) => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const newPath = path.join(UPLOAD_DIR, file.filename);

  await fs.rename(oldPath, newPath);

  return file.filename;
};
