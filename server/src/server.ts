import app from "./app";
import { logger } from "./lib/logger";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
});