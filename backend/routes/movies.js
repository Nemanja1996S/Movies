const express = require("express");
const multer = require("multer");
const bodyParser = require('body-parser');

const router = express.Router();

const User = require("../models/user");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const List = require("../models/list");
const Comment = require("../models/comment");
const Follow = require("../models/follow");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("/dodajfilm1", multer({ storage: storage }).single("slika"), (req, res, next) => {
  let slikaPut = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  let reziser = req.body.reziser;
  let zanrovi = req.body.zanr.split(",");
  let movie = new Movie({
    slikaPutanja: slikaPut,
    naziv: req.body.naziv,
    reziser: reziser,
    datum: new Date(req.body.datum),
    zanrovi: zanrovi,
    opis: req.body.opis,
    prosek: 0,
    zahtev: true,
    odobren: false
  });
  movie.save().then(createdMovie => {
    res.status(200).json(createdMovie);
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.post("/dodajfilm2", (req, res, next) => {
  let reziser = req.body.reziser;
  let movie = new Movie({
    slikaPutanja: req.body.slikaPutanja,
    naziv: req.body.naziv,
    reziser: reziser,
    datum: new Date(req.body.datum),
    zanrovi: req.body.zanr,
    opis: req.body.opis,
    prosek: 0,
    zahtev: true,
    odobren: false
  });
  movie.save().then(createdMovie => {
    res.status(200).json(createdMovie);
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.post("/dodajzanr", (req, res, next) => {
    let zanr = new Genre({
        naziv: req.body.naziv
    });
    Genre.findOne({naziv: req.body.naziv }, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska!");
      }
      if(data) {
        return res.status(200).json({
          flag: false,
          message: "Vec postoji takav zanr!"
        });
      }
      else {
        zanr.save().then(createdUser => {
          res.status(200).json({
            flag: true,
            message: "Uspesno dodat zanr!"
          });
        }).catch(err => {
          res.status(400).json("Desila se greska!");
        });
      }
    });
});

router.get("/dohvatizanrove", (req, res, next) => {
    Genre.find({}, {_id: 0, naziv:1}, (err, data) => {
        if(err) {
            res.status(400).json("Desila se greska");
          }
          else {
            res.status(200).json(data);
          }
    });
});

router.delete("/obrisizanr/:naziv", (req, res, next) => {
  let naziv = req.params.naziv;
  Movie.find({}, { _id:0, zanrovi: 1 }, (err, data) => {
    if(err) {
      res.status(400).json({message: "Desila se greska!"});
    } else {
      let postoji = false;
      data.forEach(element => {
        if(element.zanrovi.includes(naziv)) {
          postoji = true;
        }
      });
      if(postoji) {
        res.status(200).json({
          message: "Ne moze da se izbrise zanr!",
          flag: false
        });
      } else {
        Genre.deleteOne({naziv: req.params.naziv}).then(result => {
          if (result.n > 0) {
            res.status(200).json({
              message: "Uspesno obrisano!",
              flag: true
            });
          } else {
            res.status(400).json({ message: "Greska!" });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  });

  
});

router.get("/zahtevi", (req, res, next) => {
  Movie.find({zahtev: true}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    reziser: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobren: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.post("/odobri", (req, res, next) => {
  let _id = req.body._id;
  Movie.updateOne({_id: _id}, {"$set": {"zahtev": false, "odobren":true}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Film je odobren");  
    }
  });
});

router.post("/odbaci", (req, res, next) => {
  let _id = req.body._id;
  Movie.updateOne({_id: _id}, {"$set": {"zahtev": false, "odobren":false}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Film je odbijen");  
    }
  });
});

router.get("/svifilmovi", (req, res, next) => {
  Movie.find({zahtev: false}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    reziser: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobren: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.get("/sviodobrenifilmovi", (req, res, next) => {
  Movie.find({zahtev: false, odobren: true}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    reziser: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobren: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id).then(movie => {
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).json("Film nije nadjen");
    }
  }).catch(err => {
    console.log(err);
  });;
});

router.put("/azuriraj", (req, res, next) => {
  const movie = new Movie({
    _id: req.body._id,
    slikaPutanja: req.body.slikaPutanja,
    naziv: req.body.naziv,
    reziser: req.body.reziser,
    datum: new Date(req.body.datum),
    zanrovi: req.body.zanrovi,
    opis: req.body.opis,
    prosek: req.body.prosek,
    zahtev: false,
    odobren: req.body.odobren
  });
  Movie.updateOne({_id: movie._id}, movie, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Film je azuriran");  
    }
  });
});

router.get("/info/:korime/:naziv/:reziser", (req, res, next) => {
  let korime = req.params.korime;
  let naziv = req.params.naziv;
  let reziser_string = req.params.reziser;
  let reziser = reziser_string.split(",");  
  List.findOne({korime: korime, naziv: naziv, reziser: reziser}, {   
    _id: 0, 
    status: 1,
    reziser: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
      if(!data) {
        res.status(200).json({
          flag: false,
          message: "Ne postoji film u listi",
          status: "ne_postoji",
        });
      } else {
        
        res.status(200).json({
          flag: true,
          message: "Uspesno dohvacen film",
          status: data.status,
          strana: data.strana,
          procitano: data.procitano,
        });
      }
    }
  });
});

router.post("/stavi", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let reziser = req.body.reziser;

  let list = new List({
    naziv: naziv,
    reziser: reziser,
    korime: korime,
    status: "dodata"
  });
  list.save().then(createdListmovie => {
    res.status(200).json({
      message: "Uspesno sacuvano u listu!",
      status: createdListmovie.status
    });
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.delete("/ukloni/:korime/:naziv/:reziser", (req, res, next) => {
  let korime = req.params.korime;
  let naziv = req.params.naziv;
  let reziser_string = req.params.reziser;
  let reziser = reziser_string.split(",");
  List.deleteOne({naziv: naziv, korime: korime, reziser: reziser}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Uspesno obrisano iz liste!" 
      });
    } else {
      res.status(400).json({ message: "Greska!" });
    }
  });
});

router.post("/zapocni", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let reziser = req.body.reziser;

  List.findOne({korime: korime, naziv: naziv, reziser: reziser}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
     if(!data) {
      let list = new List({
        naziv: naziv,
        reziser: reziser,
        korime: korime,
        status: "trenutno"
      });
      list.save().then(createdListmovie => {
        res.status(200).json({
          message: "Zapoceto je gledanje!",
          status: createdListmovie.status
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
     } else {
      List.updateOne({naziv: naziv, reziser: reziser, korime: korime}, {"$set": {"status": "trenutno"}}, (err) => {
        if(err) {
          res.status(400).json(err);
        }
        else{
          res.status(200).json({
            message: "Zapoceto je gledanje!",
            status: "trenutno"
          });  
        }
      });
     }
    }
  });  
});

router.post("/pogledao", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let reziser = req.body.reziser;

  List.findOne({korime: korime, naziv: naziv, reziser: reziser}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
     if(!data) {
      let list = new List({
        naziv: naziv,
        reziser: reziser,
        korime: korime,
        status: "pogledan"
      });
      list.save().then(createdListmovie => {
        res.status(200).json({
          message: "Film je pogledan!",
          status: createdListmovie.status,
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
     } else {
      List.updateOne({naziv: naziv, reziser: reziser, korime: korime}, {"$set": {"status": "pogledan"}}, (err) => {
        if(err) {
          res.status(400).json(err);
        }
        else{
          res.status(200).json({
            message: "Film je pogledan!",
            status: "pogledan"
          });  
        }
      });
     }
    }
  });  
});


router.post("/unesikom", (req, res, next) => {
  let comment = new Comment({
    naziv: req.body.naziv,
    reziser: req.body.reziser,
    korime: req.body.korime,
    ocena: req.body.ocena,
    tekst: req.body.tekst
  });
  comment.save().then(createdComment => {
    Comment.find({naziv: req.body.naziv, reziser: req.body.reziser}, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska");
      } else {
        let zbir = 0;
        let prosek = 0;
        data.forEach(kom => {
          zbir = zbir + kom.ocena;
        });
        prosek = parseFloat((zbir/data.length).toFixed(2));
        Movie.updateOne({naziv: req.body.naziv, reziser: req.body.reziser}, {"$set": {"prosek": prosek}}, (err) => {
          if(err) {
            res.status(400).json(err);
          }
          else{
            res.status(200).json({
              message: "Komentar je kreiran",
              prosek: prosek,
              comment: createdComment
            });  
          }
        });
      }
   
   
    });
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.get("/filmkom/:id", (req, res, next) => {
  let pom_movie;
  Movie.findById(req.params.id).then(movie => {
    if (movie) {
      pom_movie = movie;
      Comment.find({naziv: movie.naziv, reziser: movie.reziser}, (err, data) => {
        if(err) {
          res.status(400).json("Desila se greska");
        } else {
          if(data.length == 0) {
            res.status(200).json({
              message: "Komentari nisu pronadjeni",
              movie: pom_movie,
              comments: []
            });
          } else {
            res.status(200).json({
              message: "Komentari su pronadjeni",
              movie: pom_movie,
              comments: data,
            });
          }
        }
      });
    } else {
      res.status(400).json("Film nije nadjen");
    }
  }).catch(err => {
    res.status(400).json("Desila se greska");
  });
});

router.post("/promenikom", (req, res, next) => {
    let naziv = req.body.naziv;
    let reziser = req.body.reziser;
    let korime = req.body.korime;
    let ocena = req.body.ocena;
    let tekst = req.body.tekst
  Comment.updateOne({naziv: naziv, reziser: reziser, korime: korime}, {"$set": {"ocena": ocena, "tekst": tekst}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      Comment.find({naziv: naziv, reziser: reziser}, (err, data) => {
        if(err) {
          res.status(400).json("Desila se greska");
        } else {
          let zbir = 0;
          let prosek = 0;
          data.forEach(kom => {
            zbir += kom.ocena;
          });
          prosek = parseFloat((zbir/data.length).toFixed(2));
          Movie.updateOne({naziv: naziv, reziser: reziser}, {"$set": {"prosek": prosek}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
              res.status(200).json({
                message: "Komentar je promenjen",
                prosek: prosek
              });  
            }
          });
        }
      }); 
    }
  });
});

router.get("/spisakkom/:korime", (req, res, next) => {
  let korime = req.params.korime;
  Comment.find({korime: korime}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    } else {
      if(data.length == 0) {
        res.status(200).json({
          message: "Komentari nisu pronadjeni",
          comments: []
        });
      } else {
        res.status(200).json({
          message: "Komentari su pronadjeni",
          comments: data,
        });
      }
    }
  });
});

router.post("/idfilma", (req, res, next) => {
  let naziv = req.body.naziv;
  let reziser = req.body.reziser;
  Movie.findOne({naziv: naziv, reziser: reziser}, (err, movie) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
     res.status(200).json({
       message: "Uspesno pronadjeno",
       id: movie._id
     });
    }
  });
});

router.get("/dohvatizapaginaciju/:korime", (req, res, next) => {
  let korime = req.params.korime;
  const listQuery1 = List.find({korime: korime, status: "pogledan"});
  const listQuery2 = List.find({korime: korime, status: "trenutno"});
  const listQuery3 = List.find({korime: korime, status: "dodata"});
  let fetchedLists1;
  let fetchedLists2;
  let fetchedLists3;
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;

  listQuery1.then(data => {
    fetchedLists1 = data;
    List.find({korime: korime, status: "pogledan"}).countDocuments().then(count => {
      count1 = count;
      listQuery2.then(data => {
        fetchedLists2 = data;
        List.find({korime: korime, status: "trenutno"}).countDocuments().then(count => {
          count2 = count;
          listQuery3.then(data => {
            fetchedLists3 = data;
            List.find({korime: korime, status: "dodata"}).countDocuments().then(count => {
              count3 = count;
              res.status(200).json({
                message: "Uspesno pronadjeno",
                list1: fetchedLists1,
                count1: count1,
                list2: fetchedLists2,
                count2: count2,
                list3: fetchedLists3,
                count3: count3
              });
            });
          });
        });
      });
    }).catch(err => {
      console.log(err);
    });
  });
});

router.get("/pogledanifilmovi/:korime", (req, res, next) => {
  let korime = req.params.korime;
  const listQuery = List.find({korime: korime, status: "pogledan"});
  let fetchedLists;
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "pogledan"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.get("/trenutnofilmovi/:korime", (req, res, next) => {
  let korime = req.params.korime;
  const listQuery = List.find({korime: korime, status: "trenutno"});
  let fetchedLists;
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "trenutno"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.get("/listafilma/:korime", (req, res, next) => {
  let korime = req.params.korime;
  const listQuery = List.find({korime: korime, status: "dodata"});
  let fetchedLists;
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "dodata"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.post("/piechart", (req, res, next) => {
  let korime = req.body.korime;
  List.find({korime: korime, status: "pogledan"}).then(data => {
   
    if(data.length == 0) {
      res.status(200).json({
        message: "Nema filma",
        array: []
      });
    }
    else {  
      let pom = [];
      let i = 0;
      let poslednji = false;
      let brojac = 0;
      for(let j=0; j<data.length; j++) {
        Movie.findOne({naziv: data[j].naziv, reziser: data[j].reziser}, (err, movie) => {
          if(err) {
            res.status(400).json("Desila se greska");
          }
          else {
            for(let k=0; k<movie.zanrovi.length; k++) {
              pom[i] = movie.zanrovi[k];
              i++;
            }
          }
          brojac++;
          
          if(brojac==data.length) {         
            res.status(200).json({
              message: "Uspesno!",
              array: pom
            });
          }
        });
      }
    }
  }).catch(err => console.log(err));
});


router.post("/praceni", (req, res, next) => {
    let pratilac = req.body.korime;
    Follow.find({pratilac: pratilac}).then(data => {
      if(data.length == 0) {
        res.status(200).json({
          message: "Nema filma",
          array: []
        });
      } else {
       
        let pom = [];
        let brojac = 0;
        for(let j=0; j<data.length; j++) {
          Comment.find({korime: data[j].praceni}, (err, comments) => {
            if(err) {
              res.status(400).json("Desila se greska");
            }
            else {
              if(comments.length != 0) {
                for(let k=0; k<comments.length; k++) {
                  pom.push(comments[k]);
                }
              }
            }
            brojac++;
            
            if(brojac==data.length) {         
              res.status(200).json({
                message: "Uspesno!",
                array: pom
              });
            }
          });
        }
      }
    }).catch(err => {
      console.log(err);
    });
});




module.exports = router;