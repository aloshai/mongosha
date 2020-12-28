# MONGOSHA

Mongosha is a simple to use database manager. It allows you to do your transactions in a very short way and all you have to do is specify path!

## Usage

Mongosha needs a link address as it is linked to MongoDB. In this case it is using 'DatabaseManager'.

> to download the package `npm i @aloshai/mongosha` or `yarn install @aloshai/mongosha`

### Database

```js
const { Database, DatabaseManager } = require("@aloshai/mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING");

const db = new Database("General");
```

**If the `returnData` param is true, it returns the updated data. If not, it returns the Update Query result.**

-   `.set(path, value, returnData?)`: set the value to the path you specified.
    -   `.set("user", {name: "Mert", lastname: "Yılmaz"})`
-   `.get(path)`: Returns the value in the path you specified.
    -   `.get("user")`
-   `.add(path, value)`: Adds the value in the path you specified with the value parameter.
    -   `.add("items.quality", 100)`
-   `.sub(path, value)`: Subtracts the value in the path you specified with the value parameter.
    -   `.sub("servers.quality", 100)`
-   `.push(path, value, returnData?)`: Adds a new element to the array in the path you specified.
    -   `.push("items", {name: "Sword", quality: 100})`
-   `.pull(path, query, returnData?)`: Return an element from the array in the path you specified.
    -   `.pull("items", {name: "Sword"})`
    -   `.pull("items", {quality: {$gte: 70}}, name: "Sword")`

### DatabaseManager

```js
const { DatabaseManager } = require("@aloshai/mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING");

const db = DatabaseManager.getDatabases("General");
```

-   `.connect(connectionString)`: The address required to connect to mongodb.
-   `.getDatabases(databaseName)`: It searches a database with the name you specified, if it doesn't exist, it creates and saves it to the list.
-   `.createDatabase(databaseName)`: Creates and saves a database.

## QuickStart

You can understand how it works by reading the examples below.

### Example #1

You will see how we manage it by creating a database class and return values.

```js
const { Database, DatabaseManager } = require("@aloshai/mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING"); // Local/Atlas Connection String

const db = new Database("members"); // We are creating a new field

// Set Operation
db.set("member", { name: "Mert", lastname: "Yılmaz" }); // => Returns the result of the update query.
db.set("member", { lastname: "AHAAHA :d" }, true); // => {lastname: "AHAAHA :d"}

// addition and subtraction to field
db.add("member.price", 100, true); // => 100
db.add("member.price", 100); // => Returns the result of the update query.
db.sub("member.price", 25, true); // => 75
db.sub("member.price", 25); // => Returns the result of the update query.

// Array Operations
db.push("member.items", "Sword"); // =>
db.push("member.items", "Shield", true); // => ["Sword", "Shield"]

db.pull("member.items", "Shield", true); // => ["Sword"]
db.pull("member.items", "Sword"); // => Returns the result of the update query.

// Get Operation
db.get("member"); // => {lastname: "AHAAHA :d", price: 175, items: []}
db.get("member.name"); // => undefined

// Has Operation
db.has("member"); // => true
db.has("memb4r"); // => false
```

## Example #2

It may be annoying to create classes constantly. In this case, you can use the class that is currently registered somewhere in memory.

```js
const { DatabaseManager } = require("@aloshai/mongosha");

DatabaseManager.connect("MONGODB_CONNECTION_STRING"); // Local/Atlas Connection String

let serverdb = DatabaseManager.getDatabase("servers"); // Returns any 'Database'
serverdb.set("TR_Server", { region: "Asia" });
serverdb.set("EN_Server", { region: "Europe" });

let userdb = DatabaseManager.getDatabase("users"); // Returns any 'Database'
userdb.set("user_1", { server: "TR_Server" });
userdb.set("user_2", { server: "EN_Server" });
```

## Template

```js
const express = require("express");
const app = express();
const { DatabaseManager, Database } = require("@aloshai/mongosha");

const users = new Database("users");

app.post("/create/:id/:name/:lastname", async (req, res) => {
	await users.set(`${id}`, {
		name: req.params.name,
		lastname: req.params.lastname,
	});
	res.end();
});

app.get("/", async (req, res) => {
	let data = await users.get();
	res.send(data);
});

app.listen(80, async () => {
	DatabaseManager.connect("MONGODB_CONNECTION_STRING");
});
```

## Template #2

```js
const express = require("express");
const app = express();
const { DatabaseManager } = require("@aloshai/mongosha");

const users = DatabaseManager.getDatabases("users");

app.post("/create/:id/:name/:lastname", async (req, res) => {
	await users.set(`${id}`, {
		name: req.params.name,
		lastname: req.params.lastname,
	});
	res.end();
});

app.get("/", async (req, res) => {
	let data = await users.get();
	res.send(data);
});

app.listen(80, async () => {
	DatabaseManager.connect("MONGODB_CONNECTION_STRING");
});
```

# `Discord Alosha#3779`
