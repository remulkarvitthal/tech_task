import express, { Router } from 'express';
import {propertyController} from '../modules/property';

const router: Router = express.Router();
router
    .route('/manageProperty')
    .post(propertyController.create)
    .get(propertyController.getProperties)
    .patch(propertyController.update)
    .delete(propertyController.remove);

router.route('/manageProperty/:propertyId').get(propertyController.getById);
export default router;
