const express = require('express');
const organization_router =  express.Router();
const organization_controller = require('../controller/organization_controller');

organization_router.post('/', organization_controller.organizationPost);
organization_router.get('/', organization_controller.organizationGet);
organization_router.get('/:organization_id', organization_controller.getOrgById);

organization_router.put('/:organization_id', organization_controller.organisationUpdate);

organization_router.delete('/:organization_id', organization_controller.organisationDelete);

// exporting the organization_router too bee used in all other places in the api.
module.exports = organization_router;