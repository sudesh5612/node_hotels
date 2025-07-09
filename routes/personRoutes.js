const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// post method use to send data
router.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method use to get the data from the person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched...");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("res fetched..");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// put method 

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );
      if(!response){
        return res.status(404).json({error:'person not found'});
      }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Method

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
        return res.status(404).json({error:'person not found'});
      }
    console.log("Data Deleted");
    res.status(200).json({message:'person Deleted successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
