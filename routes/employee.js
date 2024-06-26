const express = require("express");
const Employee = require("../models/employee");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const result = await Employee.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const result = await Employee.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const result = await Employee.findByPk(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { employeeID: req.params.id },
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await Employee.destroy({
      where: { employeeID: req.params.id },
    });
    if (result) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
