import express from 'express';
import { addApi, getApi } from '../controllers/config.controller';

const router = express.Router();

router.post('/:path', addApi);
router.get('/:path', getApi);
