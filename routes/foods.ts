import express from "express";
import { Category, getCategories } from "./categories";
import { validate } from "../schemas/Food";

const router = express.Router();

interface Food {
  _id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
  isFavored?: boolean;
}

const foods: Food[] = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Apple",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 6,
    price: 10,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Banana",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 5,
    price: 15,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Cucumber",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 8,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Chips",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 12,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Cookies",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 8,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Muffins",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 13,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    name: "Carrot",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 7,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    name: "Sallad",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 4,
    price: 14,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    name: "Orange",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 7,
    price: 20,
  },
];

router.get("/", (req, res) => {
  return res.send(foods);
});

router.get("/:id", (req, res) => {
  const food = foods.find((food) => food._id === req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.post("/", (req, res) => {
  // validera
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]);

  // skapa det nya food objektet
  const category = getCategories().find(
    (category) => category._id === req.body.categoryId
  );

  if (!category)
    return res.status(400).send("Category with the given id was not found.");

  const food: Food = {
    _id: Date.now().toString(),
    name: req.body.name,
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    category,
    isFavored: false,
  };

  foods.push(food);

  // skicka ut till klienten
  return res.status(201).send(food);
});

export default router;
