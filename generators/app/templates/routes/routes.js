import express from 'express';

<% JSON.parse(models).forEach(function(model){ %>
import <%= model.model_name %>Controller from  '../controllers/<%= model.model_name%>Controller';
<% }); %> 

import UserController from '../controllers/UserController';
let router = express.Router();

router.use('/user', UserController)


<% JSON.parse(models).forEach(function(model){ %>
router.use('/<%= model.model_name %>', <%= model.model_name %>Controller)
<% }); %> 

export default router;