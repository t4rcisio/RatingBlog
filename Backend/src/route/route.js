import Router from "express";
import CompaniesRoute from "./companies.js";
import ProfesorRoute from "./professor.js";
import RatingRoute from "./rating.js";

const route = Router();

route.use("/companies", CompaniesRoute);
route.use("/professor", ProfesorRoute);
route.use("/rating", RatingRoute);

export default route;
