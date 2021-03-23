# MONGOSHA
Mongosha is a simple to use database manager. It allows you to do your transactions in a very short way and all you have to do is specify path!

## Installation
Download the package `npm i mongosha` or `yarn install mongosha` 

## Quickstart

```js
const { Mongosha } = require("mongosha");

const client = await Mongosha.connect("MONGODB_CONNECTION_STRING");
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
data.subtract("wallet", 1000); // => 510

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

# API Documentation
Here are our APIs.

* **Mongosha**
* **Client**
* **Database**
* **Collection**
* **Data**

## Mongosha
Mongosha is a model. Use Mongosha like this.

```js
var { Mongosha } = require("mongosha");

const options = {
    useUnifiedTopology: true
};

// We connect to a new address:
const client = Mongosha.connect("mongodb://localhost:27017", options);
```

### API References
* `.connect(url, options?): Promise<void>`: Creates a new client.

## Client
Client is a class. Use Client like this.

```js
const client = Mongosha.connect(url, options);

// To create a database:
var database = client.database("my_good_database"); // => Returns new 'Database' class template

// To drop:
client.dropDatabase("my_bad_database"); // => Promise<void>
```

### API References
* `.database(databaseName): Database`: If database does not exists, creates database then returns the database. Otherwise just returns database.
* `.dropDatabase(databaseName): Promise<void>`: Drops the Database.

## Database
Database is a class. Use Database like this.

```js
var database = client.database("my_good_database");

// To create a collection:
var collection = database.collection("my_users"); // => Returns new 'Collection' class template

// To Drop:
database.dropCollection("my_bad_users"); // => Promise<void>
```

### API References
* `.collection(databaseName): Collection`: If collection does not exists, creates collection then returns the collection. Otherwise just returns collection.
* `.dropCollection(databaseName): Promise<void>`: Drops the Collection.

## Collection
Collection is a class. Use Collection like this.

```js
var collection = database.collection("my_users");

// Created a data named user_0. Here user_0 is a key. Here you can enter a user-specific ID or something else.
var data = collection.data("user_0"); // => Returns new 'Data' class template

// Have assigned a value of 'Alosha' to the 'nickname' field of all the data in the collection.
collection.set("nickname", "Alosha");

// The 'notes' field has been removed for all data in the collection.
collection.delete("notes");

// Added 500 to the 'score' field of all the data in the collection.
collection.add("score", 500);

// Subtracted 500 from the 'score' field for all data in the collection.
collection.subtract("score", 250);

// 'Gum' has been pushed to the 'items' field for all data in the collection.
collection.push("items", "Gum");

// 'Gum' and 'Axe' has been pushed to the 'items' field for all data in the collection.
collection.pushRange("items", ["Gum", "Axe"]);

// 'Axe' is pulled from 'items' field for all data in the collection.
collection.pull("items", "Axe");
```

### API References
* `.set(path, value): Promise<UpdateWriteOpResult>`: In all data, the value assigns to the specified path.
* `.delete(path): Promise<UpdateWriteOpResult>`: Removes the specified path in all data.
* `.add(path, value): Promise<UpdateWriteOpResult>`: Performs mathematical addition for the specified path in all data.
* `.subtract(path, value): Promise<UpdateWriteOpResult>`: Performs mathematical subtraction for the specified path in all data.
* `.push(path, value): Promise<UpdateWriteOpResult>`: In all data, an array element is added to the specified path.
* `.pushRange(path, values): Promise<UpdateWriteOpResult>`: In all data, more than one array element is added to the specified path.
* `.pull(path, value): Promise<UpdateWriteOpResult>`: It extracts one or more elements from the specified path in all data.
* `.sort(path, orderType, limit?)`: Sorts all data in descending or ascending order based on the value in the specified path.

## Data
Data is a class. You can use like it this:

```js
var data = collection.data("user_0");

// Assigns the value 'Mongosha' to the specified path.
data.set("name", "Mongosha");

// Assigns the object `{ id: 500, phone: "+123456789" }` to the specified path.
data.set("identify", { id: 500, phone: "+123456789" });

// Assigns the value '499' to the specified path.
data.set("identify.id", 499);

// Assigns the value 0 to the specified path.
data.set("wallet", 0);

// Get the value in path "name".
data.get("name"); // => "Mongosha"

// Get the value in path "identify".
data.get("identify"); // => { id: 400, phone: "+123456789" }

// Get the value in path "identify.id".
data.get("identify.id"); // => 400

// Check if Field exists to specified path.
data.has("identify"); // => true

// Mathematical addition to the "wallet" path.
data.add("wallet", 100);

// Mathematical substract to the "wallet" path.
data.subtract("wallet", 25);

// Added a "Gum" array element to the "inventory" path.
data.push("inventory", "Gum");

// Added an "Ax", "Backpack", "Pencil" and "Gum" array elements to the "Inventory" path.
data.pushRange("inventory", ["Axe", "Backpack", "Pencil", "Gum"]);

// Pulled an element from array in the specified path.
data.pull("inventory", "Axe");

// Pulled all items with the same value from the array in the specified path.
data.pullAll("inventory", "Gum");

// We add numbers for sorting:
data.pushRange("numbers", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Sorted the array in the specified path in descending order.
data.sort("numbers", "DESC"); // => [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// Sorted the array in the specified path in ascending order.
data.sort("numbers", "ASC", 6); // => [1, 2, 3, 4, 5, 6]
```

### API References
* `.set(path, value): Promise<any>`: Check if Field exists to specified path.
* `.get(path, value): Promise<any>`: Returns the value/object at the specified path.
* `.has(path): Promise<Boolean>`: Check if Field exists to specified path.
* `.add(path, value): Promise<Number>`: Do mathematical addition to specified path.
* `.subtract(path, value): Promise<Number>`: Do mathematical subtraction to specified path.
* `.push(path, value): Promise<void>`: Push to value an array to specified path.
* `.pushRange(path, values): Promise<void>`: Push to multiple values an array to specified path.
* `.pull(path, value): Promise<void>`: Extract element from Array to specified path.
* `.pullAll(path, values): Promise<void>`: Extract all elements from Array to specified path.
* `.sort(path, orderType, limit?): Promise<any[]>`: Sorts the array/values ​​in path.

# Contact
[Discord](https://discord.gg/V77h5M4kqB)