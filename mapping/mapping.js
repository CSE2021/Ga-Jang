var express = require('express');
const upload = require('../imageUpload/imgUpl');
const {testAPI} = require('../routes/test');

const {userListAPI} = require('../routes/userList');
const {userInfoAPI} = require('../routes/userInfo');
const {idCheckAPI} = require('../routes/idCheck');
const {registerAPI} = require('../routes/register');
const {editEmailAPI} = require('../routes/editEmail');
const {editNameAPI} = require('../routes/editName');
const {editLocAPI} = require('../routes/editLoc');
const {editAccountAPI} = require('../routes/editAccount');
const {userDeleteAPI} = require('../routes/userDelete');
const {loginAPI} = require('../routes/login');

const {getContentAPI} = require('../routes/getContent');
const {postingAPI} = require('../routes/posting');
const {boardListAPI} = require('../routes/boardList');
const {deleteContentAPI} = require('../routes/deleteContent');

var router = express.Router();

router.get('/', testAPI);

router.get('/users/list', userListAPI);
router.get('/users/:id', userInfoAPI);
router.post('/users/idCheck', idCheckAPI);
router.post('/users/login', loginAPI);
router.post('/users/register', upload.single('img'), registerAPI);
router.post('/users/edit-email', editEmailAPI);
router.post('/users/edit-name', editNameAPI);
router.post('/users/edit-loc', editLocAPI);
router.post('/users/edit-account', editAccountAPI);
router.delete('/users/:id', userDeleteAPI);

router.get('/board/:bid', getContentAPI);
router.post('/board/post', upload.array('img'), postingAPI);
router.get('/board/list/:page', boardListAPI);
router.delete('/board/:bid', deleteContentAPI);

module.exports = router;