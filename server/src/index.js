import dotenv from "dotenv";
import { app } from "./app.js";
import connectDb from "./db/index.db.js";

dotenv.config();

const port = process.env.PORT || 8000;

	connectDb()
		.then(() => {
			// bind to 0.0.0.0 so the server is reachable from other devices on the LAN
			app.listen(port, "0.0.0.0", () => {
				console.log(`app is running and listening on port ${port}`);
			});
		})
	.catch((error) => {
		console.log("db connection got failed {inde.js} error :", error);
	});
