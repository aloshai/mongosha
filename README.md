# MONGOSHA
Mongosha is a simple to use database manager. It allows you to do your transactions in a very short way and all you have to do is specify path!

## Usage
Mongosha needs a link address as it is linked to MongoDB. In this case it is using 'DatabaseManager'.

> to download the package `npm i @aloshai/mongosha` or `yarn install @aloshai/mongosha` 

### Database

```js
class Database(name, collectionName?);
```
* `name`: is the key word. You have to write this in order to access the data.
* `collectionName`: If you don't want it to occur in the mongosha collection, you can name it a different collection.

#### Example Usage

```js
const {Database, DatabaseManager} = require("@aloshai/mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING");

const dbUsers = new Database("users");
const dbCoins = new Database("coins", "market"); // The second parameter is your collection name. The default name is mongosha.

```

**If the `returnData` param is true, it returns the updated data. If not, it returns the Update Query result.**
* `.set(path, value, returnData?)`: set the value to the path you specified.
    * `.set("user", {name: "Mert", lastname: "Yılmaz"})`
* `.get(path)`: Returns the value in the path you specified.
    * `.get("user")`
* `.add(path, value)`: Adds the value in the path you specified with the value parameter.
    * `.add("items.quality", 100)`
* `.sub(path, value)`: Subtracts the value in the path you specified with the value parameter.
    * `.sub("servers.quality", 100)`
* `.push(path, value, returnData?)`: Adds a new element to the array in the path you specified.
    * `.push("items", {name: "Sword", quality: 100})`
* `.pull(path, query, returnData?)`: Return an element from the array in the path you specified.
    * `.pull("items", {name: "Sword"})`
    * `.pull("items", {quality: {$gte: 70}}, name: "Sword")`
* `.delete(path)`: Deletes the path you specified directly.
* `.pullAll(path, value, returnData?)`: Pulls all elements of the value you specify from the Array.
* `.pushRange(path, array, returnData?)`: Inserts an array element from another array.
    * `.pushRange("items", ["Sword", "Shield"])`

### DatabaseManager

```js
const {DatabaseManager} = require("@aloshai/mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING");

const db = DatabaseManager.getDatabase("General");
```
* `.connect(connectionString)`: The address required to connect to mongodb.
* `.getDatabase(databaseName, collectionName?)`: It searches a database with the name you specified, if it doesn't exist, it creates and saves it to the list.
* `.createDatabase(databaseName, collectionName?)`: Creates and saves a database.

## QuickStart

```js
const mongosha = require("@aloshai/mongosha");

const client = mongosha.connect("MONGODB_CONNECTION_STRING");
const db = client.database("example_database");

const collection = db.collection("users");
const data = collection.data("user_id_0");

// set and delete
data.set("identify", { "name": "Mert", "surname": "Yılmaz" }); // => { "name": "Mert", "surname": "Yılmaz" }
data.set("wallet", { price: 1500 }); // => { price: 1500 }
data.set("adress", "Europe/Istanbul"); // => "Europe/Istanbul"
data.set("mail", "aloshai@aloshai.com"); // => "aloshai@aloshai.com"

data.delete("mail"); // => Promise<void>

// addition and subtraction 
data.add("wallet", 10); // => 1510
data.sub("wallet", 1000); // => 510

// array operations
data.push("inventory", "Sword"); // => "Sword"
data.pushRange("inventory", ["Shield", "Gum", "Gum", "Phone"]); // => ["Shield", "Gum", "Gum", "Phone"]
data.pushRange("favorite_numbers", [1, 2, 3, 4, 10, 5, 30, 6, 10]);

data.pull("inventory", "Sword"); // Promise<void>
data.pullAll("inventory", "Gum"); // Promise<void>

// sort
data.sort("favorite_numbers", "ASC"); // => [1, 2, 3, 4, 5, 6, 10, 10, 30]
data.sort("favorite_numbers", "DESC"); // => [30, 10, 10, 6, 5, 4, 3, 2, 1]

// has path any value?
data.has("wallet"); // => true
data.has("mail"); // => false
data.has("otherField"); // => false
```