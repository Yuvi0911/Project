import express from "express";
import { multerUpload } from "../middlewares/multer";
import { newUser } from "../controllers/user";

const app = express.Router();

app.post("/new", multerUpload.single("avatar"), newUser);

export default app;