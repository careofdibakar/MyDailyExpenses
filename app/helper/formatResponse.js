
exports.successResponse = (message, data = null) => {
  return {
    statusCode: 200,
    status: true,
    message: message,
    data: data,
  };
}
exports.errorResponse = (message, data = null) => {
  return {
    statusCode: 404,
    status: false,
    message: message,
    data: data,
  };
}