import express from "express";
import { validate } from "../schemas/Food";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const foods = await prisma.food.findMany();
  return res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await prisma.food.findFirst({ where: { id: req.params.id } });

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.post("/", async (req, res) => {
  // validera
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]);

  // skapa det nya food objektet
  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res.status(400).send("Category with the given id was not found.");

  const food = await prisma.food.create({
    data: {
      name: req.body.name,
      numberInStock: req.body.numberInStock,
      price: req.body.price,
      categoryId: req.body.categoryId,
    },
  });

  // skicka ut till klienten
  return res.status(201).send(food);
});

router.put("/:id", async (req, res) => {
  // kolla så att food med id route parametern finns
  const food = await prisma.food.findFirst({
    where: { id: req.params.id },
  });

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  // validera body
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res.status(400).send("Category with the given id was not found.");

  // uppdatera food objektet
  const updatedFood = await prisma.food.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      numberInStock: req.body.numberInStock,
      price: req.body.price,
      categoryId: req.body.categoryId,
    },
  });

  // skicka ut det uppdaterade food objektet
  return res.send(updatedFood);
});

router.delete("/:id", async (req, res) => {
  const food = await prisma.food.findFirst({
    where: { id: req.params.id },
  });

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  const deletedFood = await prisma.food.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedFood);
});

export default router;
