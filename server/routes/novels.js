const {Router} = require('express');
const router = Router();
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();

router.get('/novels', (req, res) => {
  const sql = 'SELECT * FROM novels';

  connection.query(sql, (error, result) => {
    if(error) throw error;
    if(result.length > 0) {
      res.json(result);
    } else {
      res.json({msg: 'No results :('});
    }
  });
});

router.get('/novel/:id', (req, res) => {
  const {id} = req.params;

  const sql = 'SELECT * FROM novels WHERE id = ?';

  connection.query(sql, [id], (error, result) => {
    if(error) throw error;
    if(result.length > 0) {
      res.json(result);
    } else {
      res.json({msg: 'No result :('});
    }
  });
});

router.post('/new-novel', (req, res) => {
  const sql = 'INSERT INTO novels SET ?';
  const newNovel = {
    title: req.body.title,
    author: req.body.author,
    volumes: req.body.volumes,
    image_url: req.body.image_url
  };

  connection.query(sql, newNovel, error => {
    if(error) throw error

    res.json({msg: 'Novel created'});
  });

});

router.put('/edit/:id', (req, res) => {
  const {id} = req.params;

  const {title, author, volumes, image_url} = req.body;

  const sql = 'UPDATE novels SET title = ?, author = ?, volumes = ?, image_url = ? WHERE id = ?';

  connection.query(sql, [title, author, volumes, image_url, id], error => {
    if(error) throw error

    res.json({msg: 'Novel updated'});
  });
});

router.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'DELETE FROM novels WHERE id = ?';
  connection.query(sql, [id], error => {
    if(error) throw error

    res.json({msg: 'Novel deleted'});
  });
});

module.exports = router;