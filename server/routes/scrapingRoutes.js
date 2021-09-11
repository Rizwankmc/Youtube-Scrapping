import express from 'express';
import {
  fetchListFromDB,
  fetchUpdatedList,
  fetchVideoDetails,
} from '../controllers/scrapingController.js';

const router = express.Router();

router.get('/listing', fetchListFromDB);

router.get('/updatedListing', fetchUpdatedList);

router.post('/getVideoDetails', fetchVideoDetails);

export default router;
