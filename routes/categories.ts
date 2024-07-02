import express from "express";

const router = express.Router();

interface Category {
  _id: string;
  name: string;
}

const categories: Category[] = [
  {
    _id: "clrzmp7xl0000874wma80lh6c",
    name: "Fruit",
  },
  {
    _id: "clrzmp7xl0001874wozvggz9j",
    name: "Vegetables",
  },
  {
    _id: "clrzmp7xl0002874wjix0ig0c",
    name: "Snacks",
  },
];

router.get("/", (req, res) => {
  return res.send(categories);
});

export default router;
