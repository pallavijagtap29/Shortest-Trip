const router = express.Router();
require("babel-core/register");
require("babel-polyfill");
const { CloudTravel} = require("../libs/shortest");

router.get('/',async (req, res) => {
    let { latArr,longArr,canTravelArr,start,dest }=req.query;
    latArr =  latArr.split(",").map((lat) => {
        return Number(lat);
    });
    longArr =  longArr.split(",").map((longt) => {
        return Number(longt);
    });
    canTravelArr =  canTravelArr.split(",").map((can) => {
        return can.replace(/\"/g, "").trimLeft();
    });
    //initialize CloudTravel
    let cloudTravel = new CloudTravel();
    try{
        //find shortest trip
        let result = await cloudTravel.shortestCourierTrip(latArr, longArr, canTravelArr, Number(start),Number(dest));
        res.send(200,result);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;