/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Pretty Fast!',
      'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handlers.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your account.',
      'head.description' : 'Please enter your phone number and password to access your account.',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Order success
handlers.orderSuccess = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order Created Successfully!',
      'head.description' : 'Your order will be delivered within 25 minutes.',
      'body.class' : 'orderSuccess'
    };
    // Read in a template as a string
    helpers.getTemplate('orderSuccess',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new shopping cart item
handlers.shoppingCartCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Ask an Item',
      'body.class' : 'shoppingCartCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('shoppingCartCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Dashboard (view all items in shoppingCart)
handlers.shoppingCartList = function(data,callback){ 
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'shoppingCartList'
    };
    // Read in a template as a string
    helpers.getTemplate('shoppingCartList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a shopping cart item
handlers.shoppingCartEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Shopping Cart Details',
      'body.class' : 'shoppingCartEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('shoppingCartEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new shopping cart item
handlers.orderCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order',
      'body.class' : 'orderCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('orderCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Favicon
handlers.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};


/*
 * JSON API Handlers
 *
 */

//
////////////////////////////////////////////////////////////////////////////
// Ping
////////////////////////////////////////////////////////////////////////////
handlers.ping = function(data,callback){
  setTimeout(function(){
    callback(200);
  },5000);

};

//
////////////////////////////////////////////////////////////////////////////
// Not-Found
////////////////////////////////////////////////////////////////////////////
handlers.notFound = function(data,callback){
  callback(404);
};

//
////////////////////////////////////////////////////////////////////////////
// Users
////////////////////////////////////////////////////////////////////////////
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

// Users - post
// Required data: name, email, password, streetAddress
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;

  if(name && email && password && streetAddress){
    // Make sure the user doesnt already exist
    _data.read('users',email,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'name' : name,
            'email' : email,
            'hashedPassword' : hashedPassword,
            'streetAddress' : streetAddress
          };

          // Store the user
          _data.create('users',email,userObject,function(err){
            if(!err){
              // callback(200); <---- Original code
              // New code: create a token to the new user
              var tokenId = helpers.createRandomString(20);
              var expires = Date.now() + 1000 * 60 * 60;
              var tokenObject = {
                'email' : email,
                'id' : tokenId,
                'expires' : expires
              };
    
              // Store the token
              _data.create('tokens',tokenId,tokenObject,function(err){
                if(!err){
                  callback(200,tokenObject);
                } else {
                  callback(500,{'Error' : 'The user was created but could not create the new token'});
                }
              });  
            } else {
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that email already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

};

// Users - get
// Required data: email
// Optional data: none
handlers._users.get = function(data,callback){
  // Check that email is valid
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 10 ? data.queryStringObject.email.trim() : false;
  if(email){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Users - put
// Required data: email
// Optional data: name, password, streetAddress (at least one must be specified)
handlers._users.put = function(data,callback){
  // Check for required field
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;

  // Check for optional fields
  var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;

  // Error if email is invalid
  if(email){
    // Error if nothing is sent to update
    if(name || password || streetAddress){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token,email,function(tokenIsValid){
        if(tokenIsValid){

          // Lookup the user
          _data.read('users',email,function(err,userData){
            if(!err && userData){
              // Update the fields if necessary
              if(name){
                userData.name = name;
              }
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              if(streetAddress){
                userData.streetAddress = streetAddress;
              }
              // Store the new updates
              _data.update('users',email,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }

};

// Users - delete
// Required data: email
// Optional data: none
// Cleanup old orders associated with the user
handlers._users.delete = function(data,callback){
  // Check that email is valid
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 10 ? data.queryStringObject.email.trim() : false;
  if(email){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',email,function(err){
              if(!err){
                // Delete each of the orders associated with the user
                var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
                var ordersToDelete = userOrders.length;
                if(ordersToDelete > 0){
                  var ordersDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the orders
                  userOrders.forEach(function(orderId){
                    // Delete the order
                    _data.delete('orders',orderId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      ordersDeleted++;
                      if(ordersDeleted == ordersToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's orders. All orders may not have been deleted from the system successfully."})
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

//
////////////////////////////////////////////////////////////////////////////
// Tokens
////////////////////////////////////////////////////////////////////////////
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens  = {};

// Tokens - post
// Required data: email, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(email && password){
    // Lookup the user who matches that email
    _data.read('users',email,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'email' : email,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s).'})
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the existing token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};


// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,email,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.email == email && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

//
////////////////////////////////////////////////////////////////////////////
// Menu
////////////////////////////////////////////////////////////////////////////
handlers.menu = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the menu methods
handlers._menu  = {};

// Menu - get
// Required data: email
// Optional data: none
handlers._menu.get = function(data,callback){
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 10 ? data.queryStringObject.email.trim() : false;
  if(email){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('menu','menu',function(err,data){
          if(!err && data){
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."})
      }
    });
  }
};

//
////////////////////////////////////////////////////////////////////////////
// Shopping cart
////////////////////////////////////////////////////////////////////////////
handlers.shoppingcart = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._shoppingcart[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the shoppingcart methods
handlers._shoppingcart = {};


// shoppingcart - post 
// Required data: email, arrQuantity
// Optional data: none
handlers._shoppingcart.post = function(data,callback){
  // Validate inputs

  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;  
  var arrQuantity = typeof (data.payload.arrQuantity) == 'object' && data.payload.arrQuantity instanceof Array ? data.payload.arrQuantity : [];

  if(email && arrQuantity){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user email by reading the token
    _data.read('tokens', token, function (err, tokenData) {
      if (!err && tokenData) {

        handlers._tokens.verifyToken(token,email,function(tokenIsValid){
          if(tokenIsValid){

            // Lookup the user data
            _data.read('users', email, function (err, userData) {
              if (!err && userData) {
                if (arrQuantity.length == 0) {
                  userData.shoppingcart = [];
                  // Save the object
                  _data.update('users',email,userData,function(err){
                    if(!err){
                      callback(200);
                    } else {
                      callback(500,{'Error' : 'Could not update the user\'s shopping cart.'});
                    }
                  });                                  
                }
                var newUserShoppingCart = [];
                arrQuantity.forEach((_q, index) => {
                  Object.entries(_q).forEach(entry => {
                    let menuItemId = String(entry[0]).split('qt_')[1];
                    let qty = parseInt(entry[1],10);

                    // Lookup the menu item data
                    _data.read('menu/menuItem',menuItemId, function(err, menuItemData){
                      if (!err && menuItemData) {
                        // Create random id for shoppingcartItem
                        var shoppingcartItemId = helpers.createRandomString(20);

                        // Create shoppingcartItem object
                        var shoppingcartItemObject = {
                          'id': shoppingcartItemId,
                          'menuItemId': menuItemId,
                          'category':menuItemData.category,
                          'description':menuItemData.description,
                          'quantity': qty,
                          'unitPrice': menuItemData.price,
                          'totalItemPrice': qty * menuItemData.price
                        };

                        newUserShoppingCart.push(shoppingcartItemObject);
                        if (index+1 == arrQuantity.length){
                          // Add shoppingcartItem id to the user's object
                          userData.shoppingcart = newUserShoppingCart;
                          // Save the object
                          _data.update('users',email,userData,function(err){
                            if(!err){
                              callback(200);
                            } else {
                              callback(500,{'Error' : 'Could not update the user\'s shopping cart.'});
                            }
                          });                
                        }            
                      } else {
                        callback(500,{'Error' : 'Could not update the user\'s shopping cart.'});
                      }
                    });
                  });
                });
              } else {
                callback(500,{'Error' : 'Could not update the user\'s shopping cart.'});
              }
            });                                    
          } else {
            callback(403,{"Error" : "Missing required token in header, or token is invalid."})
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }  
};


// shoppingcart - get
// Required data: (id, email) or ('allitems=true')
// Optional data: none
handlers._shoppingcart.get = function(data,callback){
  // Check that required data is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 10 ? data.queryStringObject.email.trim() : false;
  var allitems = typeof(data.queryStringObject.allitems) == 'string' && data.queryStringObject.allitems == 'true' ? true : false;

  if(id && email){
    // Lookup the shoppingcart
    _data.read('users', email, function (err, userData) {
      if(!err && userData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the shoppingcart
        handlers._tokens.verifyToken(token,email,function(tokenIsValid){
          if(tokenIsValid){
            // Return shoppingcart data
            callback(200,userData.shoppingcart.findIndex(x => x.id == id) > -1 ? userData.shoppingcart[userData.shoppingcart.findIndex(x => x.id == id)] : []);
          } else {
            callback(403,{"Error" : "Missing email, required token in header, or token is invalid."});
          }
        });
      } else {
        callback(404);
      }
    });
  } else
  if (email && allitems){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,userData){
          if(!err && userData){
            var userShoppingCart = typeof (userData.shoppingcart) == 'object' && userData.shoppingcart instanceof Array ? userData.shoppingcart : [];
            if (userShoppingCart.length > 0){
              let _userShoppingCart = [];
              userShoppingCart.forEach(item => {
                item.userEmail = email;
              });
              userShoppingCart = _userShoppingCart;
            }
            callback(200, userShoppingCart);
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};


// shoppingcart - put
// Required data: id, email, quantity
// Optional data: none
handlers._shoppingcart.put = function(data,callback){
  // Check for required field  
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;
  var quantity = typeof(data.payload.quantity) == 'string' && parseInt(data.payload.quantity,10) % 1 == 0 && parseInt(data.payload.quantity,10) >= 1 ? data.payload.quantity : false;

  // Error if id is invalid
  if(id && email){
    // Error if nothing is sent to update
    if(quantity){
      quantity = parseInt(quantity,10);
      // Lookup the shoppingcartItem
      _data.read('users',email,function(err,userData){
        if(!err && userData && userData.shoppingcart && userData.shoppingcart.findIndex(x => x.id === id) >= 0){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          
          // Verify that the given token is valid and belongs to the user who created the shoppingcartItem
          handlers._tokens.verifyToken(token,email,function(tokenIsValid){
            if(tokenIsValid){
              var userShoppingCart = userData.shoppingcart;
              var shoppingcartItemIndex = userData.shoppingcart.findIndex(x => x.id === id);
              var shoppingcartItemData = userShoppingCart[shoppingcartItemIndex];

              // Update shoppingcartItem data where necessary
              shoppingcartItemData.quantity = quantity;
              shoppingcartItemData.totalItemPrice = quantity * shoppingcartItemData.unitPrice;

              // Store the new updates
              userShoppingCart[shoppingcartItemIndex].quantity = quantity;
              userShoppingCart[shoppingcartItemIndex].totalItemPrice = quantity * shoppingcartItemData.unitPrice;
              userData.shoppingcart = userShoppingCart;

              _data.update('users', email, userData, (err)=>{
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user\'s shopping cart.'});    
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{'Error' : 'Shopping cart item ID does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required fields.'});
  }
};


// shoppingcart - delete
// Required data: id, email
// Optional data: none
handlers._shoppingcart.delete = function(data,callback){
  // Check that id is valid

  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 10 ? data.queryStringObject.email.trim() : false;

  if(id && email){
      // Lookup the shoppingcartItem
      _data.read('users',email,function(err,userData){
        if(!err && userData && userData.shoppingcart && userData.shoppingcart.findIndex(x => x.id === id) >= 0){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          
          // Verify that the given token is valid and belongs to the user who created the shoppingcartItem
          handlers._tokens.verifyToken(token,email,function(tokenIsValid){
            if(tokenIsValid){
              var userShoppingCart = userData.shoppingcart;
              var shoppingcartItemIndex = userData.shoppingcart.findIndex(x => x.id === id);

              // Delete the item
              userShoppingCart.splice(shoppingcartItemIndex,1);
              userData.shoppingcart = userShoppingCart;

              _data.update('users', email, userData, (err)=>{
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not delete the user\'s shopping cart item.'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{'Error' : 'Shopping cart item ID does not exist.'});
        }
      });
  } else {
    callback(400,{"Error" : "Missing valid id or email."});
  }
};

//
////////////////////////////////////////////////////////////////////////////
// Order
////////////////////////////////////////////////////////////////////////////
handlers.order = function(data,callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._order[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._order = {};

// Orders - post
// Confirm / pay the order
// Required data: email, creditCard, expiryMonth, expiryYear, cvc, deliveryAddress
handlers._order.post = function(data,callback){
  // Check that email is valid
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 10 ? data.payload.email.trim() : false;  
  var creditCard = typeof(data.payload.creditCard) == 'string' && data.payload.creditCard.trim().length === 16 ? data.payload.creditCard.trim() : false;
  var expiryMonth = typeof(data.payload.expiryMonth) == 'number' && data.payload.expiryMonth % 1 === 0 && data.payload.expiryMonth >= 1 ? data.payload.expiryMonth : false;
  var expiryYear = typeof(data.payload.expiryYear) == 'number' && data.payload.expiryYear % 1 === 0 && data.payload.expiryYear >= 1 ? data.payload.expiryYear : false;
  var cvc = typeof(data.payload.cvc) == 'number' && data.payload.cvc % 1 === 0 && data.payload.cvc >= 1 ? data.payload.cvc : false;
  var deliveryAddress = typeof(data.payload.deliveryAddress) == 'string' && data.payload.deliveryAddress.trim().length > 0 ? data.payload.deliveryAddress.trim() : false;

  if(email && creditCard && expiryMonth && expiryYear && cvc && deliveryAddress){
    // Get the token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that given token from headers is valid for the email
    handlers._tokens.verifyToken(token, email, (tokenIsValid)=>{
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,userData){
          if(!err && userData){
            var userShoppingCart = typeof (userData.shoppingcart) == 'object' && userData.shoppingcart instanceof Array ? userData.shoppingcart : [];                     
            if (userShoppingCart.length > 0) {
              var totalAmount = userShoppingCart.sum('totalItemPrice');
              let tok = 'tok_visa';
              let charge = {
                'amount' : Number(totalAmount.toFixed(2))*100,
                'currency' : 'usd',
                'description' : 'Charges for your order',
                'source' : tok
              };
              var d = new Date();
              var s = String(d.getFullYear()) + 
                      String(100+d.getMonth()).substring(1) +
                      String(100+d.getDate()).substring(1) + '_' +
                      d.toLocaleTimeString().split(':').join('');
              let orderId = s + "_" + helpers.createRandomString(10);
              helpers.stripe(charge.amount, charge.currency, charge.description, charge.source, (err)=>{
                if(err){
                  callback(500, { 'Error': 'There was an error processing your payment'});
                } else{
                  let message = `Hi ${userData.name}. Thanks for your order #${orderId} Total: $${charge.amount / 100}. \n\n Your order will be delivered within 25 minutes.`;
                  helpers.mailgun(email, 'Order Confirmation', message, (err)=>{
                    if(!err){
                      // Create and store the order
                      let order_ = {
                        items: userShoppingCart,
                        amount: totalAmount
                      }
                      _data.create('orders', orderId, order_, (err)=>{
                        if(!err){
                          // Empty the user's shoppingcart
                          userData.shoppingcart = [];
                          var userOrders = typeof (userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
                          userOrders.push(orderId);
                          userData.orders = userOrders;
                          _data.update('users', email, userData, (err)=>{
                            if(!err){
                              callback(200);
                            } else {
                              callback(500, {'Error' : 'Could not empty the user\'s shopping cart'});
                            }
                          });
                        } else {
                          callback(500, {"Error" : "Error encountered creating order. It may already exist"})
                        }
                      });
                    } else{
                      callback(500, {'Error' : 'Problem encountered sending confirmation email'})
                    }
                  });
                }
              });  
            } else {
              callback(200);
            }
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403, {'Error' : 'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s)'})
  }
};

Array.prototype.sum = function(prop){
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++){
    total += this[i][prop];
  }
  return total;
}

// Export the handlers
module.exports = handlers;