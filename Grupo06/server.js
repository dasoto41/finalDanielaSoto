const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const PORT = config.PORT;
const { sequelize } = require("./database/connect_mysql.js");
const { generosRouter } = require("./controllers/generos.controller.js");
const {
  tagsDeContenidoRouter,
} = require("./controllers/tagsDeContenido.controller.js");
const { tagsRouter } = require("./controllers/tags.controller.js");
const { contenidosRouter } = require("./controllers/contenidos.controller.js");
const { categoriasRouter } = require("./controllers/categorias.controller.js");
const { actorsRouter } = require("./controllers/actors.controller.js");
const {
  Actor,
  Categoria,
  Contenido,
  Genero,
  Reparto,
  Tag,
  TagsDeContenido,
} = require("./database/models");
const corsOptions = { origin: "http://localhost:" + config.PORT };

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "This is de landing page for the moment" });
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the db: ", error);
  }
}

async function closeConnection() {
  try {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Unable to close the connection to the db: ", error);
  }
}

authenticate();

//AQUI SE DEBERIA LLAMAR A LOS ENDPOINTS EN LA CARPETA ROUTE

app.use("/api", generosRouter);
app.use("/api", categoriasRouter);
app.use("/api", tagsRouter);
app.use("/api", tagsDeContenidoRouter);
app.use("/api", contenidosRouter);
app.use("/api", actorsRouter);

//Llamada al servidor
app.listen(PORT, () => {
  console.log(`Server is running on port: ${corsOptions.origin}`);
});
