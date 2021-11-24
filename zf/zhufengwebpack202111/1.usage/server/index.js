let express = require('express');
const app = express();
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: "张三" }, { id: 2, name: "李四" }]);
});
app.listen(3000);