const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const router = express.Router()
var mysql = require("mysql")

function handleError(err, res) {
  console.error(err)
  res.render(`error`, { error: err })
}

app.set("public", path.join(__dirname, "public"))
app.set("view engine", "html")
app.use(express.static("./public"))
app.use(cors())

app.get("/", (req, res) => {
  res.render("index", { title: "My Website", message: "Hello there!" })
})

app.get("/main.html", (req, res) => {
  res.render("main", { title: "My Website", message: "Hello there!" })
})

app.get("/welcome.html", (req, res) => {
  res.render("welcome", { title: "Welcome!" })
})

app.get("/new_users.html", (req, res) => {
  res.render("new_users", { title: "Welcome!" })
})

app.get("/volunteers.html", (req, res) => {
  res.render("volunteers", { title: "Welcome!" })
})

app.get("/clients.html", (req, res) => {
  res.render("clients", { title: "Welcome!" })
})

app.get("/signUp.html", (req, res) => {
  res.render("signUp", { title: "Welcome!" })
})

app.get("https://api.signupgenius.com/v2/k/signups/created/all/?user_key=V0FzMkxZcmVOZlVnclZMVEl6dGhWQT09", (req, res) => {
//var signUps = JSON.parse(res);
  res.render("signUp", {cn: res.data.contactName})
  console.log(res);
})



// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'dbuser',
//   password : 's3kreee7',
//   database : 'my_db'
// });

// connection.connect()

// connection.query('SELECT * FROM <TABLE>', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()

// app.post("/api/auth/create", (req, res) => {
//   const body = req.body
//   if (!body.email || typeof body.email !== "string") {
//     res.status(400)
//     res.send({
//       status: 400,
//       message: "missing required field: email",
//     })
//   } else if (!body.password) {
//     res.status(400)
//     res.send("missing required field: password")
//   } else {
//     let { email, password } = body
//     password = password.trim()
//     email = email.toLowerCase().trim()
//     if (!email.includes("@")) {
//       res.status(422)
//       res.send("invalid request field: email")
//     } else if (password.length < 6) {
//       res.status(422)
//       res.send("invalid request field: password")
//     }
//     knex
//       .select(["email", "password"])
//       .from("users")
//       .where({ email })
//       .limit(1)
//       .then(users => {
//         if (users.length > 0) {
//           res.status(409)
//           res.send("That email is already in use")
//           return Promise.resolve({ sent: true })
//         } else {
//           return knex("users").insert({
//             email,
//             password,
//           })
//         }
//       })
//       .then(result => {
//         if (!result.sent) {
//           res.send("ok")
//         }
//       })
//       .catch(err => {
//         console.error(err)
//         res.status(500)
//         res.send("An error ocurred, please try again later.")
//       })
//   }
// })

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
