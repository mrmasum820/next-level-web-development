## 1. MongoDB Compass

```tsx
// install mongodb download
show dbs
use practice  // create and switch database
db.createCollection("test")
db.getCollection("test").insertOne({name: "Next Level Web Development"})
db.getCollection("test").find()

// install mongodb shell, add path mongodb -> server -> bin in env and run cmd
mongod --version
mongosh

// install "no sql booster" for graphical ui
```

## 2. Insert, insertOne, find, findOne, field filtering, project

```tsx
db.test.insertOne({ name: "something" });
db.test.insertOne([
  { name: "Complete Web Dev" },
  { name: "Next Level Web Dev" },
]);

db.test.find({});
db.test.findOne({ age: 17 }); // filter age / company data
db.test.findOne({ gender: "Male" }, { name: 1, email: 1, gender: 1 }); // field filtering
// project only used find method
db.test.find({ gender: "Male" }).project({ name: 1, gender: 1 });
```

## 3. MongoDB Operators

```tsx
// compartison queryt operators
// $eq -> equal
db.test.findOne({ gender: { $eq: "Male" } });

// $ne -> not equal / any
db.test.findOne({ age: { $ne: 12 } });

// $gt -> greater than | $gte -> greater than and equal
db.test.find({ age: { $gt: 12 } });
db.test.find({ age: { $gte: 30 } }).sort({ age: 1 }); // 1 -> assending

// $lt -> less than | $lte -> less than and equal
db.test.find({ age: { $lt: 30 } }).sort({ age: 1 });
```

## 4. $in, $nin, implicit and condition

```tsx
// $gte & $lte(implicit and)
db.test.find({gender:{"Female"},age:{$gte: 18,$lte: 30}},{age:1, gender:1}).sort({age: 1})

// $in -> between
db.test.find({gender:{"Female"},age:{$in: [18, 30]}},{age:1, gender:1}).sort({age: 1})

// $nin -> opposite $in
db.test.find({
	gender:{"Female"},age:{$nin: [18,24, 28]},
	interests: {$in: ["Cooking", "Gaming]}
	},
	{age:1, gender:1, interests: 1}).sort({age: 1})
```

## 5. $and, $or, implicit vs explicit

```tsx
// logical query operators
// explicit and | age without 15 and age under 30
db.test
  .find({
    $and: [{ gender: "Female" }, { age: { $ne: 15 } }, { age: { $lte: 30 } }],
  })
  .project({ age: 1, gender: 1 })
  .sort({ age: 1 });

// explicit $or
db.test
  .find({ $or: [{ interestes: "Cooking" }, { interests: "Traveling" }] })
  .project({ interests: 1 })
  .sort({ age: 1 });
db.test
  .find({
    $and: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "PHYTHON" }],
  })
  .project({ skills: 1 });

// implicit $or
db.test
  .find({ "skills.name": { $in: ["JAVASCRIPT", "PYTHON"] } })
  .project({ skills: 1 });
```

## 6. $exists, $type, $size

```tsx
// element query operators
db.test.find({ phone: { $exists: false } }); // if missing the phone fields

// $type -> show the type
db.test.find({ age: { $type: "string" } });

// array query operators $size -> works on array size
db.test.find({ friends: { $size: 4 } }).project({ friends: 1 });
db.test.find({ friends: { $size: 4 } }).project({ friends: 1 });

// specific types of field
db.test.find({ company: { $type: "null" } }).project({ company: 1 });
```

## 7. $all, $elemMatch

```tsx
// find array
db.test.find({interests.: "Cooking"}).project({interests: 1})
db.test.find({"interests.2": "Cooking"}).project({interests: 1})  // 2nd index
db.test.find({interests: ["Cooking", "Writing"]}).project({interests: 1})  // exact match
// $all
db.test.find({interests: {$all: ["Cooking", "Writing"]}}).project({interests: 1})

// find object
db.test.find({"skills.name": "JAVASCRIPT"}).project({skills: 1})
// $elemMatch
db.test.find({skills: { $elemMatch: {name: "JAVASCRIPT", level: "Intermediate"}}).project({skills: 1})
```

## 8. $set, $addToSet, $push

```tsx
// update operators -> $set
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $set: { age: 80 } }
);

// array update operator -> $addToSet
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $addToSet: { interests: "Gaming" } }
);
// $each if we use two values
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $addToSet: { interests: { $each: ["Cooking", "Driving"] } } }
);

// $push -> duplicate value if exists
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $push: { interests: { $each: ["Cooking", "Driving"] } } }
);
```

## 9. $unset, $pop, $pullAll

```tsx
// field update operators -> if delete a field
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$unset: {birthday: ""}})

// remove last element from an filed array
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$pop: {friends: 1}})
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$pop: {friends: -1}}) // remove first element

// pull a specific element
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$pull: {friends: "MR Masum"}})
// remove from an array elements
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$pullAll: {friends: "MR Masum", "MH Shawan"}})
db.test.updateOne({_id: ObjectId("8343948ajdfjdk99345")}, {$pullAll: {interests: ["Cooking", "Driving"], ["Gaming"]}})
```

## 10. More about $set, delete document and drop collection

```tsx
// update an object
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $set: { "address.city": "Dhaka" } }
);
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $set: { "address.city": "Dhaka", "address.county": "Bangladesh" } }
);

// update array of object using positional opeartor
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345"), "education.major": "Biology" },
  { $set: { "education.$.major": "CSE" } }
);

// increment a field
db.test.updateOne(
  { _id: ObjectId("8343948ajdfjdk99345") },
  { $inc: { age: 1 } }
);

// delete a document
db.test.deleteOne({ _id: ObjectId("8343948ajdfjdk99345") });

// delete a collection
db.posts.collection.drop({ writeConcern: { 2: 1 } });
```
