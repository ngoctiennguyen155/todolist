 const express = require('express');
 const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

 const port = 3000;
 app.listen(port, console.log(`Lisening on port on port ${port}.....`));
 app.set('view engine', 'ejs');
 app.set('views', 'views')
 app.use(express.static('public'));

 var x = fs.readFileSync('./public/file/todo.txt', 'utf8');
x = JSON.parse(x);
console.log(x);

app.get("/", function (req, res) {
     res.render('index',{data : x});
})

const urlendcode = bodyParser.urlencoded({ extended: true });
app.post('/',urlendcode, function (req, res) {
     console.log(req.body.id);
     let element = {
          id: x.length+1,
          status: "none",
          content: req.body.id
     }
     x.push(element);
     x = JSON.stringify(x);
     fs.writeFileSync('./public/file/todo.txt', x);
     x = JSON.parse(x);
     res.render('index', { data: x });
});
