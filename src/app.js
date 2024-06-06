import express from "express";
import mainRoutes from "./routes/main.router.js";

const app = express();
const puerto = 8080;

//  recibir datos en formato json
app.use(express.json());
// recibir datos de la url y los convierte en objeto en req.body
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("./src/public"));

app.use("/", mainRoutes);

// inicio el servidor
app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});