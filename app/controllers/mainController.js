const dataMapper = require("../dataMapper");

const mainController = {
  /**
   * Middleware pour récupération nombre de figurines par catégorie
   * @param {request} request 
   * @param {response} response 
   * @param {function} next 
   */
  getLeftMenuInfos: async (request, response, next) => {
    try {
      // on ajoute le nombre de figurine par catégorie à l'objet res.locals
      // pour le rendre acessible dans nos view
      response.locals.figurineQuantityByCategory = await dataMapper.getFigurineQuantityByCategory();
      next();
    } catch (error) {
      response.status(500).send(error);
    }
  },

  /**
   * Display home page
   * @param {request} request 
   * @param {response} response 
   */
  homePage: async (request, response) => {
    try {
      const figurines = await dataMapper.getAllFigurines();
      response.render("accueil", { figurines });
    } catch (error) {
      response.status(500).send(error);
    }
  },

  /**
   * Display article page
   * @param {request} request 
   * @param {response} response 
   */
  articlePage: async (request, response) => {
    try {
      const figurine = await dataMapper.getOneFigurine(request.params.id);
      const reviews = await dataMapper.getReviews(request.params.id);
      // si j'zai bien récupérer une figurine
      if (figurine){
        // j'affiche la page article
        response.locals.isProduct = true;
        response.render("article", { figurine, reviews });
      } else {
        // sinon je renvoie une 404
        response.status(404).send("Ce n'est pas la figurine que vous rechercher");
      }
    } catch (error) {
      response.status(500).send(error);
    }
  },
  categoryPage: async (request, response) => {
    try {
      const figurines = await dataMapper.getFigurineByCategory(request.params.category)
      response.render("accueil", { figurines });
    } catch (error) {
      response.status(500).send(error);
    }
  }
};

module.exports = mainController;
