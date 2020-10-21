const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 7000;
const apiRoute = require("./routes/apiroutes")
const htmlRoute = require("./routes/htmlroutes")



app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api", apiRoute)
app.use("/", htmlRoute)



 




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));