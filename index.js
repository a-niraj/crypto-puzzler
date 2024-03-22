import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
import bodyParser from "body-parser";


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/caeser", (req, res) => {
    res.render("caeser.ejs")
});

app.get("/caeser_decoding", (req, res) => {
    res.render("caeser_decoding.ejs");
})

app.post("/caeser_decode", (req, res) => {
    var user_input = req.body["user_text"].toLowerCase();
    console.log(user_input);
    var user_output = "";
    var result = [];
    for (var i = 1; i < 26; i++) {
        for (var j = 0; j < user_input.length; j++) {
            if (user_input.charCodeAt(j) === ' ' || user_input.charCodeAt(j) === '!' || user_input.charCodeAt(j) === "?" || user_input.charCodeAt(j) === "." || user_input.charCodeAt(j) === "'") {
                user_output = user_output + user_input[j];
            }
            else {
                if ((user_input.charCodeAt(j) + i) < 97) {
                    user_output = user_output + (String.fromCharCode(user_input.charCodeAt(j) + i + 26));
                }
                if ((user_input.charCodeAt(j) + i) > 122) {
                    user_output = user_output + (String.fromCharCode(user_input.charCodeAt(j) + i - 26));
                } else {
                    user_output = user_output + (String.fromCharCode(user_input.charCodeAt(j) + i));
                }
            }
        }

        result.push(user_output);
        user_output = "";


    }
    res.render("caeser_decoding.ejs", { out: result });

});


app.post("/register", (req, res) => {
    console.log(req.body["user_text"]);
    var input = req.body["user_text"].toLowerCase();
    var shift = req.body["num"] % 26;
    var output = [];
    var temp = ""

    for (var i = 0; i < input.length; i++) {
        if (input[i] === ' ' || input[i] === '!' || input[i] === "?" || input[i] === "." || input[i] === "'") {
            output.push(input[i]);
        } else {
            if ((input.charCodeAt(i) + shift) < 97) {
                temp = String.fromCharCode((input.charCodeAt(i) + shift) + 26)
                output.push(temp);
            }
            if ((input.charCodeAt(i) + shift) > 122) {
                temp = String.fromCharCode(((input.charCodeAt(i) + shift) - 26))
                output.push(temp);
            }
            else {
                temp = String.fromCharCode(((input.charCodeAt(i) + shift)))
                output.push(temp);
            }

        }

    };
    output = output.toString();


    if (output.includes(",") == true) {
        var new_output = output.replaceAll(",", "");
    }
    else {
        var new_output = output;
    }
    console.log(new_output);
    res.render("caeser.ejs", { out: new_output });



}); 