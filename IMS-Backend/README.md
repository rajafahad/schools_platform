# Folder Structure.
--
> * Config
> * Controller
> * Helper
> * Models
> * Modules
> * REST
> * Routes
> * Services
> * Utils
> * Validator

---
> - # Git Command to push
git add . 
git commit -m ""
git push



# Dependencies

> **cors** 
*   middleware
*   const cors =  require("cors"); 
*   app.use(cors());

> **dotenv**
> **express**

> **express-async-errors**
* This is used to handler async error.only add in Express App file.
* => require('express-async-errors');

> **http-errors**
* Throw a error
* 
* 

> **joi**
> mongoose

> **morgan**
*   (middleware)
*   This is used for log http request
*   const morgan = require("morgan");
*   app.use(morgan('tiny'));


# Folder Detail

**Config**
> In this folder we have config Function

**Controller**
> All Controller Function

**Helper**
> Helper Function are Use full for some api required in many place to perform same function

**Models**
> In the Model all MongoDB schema 

**Modules**
> Our Project are modules Base so Modules use for make module strucutre

**REST**
> This is REST Client VS Code Plugin to Test our API

**Routes**
> All Routes 

**Services**
> Internal/External Services used in our project

**Utils**
> Utility 

**Validator**
> Validator use to validate data from user in

# modules
* Our App is Module base.In detail folder we create all module