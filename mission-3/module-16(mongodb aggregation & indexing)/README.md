### What is Aggregation?

Aggregation is a way of processing a large number of documents in a collection by means of passing them through **different stages**.

The stages make up what is known as a pipeline.

The stages in a pipeline can **filter, sort, group, reshape**, and **modify** documents that pass through the pipeline.

## 1. $match, $project aggregation stage

```tsx
// $match / find
db.test.aggregate([
  // stage-1
  { $match: { gender: "Male" }, age: { $lt: 30 } },
  // stage-2
  { project: { name: 1, age: 1, gender: 1 } },
]);
```

## 2. $addFields, $out, $merge aggregate stage

```tsx
// $addField will add a new field and didn't modify original document
db.test.aggregate([
	// stage-1
	{$match: {gender: "Male"}},
	// stage-2
	{$addFields: {course: "level-2", eduTech: "Programming Hero"}},
	// stage-3
	{project: {course: 1}}
])

// $out will add the field with new collection
db.test.aggregate([
	// stage-1
	{$match: {gender: "Male"}},
	// stage-2
	{$addFields: {course: "level-2", eduTech: "Programming Hero"}},
	// stage-3
	// {project: {course: 1}}
	// stage-4
	{**$out**: "course-students"}
])

// $merge with add in existing collection
db.test.aggregate([
	// stage-1
	{$match: {gender: "Male"}},
	// stage-2
	{$addFields: {course: "level-2", eduTech: "Programming Hero"}},
	// stage-3
	// {project: {course: 1}}
	// stage-4
	{**$merge**: "test"}
])
```

## 3. $group, $sum, $push aggregation stage

```tsx
// $group or summary queries for finding counts, max, min, avg, push
db.test.aggregate([
  // stage-1
  { $group: { _id: "$age" } },
]);

// $sum will show the total number of fields
db.test.aggregate([
  // stage-1
  { $group: { _id: "$address.country", count: { $sum: 1 } } },
]);

// $push -> will added a field
db.test.aggregate([
  // stage-1
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      newPeople: { $push: "$name" },
    },
  },
]);
// ROOT will show full document
db.test.aggregate([
  // stage-1
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      newPeople: { $push: "$$ROOT" },
    },
  },
  // stage-2
  { $project: { "fullDoc.name": 1, "fullDoc.email": 1, "fullDoc.phone": 1 } },
]);
```

## 4. More about $group & $project

```tsx
// $sum of salary field and find $max salary
db.test.aggregate([
	// stage-1
	{$group: {
		_id: null,
		totalSalary: {$sum: "$salary"},
		maxSalary: {$max: "$salary"},
		minSalary: {$min: "$salary"},
		avgSalary: {$avg: "$salary"}
	}}
	// stage-2
	{$project: {
		totalSalary: 1,
		maxSalary: 1,
		minSalary: "$minSalary",  // rename field from field filtering
		averageSalary: "$avgSalary",
		rangeBetweenMaxandMin: {$subtract: ["$maxSalary", "$minSalary"]}
	}}
])
```

## 5. $group with $unwind aggregation stage

```tsx
// separate groups from an array
db.test.aggregate([
  // stage-1
  { $unwind: "$friends" },
  // stage-2
  { $group: { _id: "$friends", count: { $sum: 1 } } },
]);

// age group people interest
db.test.aggregate([
  // stage-1
  { $unwind: "$interests" },
  // stage-2
  { $group: { _id: "$age", interestPerAge: { $push: "$interests" } } },
]);
```

## 6. $bucket, $sort, $limit aggregation stage

```tsx
// $bucket
db.test.aggregate([
	// stage-1
	{
		$bucket:
			groupBy: "$age",
			boundaries: [20, 40, 60, 80],
			default: "80 up peoples age",
			output: {
				count: {$sum: 1},
				peopleName: {$push: "$name"}  // name of peoples using array
			}
	}
])

// $sort & $limit
db.test.aggregate([
	// stage-1
	{
		$bucket:
			groupBy: "$age",
			boundaries: [20, 40, 60, 80],
			default: "80 up peoples age",
			output: {
				count: {$sum: 1},
				peopleName: {$push: "$name"}  // name of peoples using array
			}
	},
	// stage-2
	{
		$sort: {$count: -1}  // decending order
	},
	// stage-3
	{
		$limit: 2  // give us 2 documents
	},
	// stage-4
	{
		$project: {$count: 1}
	}
])
```

## 7. $facet, multiple pipeline aggregation stage

```tsx
// $facet will work on multiple array
db.test.aggregate([
  {
    $facet: {
      // pipeline-1
      friendsCount: [
        // stage-1
        { $unwind: "$friends" },
        // stage-2
        { $group: { _id: "$friends", count: { $sum: 1 } } },
      ],
      // pipeline-2
      educationCount: [
        // stage-1
        { $unwind: "$education" },
        // stage-2
        { $group: { _id: "$education", count: { $sum: 1 } } },
      ],
    },
  },
]);
```

## 8. $lookup stage, embedding vs referencing

```tsx
db.orders.aggregate([
  {
    $lookup: {
      from: "test",
      localField: "userId",
      foreignField: "_id",
      as: "userInfo",
    },
  },
]);
```

### Embedded

- One-to-One Relationships
- Frequent Reading Data
- Atomic Updates
- Reduced Network Overhead
- Small Data Size

### Referencing

- One-to-Many Relationships
- Many-to-Many
- Frequent Writing
- Big Data Size
- Scalability
- Flexibility

## 9. Indexing, COLLSCAN vs IXSCAN

```tsx
// IDHACK
db.test.find({ _id: ObjectId("39843948idjfdk099") }).explain("executionStats");

// COLLSCAN
db.test.find({ email: "example@mail.com" }).explain("executionStats");

// Indexing in email | IXSCAN
db.getCollection("massive-data").createIndex({ email: 1 });
```

## 10. Compound index and text index

```tsx
// delete an index
db.getCollection("massive-data").dropIndex({ email: 1 });

// compound index -> combine multiple fields indexing
// text index -> find partial words from fields
db.getCollection("massive-data").createIndex({ about: "text" });

db.getCollection("massive-data")
  .find({ $text: { $search: "dolor" } })
  .project({ about: 1 });
```
