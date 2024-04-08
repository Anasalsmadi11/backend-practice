"use strict";

const express = require("express");
const dataModules = require("../models");

const router = express.Router();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

async function handleGetAll(req, res) {
  try {
    let allRecords = await req.model.findAll();
    res.status(200).json(allRecords);
  } catch (error) {
    console.log(error);
  }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.findOne(id);
    res.status(200).json(theRecord);
  } catch (error) {
    console.log(error);
  }
}

async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const model= await req.model.findOne({where:{id:id}})
    const obj = req.body;
    let updatedRecord = await model.update(obj);
    res.status(200).json(updatedRecord);

  } catch (error) {
    console.log(error);
  }
}

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let model= await req.model.findOne({where:{id:id}})
    let deletedRecord = await model.destroy();
    res.status(200).json(deletedRecord);
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
