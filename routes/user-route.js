const router = require("express").Router()
const Schema = require("./user-model")
const bcrypt = require("bcryptjs")

router.get("/users", (req, res) => {
  Schema.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "server error", error: err})
  })
})

router.post("/register", (req, res) => {
  let user = req.body
  let hash = bcrypt.hashSync(user.password, 12)
  user.password = hash
  Schema.add(user)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "server error", error: err})
  })
})

router.post("/login", (req, res) => {
  let {username, password} = req.body

  Schema.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json(user.username)
    } else {
      res.status(401).json({error: "invalid user/pass"})
    }
  })
  .catch(err => {
    res.status(500).json({message: "server error", error: err})
  })
})

module.exports = router