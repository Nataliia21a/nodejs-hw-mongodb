export const handlerSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const saveUpdateOptions = function (next) {
  //надсилає оновлені дані
  this.options.new = true;
  //runValidators: true - додає перевірку монгус схемою при оновленні, бо по замовчуванню вона діє лише при додаванні
  this.options.runValidators = true;
  next();
};
