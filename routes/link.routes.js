const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
} = require('../controllers/link.controller');

router.post('/links', createLink);
router.get('/links', getAllLinks);
router.get('/links/:code', getLinkStats);
router.delete('/links/:code', deleteLink);

module.exports = router;