const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
mailchimp.setConfig({
 apiKey: "2ee798e49ec3ab1839ddcc43873c4708-us18",
 server: "us18"
});
app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const listId = "28e8f1da31";
  const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
res.sendFile(__dirname + "/success.html")
console.log("Successfully added contact as an audience member. The contact's id is ${response.id}."
);
}
run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000.");
});


// 2ee798e49ec3ab1839ddcc43873c4708-us18
 // 28e8f1da31
