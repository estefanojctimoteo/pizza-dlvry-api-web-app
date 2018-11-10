// Container for the private module object
var private = {};

private.stripe = {
  publishableKey : 'pk_test_create_your_publishable_key',
  secretKey : 'sk_test_create_your_secret_key'
};

private.mailgun = {
  from: 'postmaster@create_your_sandbox.mailgun.org',
  apiKey: 'create_your_mailgun_api_key',
  domainName : 'create_your_sandbox.mailgun.org'
};

module.exports = private;