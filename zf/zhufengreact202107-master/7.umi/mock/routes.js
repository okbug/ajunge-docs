export default {
    'GET /api/routes':(req,res)=>{
        req.query;
        req.params;
        req.body;
        res.json([{id:1}]);
    }
}

let app = express();
app.get('/api/routes',(req,res)=>{
    req.query;
    req.params;
    req.body;
    res.json([{id:1}]);
});