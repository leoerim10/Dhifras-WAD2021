const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
/*
var corsOptions = {
    origin: process.env.CORS_ORIGIN
}
app.use(cors(corsOptions));
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to the database
const db = require('./models');
db.mongoose.connect(db.url,{
	useUnifiedTopology: true
}).then(() => {
	console.log('[+] Connected to the database');
}).catch(err => {
	console.log('[-] Connecting to the database failed', err);
	process.exit();
});

app.get("/", (req, res) => {
    res.json({
        "success": true,
        "message": "Ad-viz backend"
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`[+] Server up and running on port :${PORT}`)
});
