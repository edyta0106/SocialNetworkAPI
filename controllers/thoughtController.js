const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } });
      })
      .then((user) =>
        !user ? res.status(404).json({ message: "Thought created but found no user with that id" }) : res.json({ message: "Created the thought" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
