const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let mov = [];

fs.readFile("./mov.json", (err, data) => {
  mov = JSON.parse(data.toString());
});

app.get("/get", (req, res) => {
  const notDeletedMov = [];
  mov.map((ele) => {
    if (ele.isDeleted === false) {
      notDeletedMov.push({ ele });
    }
  });
  res.json(notDeletedMov);
});

app.get("/getFav", (req, res) => {
  const favMov = [];
  mov.map((ele) => {
    if (ele.isFav === true) {
      favMov.push({ ele });
    }
  });
  res.json(favMov);
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const Movie = mov.find((ele) => ele.id === Number(id));
  res.json(Movie);
});

app.post("/create", (req, res) => {
  const { name } = req.body;
  mov.push({
    id: mov.length + 1,
    name: name,
    isFav: false,
    isDeleted: false,
  });
  fs.writeFile("./mov.json", JSON.stringify(mov), (err) => {}); 
  res.json(mov);
});

app.put("/putFav/:id", (req, res) => {
  const idd = req.params.id;
  for (let i = 0; i < mov.length; i++) {
    if (mov[i].id === Number(idd)) {
      mov[i].isFav = true;
    }
  }
  fs.writeFile("./mov.json", JSON.stringify(mov), (err) => {});
  res.json(mov);
});

app.put("/putUn/:id", (req, res) => {
  const idd = req.params.id;
  for (let i = 0; i < Movies.length; i++) {
    if (mov[i].id === Number(idd)) {
      mov[i].isFav = false;
    }
  }
  fs.writeFile("./mov.json", JSON.stringify(mov), (err) => {});
  res.json(mov);
});

app.put("/delete/:id", (req, res) => {
  const iddd = req.params.id;
  for (let i = 0; i < mov.length; i++) {
    if (mov[i].id === Number(iddd)) {
      mov[i].isDeleted = true;
    }
  }
  fs.writeFile("./mov.json", JSON.stringify(mov), (err) => {});
  res.json(mov);
});

app.listen(PORT, () => {
  console.log(`running on port  ${PORT}`);
});



const PORT = 3000;