export const handlerSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const saveUpdateOptions = function (next) {
  //надсилає оновлені дані
  this.options.new = true;
  //runValidators: true - додає перевірку монгус схемою при оновленні, бо по замовчуванню вона діє лише при додаванні
  this.options.runValidators = true;
  next();
};
