const controller = {
  index: (req, res) => {
    return res.render("index");
  },
  //otras pags dentro del sitio
  fitoterapia: (req, res) => {
    res.render("fitoterapia");
  },
  infoplantas: (req, res) => {
    res.render("infoplantas");
  },
  filosofia: (req, res) => {
    res.render("filosofia");
  },
  contacto: (req, res) => {
    res.render("contacto");
  },
};
module.exports = controller;
