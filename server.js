// [js] File is a CommonJS module; it may be converted to ES6 module - o co chodzi?
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
let stringifyFile = "";

app.use(bodyParser.json());

app.get('/getNote', (req, res) => {
  fs.readFile('./test.json', 'utf-8', (err, data) => {
    if (err) throw err;
    stringifyFile = data;
    res.send(data);
  });
});

app.post('/updateNote/:note', (req, res) => {
  stringifyFile += req.params.note;
  fs.writeFile('./test.json', stringifyFile, (err) => {
    if (err) throw err;
    console.log('file updated');
  });
});

app.listen(3000);

app.use((req, res, next) => {
  res.status(404).send('Page not found')
});