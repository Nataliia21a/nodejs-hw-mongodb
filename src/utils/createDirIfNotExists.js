//створює папку, якщо її немає
import * as fs from 'node:fs/promises';

export const createDirIfNotExists = async (path) => {
  try {
    //перевіряємо чи існує папка з даним шляхом
    await fs.access(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      //якщо папки не існує, створюємо її
      await fs.mkdir(path);
    }
  }
};
