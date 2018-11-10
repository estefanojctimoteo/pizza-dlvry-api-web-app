# Pizza Delivery

##  Node.JS Rest API and web app for a Pizza Delivery company written without any external libraries.

### Specs

Here's the spec from the project manager: 

"Create a web app that allows customers to:

1. Signup on the site
2. View all the items available to order
3. Fill up a shopping cart
4. Place an order, and receive an email receipt"

### Api main features

1. New users can be created, their information can be edited, and they can be deleted. 
We should store their name, email address, and street address.

2. Users can log in and log out by creating or destroying a token.

3. When a user is logged in, he or she should be able to GET all the possible 
menu items (these items can be hardcoded into the system). 

4. A logged-in user should be able to fill a shopping cart with menu items.

5. A logged-in user should be able to create an order. 
You should integrate with the Sandbox of https://stripe.com to accept their payment. 
Note: Use the stripe sandbox for your testing. 
Follow this link and click on the "tokens" tab to see the fake tokens 
you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards

6. When an order is placed, you should email the user a receipt. 
You should integrate with the sandbox of https://mailgun.com for this. 
Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) 
that you can send from by default. So, there's no need to setup any DNS for your domain for this task 
https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account

## Endpoints

### ```/users```

##### POST

- Create a new user with a unique email address.  
Required fields: (in JSON payload) `name`, `email`, `password`, `streetAddress`.
If everything is OK, the response will be a 200 code + a token.

##### GET

- Retrieve data for an existing user.  
Required fields: (in query string) `email`  
Requires token: Yes

##### PUT

- Update an existing user.  
Required fields: (in JSON payload) `email`  
Optional fields: (in JSON payload) `name`, `password`, `streetAddress` (at least one must be specified)  
Requires token: Yes

##### DELETE

- Delete an existing user.  
Required fields: (in query string) `email`  
Requires Token: Yes

### `/tokens`

##### POST

- Create a token for a user. (log in)  
Required fields: (in JSON payload) `email`, `password`  
Requires token: No

##### GET

- Lookup the token for a user.  
Required fields: (in query string) `id`   
Requires token: No

##### PUT 

- Extend a token for a user.  
Required fields: (in JSON payload) `email`, `extend`  
Requires token: Yes 

##### DELETE

- Remove a token configuring the user's log out.
Required fields: (in query string) `id`  
Requires token: Yes 

### `/menu`

##### GET

- Returns the menu in a JSON object.  
Required fields: (in query string) `email` 
Requires token: Yes

### `/shoppingcart`

##### POST

- Add a menu item to the user's shopping cart.  
Required fields: (in JSON payload) `email`, `arrQuantity` (array of menu items id + '_' + quantity)
Requires token: Yes 

##### GET

- Fetch one or all the user's shopping cart.
Required fields: (in query string) (`id` and `email`) `allitems=true`
Requires token: Yes

##### PUT

- Update the user's shopping cart.  
Required fields: (in JSON payload) `id`, `email` and `quantity`  
Requires token: Yes

##### DELETE

- Delete one item of the user's shopping cart.
Required fields: (in query string) `id` and `email`
Requires token: Yes

### `/order`

##### POST

- Create an order for the user with his/her current shopping cart contents, charging a credit card using a HTTPS request to the Stripe.com API and send a confirmation email by using a HTTPS request to Mailgun.com API.
Required fields: (in JSON payload) `email`, `creditCard`, `expiryMonth`, `expiryYear`, `cvc` and `deliveryAddress`
Requires token: Yes
