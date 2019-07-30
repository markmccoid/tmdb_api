let getImagesForShow = require("./APICurated/API_TV");

function testFunc(defProp = 1) {
  console.log("default prop", defProp);
  getImagesForShow(60735);
}

testFunc();
