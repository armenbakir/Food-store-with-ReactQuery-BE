import express from "express";
import categories from "./routes/categories";
import foods from "./routes/foods";
import users from "./routes/users";
import auth from "./routes/auth";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // cors middleware
app.use(express.json()); // express.jason middleware

app.use("/api/users", users); //     route handler middleware
app.use("/api/auth", auth); //              -- // --
app.use("/api/categories", categories); //  -- // --
app.use("/api/foods", foods); //            -- // --

const PORT = 5570;

app.listen(PORT, () => console.log("listening on port " + PORT));
