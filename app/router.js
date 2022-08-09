const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');


const router = express.Router();

// page d'accueil
router.get('/',mainController.getLeftMenuInfos, mainController.homePage);

// page article
router.get('/article/:id', mainController.getLeftMenuInfos, mainController.articlePage);

// page articles par categorie
router.get('/category/:category', mainController.getLeftMenuInfos, mainController.categoryPage);

// page favoris
// on utilise un mw pour avoir la propriété bookmarks sur les chemins nécessaires
// on limite les appels aux routes concernées qui commenceent toutes par /bookmarks
// attention à l'ordre le mw doit être déclaré avant les routes en get
router.use("/bookmarks", bookmarksController.checkBookmarks);

router.get('/bookmarks', bookmarksController.bookmarksPage );
router.get('/bookmarks/add/:id', bookmarksController.addBookmark );
router.get('/bookmarks/delete/:id', bookmarksController.deleteBookmark );


// on exporte le router 
module.exports = router;