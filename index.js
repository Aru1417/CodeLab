const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const database = require('./Config/Database');
const userRoutes = require("./Routes/User");
const questionRoutes = require("./Routes/Questions")
const codeRoute = require('./Routes/Code');
const getRoutes = require("./Routes/Getters");
const cookieParser = require("cookie-parser");
const cors = require("cors");



database.connect();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth",questionRoutes);
app.use("/api/v1/auth",getRoutes);
app.use('/api/v1/code', codeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
