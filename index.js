// const express = require("express");
//
// const app = express();
// const PORT = process.env.PORT || 80;
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// const cors = require("cors");
// app.use(
// 	cors({
// 		origin: "*",
// 	})
// );
// app.use(
// 	cors({
// 		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
// 	})
// );
//
// app.get("/health-check", (req, res) => {
// 	console.log("Healthy");
// 	res.status(200).json({ msg: "The server is healthy." });
// });
//
//
// app.get("/sell/*", async (req, res) => {
// 	res.send(req.params)
// });
//
// // We provide a root route just as an example
// app.get("/*", (req, res) => {
// 	params = req.params[0].split("/");
// 	console.log(req.params[0].split("/"))
// 	const getNames = async() => {
// 		try {
// 			let string = 'https://raw.githubusercontent.com/'+params[0]+ "/"+params[1] + "/main/db.json";
// 			console.log(string);
// 			const names = await fetch(string);
// 			const textData = await names.json();
// 			return textData;
// 		} catch (err) {
// 			console.log('fetch error', err);
// 		}
// 	};
//
// 	(async () => {
// 		const getText = await getNames();
// 		res.send(getText);
// 		// console.log(getText)
// 	})();
// });
//
// async function init() {
// 	console.log(`Starting Express example on port ${PORT}...`);
//
// 	app.listen(PORT, async () => {
// 		console.log(
// 			`Express server started on port ${PORT}. Try some routes, such as '/users'.`
// 		);
// 	});
// }
//
// init();


const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/repository/:username/:repository/file/:path', (req, res) => {
	const username = req.params.username;
	const repository = req.params.repository;
	const path = req.params.path;
	const filters = req.query;

	axios.get(`https://api.github.com/repos/${username}/${repository}/contents/${path}`)
		.then(response => {
			const content = Buffer.from(response.data.content, 'base64').toString('utf8');
			const data = JSON.parse(content);
			// console.log(data.Mailboxes)
			const filteredData = data.Mailboxes.filter(item => {
				let match = true;
				for (let key in filters) {
					if (!item.hasOwnProperty(key) || item[key] !== filters[key]) {
						match = false;
						break;
					}
				}
				return match;
			});
			res.send(filteredData);
		})
		.catch(error => {
			res.status(404).send('File not found.');
		});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

