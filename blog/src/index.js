const port = process.env.POST || 3001;
import morgan from "morgan";
import express from "express";
import { engine } from "express-handlebars";
import route from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import db from "./config/db/index.js";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const database = db;
database.connect();

const app = express();
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), { "Content-Type": "text/css" })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

app.use(methodOverride("_method"));
//template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum(a, b) {
        return a + b;
      },
      equal(a,b) {
        return a === b;
      }
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));

// Route init(khởi tạo path)
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
