export const successResponse = function (response, successResponse = null) {
  if (successResponse && successResponse?.data) {
    return response.status(200).json({
      status: 'success',
      message: 'API has been called successful',
      data: successResponse?.data
    });
  } else {
    return response.status(200).json({
      status: 'success',
      message: 'API has been called successful'
    });
  }
};

export const errorResponse = function (response, errorResponse = null) {
  if (errorResponse && errorResponse?.response) {
    const err = errorResponse?.response;
    const statusCode = err?.status || 400;
    const message = err?.statusText || 'Request has been failed';
    return response.status(statusCode).json({
      status: 'error',
      message: message
    });
  } else {
    return response.status(400).json({
      status: 'error',
      message: 'Request has been failed'
    });
  }
};

export const errorResponseGlobal = function (response, message) {
  return response
    .status(400)
    .json({ status: 'error', message: `Failed: ${message}` }); // 400 - Bad request
};
