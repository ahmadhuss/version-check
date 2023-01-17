import { compareVersions } from 'compare-versions';

// Models
import Version from '../models/version.js';

// Utils
import { checkElements } from '../utils/array.js';
import { saveRecord } from '../utils/dbCollection.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * This function will add the new application version
 * @param req {*} - Node.js request object
 * @param res {*} - Node.js response object
 * @returns {Promise<*>} - Returns the resolved promise object
 **/
export const addAppVersion = async function (req, res) {
  try {
    // Create new version entry
    const versionObj = await new Version({
      version: req.body.version,
      forceUpdateFrom: req.body.forceUpdateFrom,
      type: req.body.type
    });

    await saveRecord(versionObj, res);
    return res
      .status(200)
      .json(successResponse('App version added successfully'));
  } catch (err) {
    console.error('addAppVersion: Internal server error:', err);
    return res.status(500).json(errorResponse('Internal Server Error'));
  }
};

/**
 * This function will take the current used version of the app and check if new
 * version is available or not
 * @param req {*} - Node.js request object
 * @param res {*} - Node.js response object
 * @returns {Promise<*>} - Returns the resolved promise object
 **/
export const getVersionDetail = async function (req, res) {
  try {
    const { userAppVersion, type } = req.body;

    // This will give us an array of versions based on the latest release date.
    // But we will get the first entry from the array and compare it.
    const versions = await Version.aggregate([
      { $match: { type } },
      { $sort: { releaseDate: -1 } },
      { $project: { _id: 0 } },
      { $limit: 1 }
    ]);

    if (checkElements(versions)) {
      const { version } = versions[0];
      let status = false;
      // If it return 1, it means yes there is new version available
      // 1.1 (Latest Release Date Version) 1.0 (Use provided version)
      if (compareVersions(version, userAppVersion) === 1) {
        status = true;
      }

      const payload = {
        status: status,
        latestVersion: version, // Return latest version no
        isUpdateAvailable: status // Return the boolean flag
      };

      return res
        .status(200)
        .json(successResponse('Version detail fetched successfully', payload));
    } else {
      return res.status(200).json(successResponse('Version is not found'));
    }
  } catch (err) {
    console.log('getVersionDetail: Internal server error:', err);
    return res.status(500).json(errorResponse('Internal Server Error'));
  }
};
