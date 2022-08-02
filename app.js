const express = require("express");
const userRouter = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("---------------------------------");
  console.log(`🚀 App is listening on ${PORT} 🚀`);
  console.log("---------------------------------");
});
