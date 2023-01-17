import { errorResponse } from './response.js';

/**
 * Save record in the MongoDB
 * @param model
 * @param res
 * @returns {Promise<void>}
 */
export const saveRecord = async (model, res) => {
  await model
    .save()
    .then((response) => {
      console.info('model saved');
      return response;
    })
    .catch((err) => {
      console.error(
        'dbCollection/saveRecord: Error while saving model information',
        err
      );
      return res.status(500).json(errorResponse('Internal Server Error'));
    });
};
