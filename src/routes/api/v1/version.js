import express from 'express';
const router = express.Router();

// Controller
import {
  addAppVersion,
  getVersionDetail
} from '../../../controllers/vesion.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     addAppVersion:
 *       example:
 *         type: ANDROID
 *         version: "1.0"
 *
 *     checkVersion:
 *       example:
 *         userAppVersion: "1.1"
 *         type: ANDROID
 *
 *     getVersionList:
 *       type: object
 *       required:
 *         - page
 *         - limit
 *         - filter
 *         - sort
 *         - search
 *       properties:
 *         page:
 *           type: string
 *           description: The number of page
 *         limit:
 *           type: string
 *           description: The records per page
 *         sort:
 *           type: object
 *           description: The sort fields
 *         filter:
 *           type: object
 *           description: The filter fields
 *         search:
 *           type: string
 *           description: The search page
 *
 *       example:
 *         page: 1
 *         limit: 10
 *         sort: {}
 *         filter: {}
 *         search: ""
 */

/**
 * @swagger
 * /api/v1/version:
 *  post:
 *    summary: Add Version Detail
 *    tags:
 *      - name: App Version
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addAppVersion'
 *    responses:
 *      201:
 *        description: App version added successfully.
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      405:
 *        description: Method Not Allowed
 */
router.route('/').post(addAppVersion);

/**
 * @swagger
 * /api/v1/version/check:
 *  post:
 *    summary: Check version
 *    tags:
 *      - name: App Version
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/checkVersion'
 *    responses:
 *      201:
 *        description: App version added successfully.
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      405:
 *        description: Method Not Allowed
 */
router.route('/check').post(getVersionDetail);

export default router;
