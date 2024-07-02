import express from "express";
import categories from "./routes/categories";

const app = express();

app.use("/api/categories", categories);

const PORT = 5570;

app.listen(PORT, () => console.log("listening on port " + PORT));
