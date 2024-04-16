module.exports = {
  succes: (message, data, code) => {
    return {
      code: code,
      message,
      data: data,
    };
  },
  error: (message, code, data) => {
    return {
      code: code,
      message,
      data: data,
    };
  },
};
