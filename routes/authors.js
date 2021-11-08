const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const authors = [
  {
    id: "12345",
    name: "John Doe",
    posts: [
      { id: "1", text: "Hello world" },
      { id: "2", text: "Post number 2" },
    ]
  },
  {
    id: "12341",
    name: "John2 Doe2",
    posts: [
      { id: "1", text: "Hello world2" },
      { id: "2", text: "Post number 3" },
    ]
  },
  {
    id: "12",
    name: "John Boba",
    posts: [
      { id: "1", text: "Hello not world" },
      { id: "2", text: "Post number from boba" },
    ]
  },
  {
    id: "23",
    name: "Taras Shevshenko",
    posts: [
      { id: "1", text: "dymu moi" },
      { id: "2", text: "rozryta mohula" },
    ]
  },
];

router.get("/", (req, res) => {
  res.json(authors);
});

//! Author by id

router.get("/:id", ( req, res, next ) => {
  if (!authors.find(el=>el.id===req.params.id)) {
   return next(createError(404,`cant find data for id:${req.params.id}`))
  }

  res.json(authors.find(el=>el.id===req.params.id));
});

//! Posts

router.get("/:id/posts", (req, res,next) => {
  if (!authors.indexOf(el => el.id === req.params.id)) {
   return next(createError(404, `cant find data for id:${req.params.id}`))
  }

  const result = authors.find(el => el.id === req.params.id).posts

  if (!result) {
   return next(createError(404, `cant find posts for id:${req.params.id}`))
  }

  res.json(result);
});


//! Post by id

router.get("/:id/:posts/:postId", (req, res, next) => {
  
  const result = authors.find(el => el.id === req.params.id)[req.params.posts]
    .find(el => el.id === req.params.postId)
  
  if (!result) {
   return next(createError(404, `cant find post with id:${req.params.postId}`))
  }

  res.json(result);
});

//! post create new author with name and id

router.post("/", (req, res, next) => {
  
  if (!req.body.name || !req.body.id) {
    
    //! i know that id generates in db so there should be only name

    return next(createError(400, "name & id is required"));
    }
    authors.push({
        name: req.body.name,
        id: req.body.id
    });
  
    res.send( "user added" );
});

//! rename author

router.patch("/:id", (req, res, next) => {

  if (!authors.indexOf(el => el.id === req.params.id)) {
   return next(createError(404, `cant find data for id:${req.params.id}`))
  }

  if (!req.body.name) {
   return next(createError(400, "name & id is required"));
  }

  authors.map(el => el.id === req.params.id ? el.name = req.body.name : el);

  res.send("name changed");
})

//! delete author by id
router.delete("/:id", (req, res,next) => {

  if (!authors.indexOf(el => el.id === req.params.id)) {
   return next(createError(404, `cant find author with id:${req.params.id}`))
  }

  authors.splice(authors.findIndex( el => el.id === req.params.id ), 1 )

  res.json({
    message: "author successfully deleted"
  })
});

router.all('*', function(req, res,next) {
  next(createError(400, "Bad request" ))
})

// router.param("id", (req, res, next, id) => {
//   next();
// });

module.exports = router;
