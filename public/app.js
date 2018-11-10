/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  localStorage.removeItem('shoppingCartLength');

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }
  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){
    
    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }

        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        var arrQuantity = [];

        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            var idOfElement = elements[i].id;            

            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // Create an payload field named "email" if the elements name is actually uemail
              if(nameOfElement == 'uemail'){
                nameOfElement = 'email';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                if (idOfElement.indexOf('qt_') == -1){
                  payload[nameOfElement] = valueOfElement;
                } else
                if (parseInt(valueOfElement, 10) > 0){
                  let _qt = {
                    [idOfElement] : valueOfElement
                  };
                  arrQuantity.push(_qt);
                }
              }
            }
          }
        }
        payload['arrQuantity'] = arrQuantity;

        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }
        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the email and password, and use it to log the user in
    var newPayload = {
      'email' : requestPayload.email,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/shoppingcart/all';
      }
    });
  }

  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/shoppingcart/all';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2','shoppingCartEdit1'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just created a new item successfully, redirect back to the dashboard
  if(formId == 'shoppingCartCreate'){
    window.location = '/shoppingcart/all';
  }

  // If the user just deleted a item, redirect them to the dashboard
  if(formId == 'shoppingCartEdit2'){
    window.location = '/shoppingcart/all';
  }

  // If the user just created a new order successfully, redirect back to the success page
  if(formId == 'orderCreate'){
    app.setShoppingCartLength(0);
    window.location = '/order/success';
  }
};

app.setShoppingCartLength = function(shoppingCartLength){
  localStorage.setItem('shoppingCartLength',shoppingCartLength);  
}

app.getShoppingCartLength = function(callback){
  var shoppingCartLength = localStorage.getItem('shoppingCartLength');
  if(typeof(shoppingCartLength) == 'string'){
    callback(shoppingCartLength);
  } else {
    callback(false);
  }
}

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for main shopping cart page
  if(primaryClass == 'shoppingCartList'){
    app.loadShoppingCartListPage();
  }

  // Logic for create shopping cart item
  if(primaryClass == 'shoppingCartCreate'){
    app.loadShoppingCartCreatePage();
  }

  // Logic for item details page
  if(primaryClass == 'shoppingCartEdit'){
    app.loadShoppingCartEditPage();
  }

  // Logic for main shopping cart page
  if(primaryClass == 'orderCreate'){
    app.loadOrderPage();
  }

  app.getShoppingCartLength(function(shoppingCartLength){
    if (shoppingCartLength){
      let divShoppingCartLength = document.getElementById('shoppingCartLength');
      if (divShoppingCartLength){
        document.getElementById('shoppingCartLength').innerText = 'My Shopping Cart (' + shoppingCartLength + ')';
      }                  
    }
  });
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .nameInput").value = responsePayload.name;
        document.querySelector("#accountEdit1 .streetAddressInput").value = responsePayload.streetAddress;
        document.querySelector("#accountEdit1 .displayEmailInput").value = responsePayload.email;

        // Put the hidden email field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
            hiddenEmailInputs[i].value = responsePayload.email;
        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {    
    app.logUserOut();
  }
};

Array.prototype.sum = function(prop){
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++){
    total += this[i][prop];
  }
  return total;
}

function compare(a,b) {
  if (a.description < b.description)
    return -1;
  if (a.description > b.description)
    return 1;
  return 0;
}

// Load the dashboard page specifically
app.loadShoppingCartListPage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Determine how many shoppingCart the user has 
        var shoppingCartItems = typeof(responsePayload.shoppingcart) == 'object' && responsePayload.shoppingcart instanceof Array && responsePayload.shoppingcart.length > 0 ? responsePayload.shoppingcart : [];

        app.setShoppingCartLength(shoppingCartItems.length === 0 ? 0 : shoppingCartItems.sum('quantity'));

        app.getShoppingCartLength(function(shoppingCartLength){
          if (shoppingCartLength){
            let divShoppingCartLength = document.getElementById('shoppingCartLength');
            if (divShoppingCartLength){
              document.getElementById('shoppingCartLength').innerText = 'My Shopping Cart (' + shoppingCartLength + ')';
            }                  
          }
        });
      
        if(shoppingCartItems.length > 0){
          var table = document.getElementById("shoppingCartListTable");

          shoppingCartItems = shoppingCartItems.sort(compare);

          // Show each created item as a new row in the table
          shoppingCartItems.forEach(function(menuItem, index){
            // Make the item data into a table row
            var tr = table.insertRow(index + 1);
            tr.classList.add('itemRow');
            var td0 = tr.insertCell(0);
            var td1 = tr.insertCell(1);
            var td2 = tr.insertCell(2);
            var td3 = tr.insertCell(3);
            var td4 = tr.insertCell(4);
            var td5 = tr.insertCell(5);

            td0.innerHTML = menuItem.description;
            td1.innerHTML = menuItem.category;
            td2.innerHTML = menuItem.unitPrice;
            td2.style = 'padding-right: 20px; text-align: right;';
            td3.innerHTML = menuItem.quantity;
            td3.style = 'padding-right: 20px; text-align: right;';
            td4.innerHTML = menuItem.totalItemPrice.toFixed(2);
            td4.style = 'padding-right: 20px; text-align: right;';
            td5.innerHTML = `<a href="/shoppingcart/edit?id=${menuItem.id}">View / Edit / Delete</a>`;
            td5.style = 'text-align: center;';

            if (index + 1 === shoppingCartItems.length) {
              var lastTr = table.insertRow(index + 2);
              lastTr.classList.add('itemRow');
              lastTr.insertCell(0);
              lastTr.insertCell(1);
              lastTr.insertCell(2);
              var _td3 = lastTr.insertCell(3);
              var _td4 = lastTr.insertCell(4);
              lastTr.insertCell(5);

              _td3.innerHTML = 'Total US$';
              _td3.style = 'text-align: right;  font-weight: bold;';
              _td4.innerHTML = (shoppingCartItems.sum('totalItemPrice')).toFixed(2);
              _td4.style = 'padding-right: 20px; text-align: right; background-color: #a6bccd; font-weight: bold;';
            }
          });
        } else {
          // Show 'you have no shoppingCart' message
          document.getElementById("noShoppingCartItemsMessage").style.display = 'table-row';

          // Show the menu / create shopping cart CTA
          document.getElementById("createShoppingCartCTA").style.display = 'block';
        }
      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Provide menu items data to page
app.loadShoppingCartCreatePage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Determine how many shoppingCart the user has 
        var menu = typeof(responsePayload.menu) == 'object' && responsePayload.menu instanceof Array && responsePayload.menu.length > 0 ? responsePayload.menu : [];
        if(menu.length > 0){

          var shoppingCartItems = []
          app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
            if(statusCode == 200){
              // Put the hidden email field into the form
              var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
              for(var i = 0; i < hiddenEmailInputs.length; i++){
                hiddenEmailInputs[i].value = email;
              }

              shoppingCartItems = typeof(responsePayload.shoppingcart) == 'object' && responsePayload.shoppingcart instanceof Array ? responsePayload.shoppingcart : [];              

              var table = document.getElementById("shoppingCartListTable");

              menu = menu.sort(compare);

              // Show each created item as a new row in the table
              menu.forEach(function(menuItem){
    
                var tr = table.insertRow(-1);
                tr.classList.add('itemRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
      
                td0.innerHTML = menuItem.description;
                td1.innerHTML = menuItem.category;
                td2.innerHTML = menuItem.price;
                td2.style = 'padding-right: 20px; text-align: right;';
                td3.innerHTML = `<select class="inputQuantity" name="quantity" id="qt_${menuItem.id}" ></select>`;
    
                var elementSelect = document.getElementById(`qt_${menuItem.id}`);
      
                for (let q=0; q<= 100; q++){
                  var option = document.createElement("option");
                  option.text = q;
                  option.value = q;
                  elementSelect.appendChild(option);
                }
                    
                if (shoppingCartItems.find(x => x.menuItemId == menuItem.id)){
                  elementSelect.value = shoppingCartItems.find(x => x.menuItemId == menuItem.id).quantity;
                }
              });
            } else {
              console.log('shoppingCartItems not found...');
            }
          });    
        } else {
          console.log('Items not found...');
        }
      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {    
    app.logUserOut();
  }
}

// Load the shoppingCart edit page specifically
app.loadShoppingCartEditPage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email 
    };
    app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Get the item id from the query string, if none is found then redirect back to dashboard
        var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
        if(id){
          // Fetch the item data
          var queryStringObject = {
            'id' : id,
            'email' : email,
          };
          app.client.request(undefined,'api/shoppingcart','GET',queryStringObject,undefined,function(statusCode,responsePayload){
            if(statusCode == 200){

              // Put the hidden id field into both forms
              var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
              for(var i = 0; i < hiddenIdInputs.length; i++){
                  hiddenIdInputs[i].value = responsePayload.id;
              }

              // Put the hidden email field into both forms
              var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
              for(var i = 0; i < hiddenEmailInputs.length; i++){
                hiddenEmailInputs[i].value = email;
              }

             // Make the item data into a table row
             var table = document.getElementById("shoppingCartItemTable");
             var tr = table.insertRow(-1);
             tr.classList.add('itemRow');
             var td0 = tr.insertCell(0);
             var td1 = tr.insertCell(1);
             var td2 = tr.insertCell(2);
             var td3 = tr.insertCell(3);
             var td4 = tr.insertCell(4);             

             td0.innerHTML = responsePayload.id;
             td1.innerHTML = responsePayload.description;
             td2.innerHTML = responsePayload.category;
             td3.innerHTML = responsePayload.unitPrice;
             td3.style = 'padding-right: 20px; text-align: right;';

             td4.innerHTML = `<select class="inputQuantity" name="quantity" id="quantity"></select>`;
             //td3.style = '';
 
             var elementSelect = document.getElementById("quantity");
   
             for (let q=0; q<= 100; q++){
               var option = document.createElement("option");
               option.text = q;
               option.value = q;
               elementSelect.appendChild(option);
             }
             elementSelect.value = responsePayload.quantity;
 
            } else {
              // If the request comes back as something other than 200, redirect back to dashboard
              window.location = '/shoppingcart/all'; 
            }
          });
        } else {
          window.location = '/shoppingcart/all';
        }
      } else {        
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the dashboard page specifically
app.loadOrderPage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Put the hidden email field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
          hiddenEmailInputs[i].value = email;
        }

        // Determine how many shoppingCart the user has 
        var shoppingCartItems = typeof(responsePayload.shoppingcart) == 'object' && responsePayload.shoppingcart instanceof Array && responsePayload.shoppingcart.length > 0 ? responsePayload.shoppingcart : [];
        if(shoppingCartItems.length > 0){

          var table = document.getElementById("shoppingCartListTable");

          shoppingCartItems = shoppingCartItems.sort(compare);

          // Show each created item as a new row in the table
          shoppingCartItems.forEach(function(menuItem, index){
            // Make the item data into a table row
            var tr = table.insertRow(index + 1);
            tr.classList.add('itemRow');
            var td0 = tr.insertCell(0);
            var td1 = tr.insertCell(1);
            var td2 = tr.insertCell(2);
            var td3 = tr.insertCell(3);
            var td4 = tr.insertCell(4);
            var td5 = tr.insertCell(5);

            td0.innerHTML = menuItem.description;
            td1.innerHTML = menuItem.category;
            td2.innerHTML = menuItem.unitPrice;
            td2.style = 'padding-right: 20px; text-align: right;';
            td3.innerHTML = menuItem.quantity;
            td3.style = 'padding-right: 20px; text-align: right;';
            td4.innerHTML = menuItem.totalItemPrice.toFixed(2);
            td4.style = 'padding-right: 20px; text-align: right;';

            if (index + 1 === shoppingCartItems.length) {
              var lastTr = table.insertRow(index + 2);
              lastTr.classList.add('itemRow');
              lastTr.insertCell(0);
              lastTr.insertCell(1);
              lastTr.insertCell(2);
              var _td3 = lastTr.insertCell(3);
              var _td4 = lastTr.insertCell(4);

              _td3.innerHTML = 'Total US$';
              _td3.style = 'text-align: right;  font-weight: bold;';
              _td4.innerHTML = (shoppingCartItems.sum('totalItemPrice')).toFixed(2);
              _td4.style = 'padding-right: 20px; text-align: right; background-color: #a6bccd; font-weight: bold;';
            }
          });

          document.querySelector("#orderCreate .deliveryAdrressInput").value = responsePayload.streetAddress;

        } else {
          // Show 'you have no shoppingCart' message
          document.getElementById("noShoppingCartItemsMessage").style.display = 'table-row'; 

          var divSubmit = document.getElementById("submitOrder");
          divSubmit.innerHTML = '<a class="cta green" href="/shoppingcart/create">Menu</a>';
        }
      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());        
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();
};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
