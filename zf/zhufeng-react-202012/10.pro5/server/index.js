let express = require("express");
let bodyParser = require("body-parser");
let user = require("./routes/user");
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", user);
app.listen(3000, () => {
    console.log('服务器在3000端口启动!');
});