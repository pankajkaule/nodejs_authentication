const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
app.get("/api", (req, res) => {
	res.json({
		message: "Hey, there! Welcome to this API service changes are added"
	});
});

app.post("/api/posts", verifyToken, (req, res) => {

	jwt.verify(req.token, "secretkey", (err, authData) => {
  
	  if (err) {
  
		res.sendStatus(403);
  
	  } else {
  
		res.json({
  
		  message: "POST created...",
  
		  authData
  
		});
  
	  }
  
	});
  
  });


  app.post("/api/login", (req, res) => {

	const user = {
  
	  id: 1,
  
	  username: "john",
  
	  email: "john@gmail.com"
  
	};
  
	jwt.sign({ user: user }, "secretkey", (err, token) => {
  
	  res.json({
  
		token
  
	  });
  
	});
  
  });



  function verifyToken(req, res, next) {

	const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  
	if (typeof bearerHeader !== "undefined") {
  
	  const bearerToken = bearerHeader.split(" ")[1];
  
	  req.token = bearerToken;
  
	  next();
  
	} else {
  
	  res.sendStatus(403);
  
	}
  
  }

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  })