'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config()

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  API_KEY: JSON.stringify(process.env.API_KEY),
  AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
  DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
  PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
  STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
  MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
})
