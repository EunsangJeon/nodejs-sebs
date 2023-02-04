import { Router } from 'express';
import { listAction, detailAction, createAction } from "./controller.js";

const router = Router();

router.get('/', listAction);
router.get('/:id', detailAction);
router.post('/', createAction);

export { router };
