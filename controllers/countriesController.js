const fetch = require("node-fetch");

let countriesController = {
  list: async (req, res) => {
    let countries = await fetch("https://restcountries.com/v3.1/all") // primer promesa donde estamos consultando al endpoint
      .then((response) => response.json()); //promesa que debe resolverse

    //departamentos Antioquia
    let departamentos = await fetch(
      "https://www.datos.gov.co/resource/xdk5-pm3f.json"
    ) // primer promesa donde estamos consultando al endpoint
      .then((response) => response.json()); //promesa que debe resolverse

    return res.render('countries', {countries, departamentos})

    // return res.json({
    //     countries, departamentos
    // })

  }
};

module.exports = countriesController;
