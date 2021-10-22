export function isEmail(mailAddress) {
  if (!mailAddress) {
    return false;
  }

  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(String(mailAddress).toLowerCase())) {
    return false;
  }

  return true;
}

export function isNullOrEmpty(value) {
  return !value || value === undefined || value === '' || value.length === 0;
}

export function isNullOrUndefined(object) {
  return !object || object === undefined;
}

export const convertFloat = val => {
  try {
    return parseFloat(val);
  } catch (error) {
    return 0;
  }
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const padClientID = (str, size) => {
  let strResult = str;
  while (strResult.length < (size || 2)) {
    strResult = '0' + strResult;
  }
  return strResult;
};
