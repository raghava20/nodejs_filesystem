var fs = require("fs");
var moment = require('moment'); // require
var express = require("express")
var cors = require("cors")

const app = express()
const host = '0.0.0.0'

app.use(cors()); // every request to be allowed in
app.use(express.json());

let result = []
let final = []

app.get("/", (req, res) => {
    res.send("Hi! Please use: <br><br> <i>/timestamp</i> endpoint for getting the current timestamp <br><br> <i>/files</i> endpoint for getting text files");
})
//for getting the current timestamp 
app.get("/timestamp", (req, res) => {

    var timestamp = new Date().getTime()
    var date = moment(timestamp).format("DD-MM-YYYY_h-mm-ss_A");

    const writeFile = async (timestamp, date) => {

        await fs.writeFile(`./downloads/${date}.txt`, `The current timestamp is: ${timestamp.toString()}`, (err) => {
            console.log("created")
            result.push({
                "timestamp": `The current timestamp is: ${timestamp.toString()}`,
                "filename": `${date}.txt`,
            })
            res.send(result)

        })

    }
    writeFile(timestamp, date)
})

//for getting the files of the timestamp in .text
app.get("/files", (req, res) => {
    let getFiles = async () => {
        await fs.readdir("./downloads", (err, files) => {
            console.log(files)
            final.push(files)
            let result = [...final]
            res.send(result)
        })
    }
    getFiles();
})

app.listen(process.env.PORT || 3000, host)