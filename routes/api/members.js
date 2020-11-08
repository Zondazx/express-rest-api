const express = require("express");
let members = require("../../models/Members");

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
      .json({
        message: "The requested user was not found."
      });
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
  const lastId = members[members.length - 1].id;
  const id = lastId + 1;

  const {
    name,
    email,
    status
  } = request.body;

  const newMember = {
    id,
    name,
    email,
    status
  };

  if (!newMember.name || !newMember.email) {
    return response
      .status(400)
      .json({
        message: "Please, include name and/or email."
      });
  }

  members.push(newMember);
  return response.json(newMember);
  // return response.redirect("/");
});

/**  
 * @param {*} request
 * @param {*} response
 * @desc Update the specified member
 * @route PUT /api/members/:id
 */
router.put("/:id", (request, response) => {
  const foundMember = members.find(m => m.id === parseInt(request.params.id));

  if (!foundMember) {
    response
      .status(400)
      .json({
        message: "The requested user was not found."
      });
  } else {

    const {
      name,
      email,
      status
    } = request.body;

    foundMember.name = name || foundMember.name;
    foundMember.email = email || foundMember.email;
    foundMember.status = status || foundMember.status;

    response.json({
      message: "Member updated",
      member: foundMember
    });
  }
});

/**  
 * @param {*} request
 * @param {*} response
 * @desc Delete the specified member
 * @route DELETE /api/members:id
 */
router.delete("/:id", (request, response) => {
  const foundMember = members.find(m => m.id === parseInt(request.params.id));

  if (!foundMember) {
    response
      .status(400)
      .json({
        message: "The requested user was not found."
      });
  } else {
    members = members.filter(m => m.id !== foundMember.id);

    response.json({
      message: "Member deleted",
      member: foundMember
    });
  }
});

module.exports = router;