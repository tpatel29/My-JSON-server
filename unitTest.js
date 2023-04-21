const axios = require('axios');

// Test GET routes
axios.get('http://localhost:3000/COS/myfile')
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));

axios.get('http://localhost:3000/Mailboxes/myfile')
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));

// Test POST routes
axios.post('http://localhost:3000/add/COS/myfile', { name: 'John', age: 30 })
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));

axios.post('http://localhost:3000/add/Mailboxes/myfile', { name: 'Jane', age: 25 })
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));

// Test DELETE routes
axios.delete('http://localhost:3000/delete/COS/myfile')
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));

axios.delete('http://localhost:3000/delete/Mailboxes/myfile')
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response.data));
