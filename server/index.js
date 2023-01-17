const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');
const axios = require('axios');
const { response } = require("express");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next();
})
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/getPokemon", (req, res) => {
   
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(response => {
            console.log(response.data);
            res.json({ data: response.data });
        })
        .catch(error => {
            console.log(error);
        });

});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});