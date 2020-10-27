const {Router} = require('express');
const router = Router();
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/novels', authMiddleware, (req, res) => {
  const sql = 'SELECT * FROM novels WHERE user_id = ?';

  connection.query(sql, [req.user.id], (error, result) => {
    if(error) throw error;
    if(result.length > 0) {
      res.json(result);
    } else {
      res.json({error: true, msg: 'No results :('});
    }
  });
});

router.get('/novel/:id', authMiddleware, (req, res) => {
  const {id} = req.params;

  const sql = 'SELECT * FROM novels WHERE id = ? AND user_id = ?';

  connection.query(sql, [id, req.user.id], (error, result) => {
    if(error) throw error;
    if(result.length > 0) {
      res.json(result);
    } else {
      res.json({error: true, msg: 'No result :('});
    }
  });
});

router.post('/new-novel', authMiddleware, (req, res) => {
  const sql = 'INSERT INTO novels SET ?';
  const newNovel = {
    title: req.body.title,
    author: req.body.author,
    volumes: parseInt(req.body.volumes),
    image_url: req.body.image_url,
    user_id: req.user.id
  };

  connection.query(sql, newNovel, (error, result) => {
    if(error) throw error

    newNovel.id = result.insertId

    res.json({msg: 'Novel created', newNovel});
  });
});

router.put('/edit/:id', authMiddleware, (req, res) => {
  const {id} = req.params;

  const {title, author, volumes, image_url} = req.body;

  const updNovel = {
    id: parseInt(id), title, author, volumes, image_url, user_id: req.user.id
  }

  const sql = 'UPDATE novels SET title = ?, author = ?, volumes = ?, image_url = ? WHERE id = ? AND user_id = ?';

  connection.query(sql, [title, author, volumes, image_url, id, req.user.id], (error) => {
    if(error) throw error

    res.json({msg: 'Novel updated', updNovel});
  });
});

router.delete('/delete/:id', authMiddleware, (req, res) => {
  const {id} = req.params;
  const sql = 'DELETE FROM novels WHERE id = ? AND user_id = ?';
  connection.query(sql, [id, req.user.id], error => {
    if(error) throw error

    res.json({msg: 'Novel deleted'});
  });
});

module.exports = router;