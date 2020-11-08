const express = require("express");
const members = require("../../models/Members");

const router = express.Router();

/**  
 * @param {*} request
 * @param {*} response
 * @desc Gets all members 
 * @route GET /api/members
 */
router.get("/", (request, response) => response.json(members));

/**  
 * @param {*} request
 * @param {*} response
 * @desc Get a single (specified) member 
 * @route GET /api/members:id
 */
router.get("/:id", (request, response) => {
  const foundMember = members.find(m => m.id === parseInt(request.params.id));

  if (!foundMember) {
    response
      .status(400)
      .json({ "message": "The requested user was not found." });
  } else {
    response.json(foundMember);
  }
});

/**  
 * @param {*} request
 * @param {*} response
 * @desc Add a new member
 * @route POST /api/members
 */
router.post("/", (request, response) => {

});

module.exports = router;