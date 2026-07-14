import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import routes from "./routes";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use("/api/v1", routes);





app.use(notFoundMiddleware);
app.use(errorMiddleware);


export default app;