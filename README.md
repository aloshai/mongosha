# MONGOSHA
Açıklama buraya.

## Kullanım
Açıklama

### Kod Örneği
Açıklama

```js
const {Database, DatabaseManager} = require("mongosha");
DatabaseManager.connect("MONGODB_CONNECTION_STRING"); // Local/Atlas

const db = new Database("members");

db.set("member", {name: "Mert", lastname: "Yılmaz"}); // => {name: "Mert", lastname: "Yılmaz"}
db.set("member", {lastname: "AHAAHA :d"}); // => {lastname: "AHAAHA :d"}

db.add("member.price", 100, true); // => {lastname: "AHAAHA :d", price: 100}
db.subtract("member.price", 25); // => {price: 75}

db.push("member.items", "Sword"); // => ["Sword"]
db.push("member.items", "Shield"); // => ["Sword", "Shield"]

db.pull("member.items", "Shield"); // => ["Sword"]
db.pull("member.items", "Sword"); // => []

db.get("member"); // => {lastname: "AHAAHA :d", price: 75, items: []}
db.get("member.name"); // => undefined

db.has("member"); // => true
db.has("memb4r"); // => false
```

## DatabaseManager
Açıklama

```js
const {DatabaseManager} = require("mongosha");

DatabaseManager.connect("MONGODB_CONNECTION_STRING"); // MongoDB Connection

let db = DatabaseManager.getDatabase("members");
db.set("member", {name: "mert", lastname: "yılmaz"});
```