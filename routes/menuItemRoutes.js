const express = require('express');
const router =express.Router();
const MenuItem = require("../models/MenuItem");


// post method for menuitem
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const saveddata = await menuItem.save();
    console.log("Data Saved...");
    res.status(200).json(saveddata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get method for menuitem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Saved...");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sour" || tasteType == "spicy" || tasteType== "sweet") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched.....");
      res.status(200).json(response);
    }else{
        res.status(404).json({error:"Invalid work Type"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports=router;