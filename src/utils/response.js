/**
 * Error Response function
 * @param message {string}
 * @param data {*}
 * @returns {{data, message, status: string}}
 */
export const errorResponse = function (message, data = null) {
  if (data) {
    return { status: 'error', message: message, data: data };
  } else {
    return { status: 'error', message: message };
  }
};

/**
 * Success Response function
 * @param message {string}
 * @param data {*}
 * @returns {{data, message, status: string}}
 */
export const successResponse = function (message, data = null) {
  if (data) {
    return { status: 'success', message: message, data: data };
  } else {
    return { status: 'success', message: message };
  }
};
