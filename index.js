const express = require("express");
const cors = require("cors");
const app = express();

const stripe = require("stripe")(
  "sk_test_51NyWfaHI4glNbvFMTuead9ayxQzArAmHkTPlY1r2QtU824HCk5RNkFcW22B4atQ4dogsPKXqBd5WpeRHQltdVyIH00lnwl1Sdw"
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors({ origin: true }));
app.use(express.json());

// manual cors configuration

// server.use((req, res, next) => {
//   // res.setHeader("Access-Control-Allow-Origin", "https://algorithmiot.com");
//   res.setHeader("Access-Control-Allow-Origin", " http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.post("/Payement/create", async (request, response) => {
  const total = request.query.total;

  if (total > 0) {
    const payementIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: payementIntent.client_secret,
    });
    console.log("payement request recived for this amount >>>>>>>", total);
  } else {
    response.status(200).send({
      message: "cant process the payement",
    });
  }
});

app.listen(4500, (err) => {
  console.log("app listening port 4500");
});
