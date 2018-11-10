/*
 * Create and export configuration variables
 *
 */

// Dependencies
let privateData = require('../private');

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 3006,
  'httpsPort' : 3007,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxOrderItems' : 3,
  'stripe' : {
    'publishable' : privateData.stripe.publishableKey,
    'secret' : privateData.stripe.secretKey
  },
  'mailgun' :{
    'domainName' : privateData.mailgun.domainName,
    'apiKey' : privateData.mailgun.apiKey,
    'from' : privateData.mailgun.from
  },
  'templateGlobals' : {
    'appName' : 'Pretty Fast Pizza Delivery',
    'companyName' : 'Pretty Fast Pizza Delivery NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:3006/'
  }
};

// Production environment
environments.production = {
  'httpPort' : 5006,
  'httpsPort' : 5007,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'maxOrderItems' : 3,
  'stripe' : {
    'publishable' : privateData.stripe.publishableKey,
    'secret' : privateData.stripe.secretKey
  },
  'mailgun' :{
    'domainName' : privateData.mailgun.domainName,
    'apiKey' : privateData.mailgun.apiKey,
    'from' : privateData.mailgun.from
  },
  'templateGlobals' : {
    'appName' : 'Pretty Fast Pizza Delivery',
    'companyName' : 'Pretty Fast Pizza Delivery NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:5006/'
  }
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
