const router = require("express").Router();
const {getAllUserList} = require("../controller/user");

router.get("/all-user-list",getAllUserList);


module.exports = router;
