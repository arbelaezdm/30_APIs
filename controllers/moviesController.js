let db = require("../database/models");
const Op = db.Sequelize.Op;

let moviesController = {
  crear: (req, res) => {
    db.Genero.findAll().then(function (generos) {
      return res.render("creacionDePeliculas", { generos: generos });
    });
  },

  store: (req, res) => {
    db.Peliculas.create(req.body).then((pelicula) => {
      return res.status(200).json({
        data: pelicula,
        status: 200,
        created: "ok",
      });
    });
  },

  //API para listar peliculas
  list: (req, res) => {
    db.Peliculas.findAll().then(function (peliculas) {
      //creacion del Endpoint de la API
      return res.status(200).json({
        total: peliculas.length,
        data: peliculas,
        status: 200,
      });
    });
  },

  show: (req, res) => {
    db.Peliculas.findByPk(req.params.id, {
      include: [{ association: "generos" }, { association: "actores" }],
    }).then(function (pelicula) {
      //creacion del Endpoint de la API
      return res.status(200).json({
        data: pelicula,
        status: 200,
      });
    });
  },

  editar: (req, res) => {
    let pedidoPelicula = db.Peliculas.findByPk(req.params.id);

    let pedidoGeneros = db.Genero.findAll();

    Promise.all([pedidoPelicula, pedidoGeneros]).then(function ([
      pelicula,
      generos,
    ]) {
      res.render("editarPelicula", { pelicula: pelicula, generos: generos });
    });
  },

  actualizar: (req, res) => {
    db.Peliculas.update(
      {
        title: req.body.titulo,
        awards: req.body.premios,
        release_date: req.body.release_date,
        genre_id: req.body.genero,
        length: req.body.length,
        rating: req.body.rating,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.redirect("/peliculas/" + req.params.id);
  },

  delete: (req, res) => {
    db.Peliculas.destroy({
      where: {
        id: req.params.id,
      },
    }).then((response) => {
      return res.json(response);
    });
  },

  // esto es lo que iria en postman para que funcione el metodo buscar
  //localhost:3000/peliculas/search/?keyword=a
  //   search: (req, res) => {
  //     db.Peliculas.findAll({
  //       where: {
  //         title: { [Op.like]: '%' + req.query.keyword + '%' }
  //       },
  //     })
  //     .then((peliculas) => {
  //       return res.status(200).json(peliculas);
  //     });
  //   }

  search: (req, res) => {
    db.Peliculas.findAll({
      where: {
        title: { [Op.like]: "%" + req.query.keyword + "%" },
      },
    }).then((peliculas) => {
      if(peliculas.length > 0) {
        return res.status(200).json(peliculas);
      }
        return res.status(200).json('No existen peliculas')
    });
  },
};

module.exports = moviesController;
