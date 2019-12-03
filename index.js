// implement your API here
const express = require("express");
const db = require("./data/db");

const port = "5555";

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World from Express");
});

//list of users
//GET /api/users
//find(): calling find returns a promise that resolves to an array of all the users contained in the database.
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error on GET //api/users");
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//add new user
//POST /api/users
//insert(): calling insert passing it a user object will add it to the database and return an object with the id of the inserted user. The object looks like this: { id: 123 }.
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.hasOwnProperty("name") && user.hasOwnProperty("bio")) {
    db.insert(user)
      .then(newUser => {
        res.status(201).json({ ...newUser, ...user });
      })
      .catch(err => {
        console.log("error on POST //api/users:", err);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//returns specific user
//GET /api/users/:id
//findById(): this method expects an id as it's only parameter and returns the user corresponding to the id provided or an empty array if no user with that id is found.
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(res.status(500).json(res, id))
    .catch(
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//delete specific user
//DELETE /api/users/:id
//remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.

server.delete("api/users/:id", (req, res) => {
  const id = req.params.id;
  db.delete(id)
    .then(
      res.status(200).json({ message: `User ID ${id} successfully deleted.` })
    )
    .catch(err => {
      console.log("delete error:", err);
      res.status(500).json({ error: "The user could not be removed." });
    });
});

//updates specific user
//GET /api/users/:id
//returns MODIFIED user data
//update(): accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
