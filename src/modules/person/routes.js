import express from "express";
import database from "../../lib/database.js";

const personTable = database.getTable("person");

const router = express.Router();

/**
 * Create
 */
router.post("/", (req, res) => {
  let response = personTable.putDocument({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    city: req.body.city,
  });
  res.send(response);
});

/**
 * Retrieve
 */
router.get("/:id", (req, res) => {
  let response = personTable.getDocument(req.params.id);
  res.send(response);
});

/**
 * Update
 */
router.put("/:id", (req, res) => {
  let response = personTable.updateDocument({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    city: req.body.city,
  });
  res.send(response);
});

/**
 * Delete
 */
router.delete("/:id", (req, res) => {
  let response = personTable.deleteDocument(req.body.id);
  res.send(response);
});

/**
 * Index
 */
router.get("/", (req, res) => {
  let response = personTable.indexDocuments();
  res.send(response);
});

export default router;
