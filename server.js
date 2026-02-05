require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { emit } = require("process");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){ 
    res.sendFile(__dirname+"/index.html");
});
app.post("/index.html", function(req, res){ 
    const firstname = req.body.firstname;
    const secondname = req.body.secondname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const data = { 
        members: [ 
            {   
                email_address: email,
                status: "subscribed",
                 merge_fields: { 
                    FNAME: firstname,
                    LNAME: secondname,
                    MERGE08: username,
                    PSWORD: password
                }
            }
        ]
    };

const jsonData = JSON.stringify(data);
const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}`
const options = { 
    method: "POST",
auth: `fmighty:${MAILCHIMP_API_KEY}`
};
const request = https.request(url, options, function(response){ 
    if(response.statusCode === 200){ 
        res.sendFile(__dirname+"/success.html")
    }else{ 
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data){ 
    console.log(JSON.parse(data))
    });

});
request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){ 
     res.redirect("/")
});

app.listen(port, function(){
    console.log(`This server is listening on port ${process.env.PORT}.`) 
});