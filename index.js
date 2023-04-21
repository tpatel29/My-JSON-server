const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(express.text())
app.use(express.json())


const port = 3000;


app.get('/COS/:filename', (req, res) => {
	const filename = req.params.filename;
	const filePath = `./COS/${filename}.json`;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error reading file');
		} else {
			const jsonData = JSON.parse(data);
			res.json(jsonData);
		}
	});
});

app.get('/Mailboxes/:filename', (req, res) => {
	const filename = req.params.filename;
	const filePath = `./Mailboxes/${filename}.json`;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error reading file');
		} else {
			const jsonData = JSON.parse(data);
			res.json(jsonData);
		}
	});
});

app.get('/Sites/:filename', (req, res) => {
	const filename = req.params.filename;
	const filePath = `./Sites/${filename}.json`;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error reading file');
		} else {
			const jsonData = JSON.parse(data);
			res.json(jsonData);
		}
	});
});

app.post('/add/COS/:loe', (req, res) => {
	const loe = req.params.loe.toUpperCase();
	const filePath = `./COS/${loe}.json`;
	// const jsonData = JSON.stringify(req.body);
	const jsonObject = JSON.parse(req.body);


	fs.writeFile(filePath, jsonObject, 'utf8', (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error writing file');
		} else {
			res.send(`File ${loe}.json successfully added to the COS folder.`);
		}
	});
});

app.post('/add/Mailboxes/:loe', (req, res) => {
	const loe = req.params.loe.toUpperCase();
	const filePath = `./Mailboxes/${loe}.json`;
	// const jsonData = JSON.stringify(req.body);
	const jsonObject = JSON.parse(req.body);

	fs.writeFile(filePath, jsonObject, 'utf8', (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error writing file');
		} else {
			res.send(`File ${loe}.json successfully added to the Mailboxes folder.`);
		}
	});
});

app.post('/add/Sites/:loe', (req, res) => {
	const loe = req.params.loe.toUpperCase();
	const filePath = `./Sites/${loe}.json`;
	// const jsonData = JSON.stringify(req.body);
  // console.log(req.body);
	const jsonObject = JSON.parse(req.body);
  let jsonString = JSON.stringify(jsonObject);

	fs.writeFile(filePath, jsonString, 'utf8', (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error writing file');
		} else {
			res.send(`File ${loe}.json successfully added to the Sites folder.`);
		}
	});
	// fs.writeFile(filePath, req.body, (err) => {
	// 	if (err) {
	// 		console.error(err);
	// 	} else {
	// 		console.log(`File '${filePath}' saved successfully.`);
	// 	}
	// });
});



app.delete('/delete/COS/:filename', (req, res) => {
	const filename = req.params.filename.toUpperCase();
	const filePath = `./COS/${filename}.json`;

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error deleting file');
		} else {
			res.send(`File ${filename}.json successfully deleted from the COS folder.`);
		}
	});
});

// Set up route to delete file from Mailboxes folder
app.delete('/delete/Mailboxes/:filename', (req, res) => {
	const filename = req.params.filename.toUpperCase();
	const filePath = `./Mailboxes/${filename}.json`;

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error deleting file');
		} else {
			res.send(`File ${filename}.json successfully deleted from the Mailboxes folder.`);
		}
	});
});

// Set up route to delete file from Sites folder
app.delete('/delete/Sites/:filename', (req, res) => {
	const filename = req.params.filename.toUpperCase();
	const filePath = `./Sites/${filename}.json`;

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error deleting file');
		} else {
			res.send(`File ${filename}.json successfully deleted from the Sites folder.`);
		}
	});
});






app.get('/:username/:repository/:path', (req, res) => {
	const username = req.params.username;
	const repository = req.params.repository;
	const path = req.params.path;
	const filters = req.query;

	axios.get(`https://api.github.com/repos/${username}/${repository}/contents/${path}`)
	// axios.get(`https://raw.githubuserconztent.com/${username}/${repository}/main/${path}`)
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
			data.Mailboxes = filteredData;
			res.json(data);
		})
		.catch(error => {
			res.status(404).send('File not found.');
		});
});
let directoryId = "Data"
app.get("/", async (req, res) => {
	// drive.files.list({
	// 	q: `name contains ''`,
	// }, (err, res) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	}
	//
	// 	// Log the list of files
	// 	const files = res.data.files;
	// 	if (files.length) {
	// 		console.log('Files:');
	// 		files.map((file) => {
	// 			console.log(`${file.name} (${file.id}) - ${file.mimeType}`);
	// 		});
	// 	} else {
	// 		// console.log('No files found.');
	// 	}
	// });
	res.send("hello");
});


app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

