import express, { Router } from 'express';
import { agentController } from '../modules/agent';

const router: Router = express.Router();
router
    .route('/manageAgent')
    .post(agentController.createAgent)
    .get(agentController.getAgents)
    .patch(agentController.updateAgent)
    .delete(agentController.removeAgent);

router.route('/manageAgent/:agentId').get(agentController.getById);
export default router;
