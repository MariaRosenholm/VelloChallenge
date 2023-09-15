import express from 'express';
import database from '../../lib/database.js';

const personTable = database.getTable('person');

const router = express.Router();

/**
 * Create
 */
router.post('/', (req, res) => {
  res.sendStatus(501);
});

/**
 * Retrieve
 */
router.get('/:id', (req, res) => {
  res.sendStatus(501);
});

/**
 * Update
 */
router.put('/:id', (req, res) => {
  res.sendStatus(501);
});

/**
 * Delete
 */
router.delete('/:id', (req, res) => {
  res.sendStatus(501);
});

/**
 * Index
 */
router.get('/', (req, res) => {
  res.sendStatus(501);
});

export default router;
