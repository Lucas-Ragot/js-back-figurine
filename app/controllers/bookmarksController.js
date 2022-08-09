const dataMapper = require('../dataMapper');

const bookmarksController = {
  /**
   * MW to check session.bookmarks array already exists
   * and create it if not
   * @param {request} request 
   * @param {response} response 
   * @param {function} next 
   */
  checkBookmarks(request, response, next) {
    // on test si le tableau des bookmarks n'existe pas
    if (!request.session.bookmarks) {
      //et si c'est le cas, on le crée
      request.session.bookmarks = [];
    }
    next();
  },

  /**
   * Display bookmarks page
   * @param {request} request
   * @param {response} response
   */
  bookmarksPage: (request, response) => {
    response.render("favoris", { figurines: request.session.bookmarks });
  },

  /**
   * add figurine to bookmarks
   * @param {request} request 
   * @param {response} response 
   */
  addBookmark: async (request, response) => {
    // on récupére l'id de la figurine
    const figurineId = request.params.id;
    // on vérifie que la figurine n'est pas déjà ds les Favoris
    const figurineFound = request.session.bookmarks.find(
      (figurine) => figurine.id === figurineId
    );
    // si elle n'y est pas
    if (!figurineFound) {
      try {
        // je la récupére depuis la db
        const figurine = await dataMapper.getOneFigurine(figurineId);
        // je l'ajoute ds le tableau des favoris
        request.session.bookmarks.push(figurine);
        // et enfin je redirige vers la page des favoris
        response.redirect("/bookmarks");
      } catch (error) {
        // si erreur de la db
        response.status(500).send(error);
      }
    } else {
      // si la figurine est dejà ds la favoris
      // je redirige simplement sur la page des favoris
      response.redirect("/bookmarks");
    }
  },

  /**
   * delete a figurine from bookmarks
   * @param {request} request 
   * @param {response} response 
   */
  deleteBookmark: (request, response) => {
    // je récupére l'id de la figurine à effacer
    const figurineId = Number(request.params.id);
    // j'enléve la figurine de la liste des bookmarks
    request.session.bookmarks = request.session.bookmarks.filter(figurine => figurine.id !== figurineId)
    // je redirige vers la page des favoris
    response.redirect("/bookmarks");
  }
};

module.exports = bookmarksController;
