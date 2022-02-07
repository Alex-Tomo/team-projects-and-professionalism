/**
 * Exports all validation class'
 *
 * @author Jordan Short
 */
 const authJwt = require('./auth-jwt')
 const verifySignUp = require('./auth-signup')
 
 module.exports = {
   authJwt,
   verifySignUp
 }