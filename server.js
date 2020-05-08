const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const url = require('url');

const port = 3000;
app.listen(process.env.PORT|| port, console.log(`Lisening on port on port ${port}.....`));
app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(express.static('public'));

var x = fs.readFileSync('./public/file/todo.txt', 'utf8');
x = JSON.parse(x);
//console.log(x);

app.get("/", function (req, res) {
     res.render('index',{data : x});
})

const urlendcode = bodyParser.urlencoded({ extended: true });
app.post('/add',urlendcode, function (req, res) {
     console.log(req.body.content);
     let element = {
          id: x.length+1,
          status: "none",
          content: req.body.content
     }
     x.push(element);
     x = JSON.stringify(x);
     fs.writeFileSync('./public/file/todo.txt', x);
     x = JSON.parse(x);
     res.render('index', { data: x });
     //res.redirect('http://localhost:3000/');
     res.emit();
});

app.get('/:id', function (req, res) {
     console.log(req.params.id);
     var checkStatus = x[req.params.id - 1].status;
     if (checkStatus === 'none') {
          x[req.params.id - 1].status = 'line-through';
          fs.writeFileSync('./public/file/todo.txt', JSON.stringify(x));
          res.redirect('http://localhost:3000/');
     } else {
          x[req.params.id - 1].status = 'none';
          fs.writeFileSync('./public/file/todo.txt', JSON.stringify(x));
          res.redirect('http://localhost:3000/');
     }
})
