## 1. Validations in Mongoose

```tsx
// user.interface.ts
export interface IUser {
	firstName: string,
	lastName: string,
	age: number,
	email: string,
	password: string,
	role: 'user' | 'admin'
}

// user.model.ts -> minLenght, maxLength, min, max, uppercase, lowercase, unique
const userSchema = new Schema<IUser>({
	firstName: {type: String, required: true, trim: true, minLength: 3, maxLength: 10},
	lastName: {type: String, required: true, trim: true, minLength: 3, maxLength: 10},
	age: {type: Number, required: true, min: 18, max: 60},
	email: {type: String, required: true, unique: true, trim: true, lowercase: true},
	password: {type: String, required: true},
	role: {type: String, enum: ['user', 'admin'], uppercase: true, default: 'user'}
})

// user.controller.ts -> all routes and CRUD operatons here

// custom error message
lastName: {minLength: [3, 'Last name at least 3 charecters, got{VALUE}']},
age: {min: [18, 'Age must be at least 18, got {VALUE}']}
```

## 2. Making custom validations & 3rd party validator package

```tsx
// more built-in validators & custom validators
const userSchema = new Schema<IUser>({
	firstName: {required: [true, "Need First name"]},
	lastName: {},
	age: {},
	email: {unique: [true, 'Provide unique email address'],
		validate: {validator: function(value){
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
		},
			message: function(props){
				return `Email ${props.value} is not valid email`}
			}
		},
	password: {},
	role: {enum: {values: ["user", "admin"], message: 'Role is not valid, got{VALUE}'}}
})

// third party validators | npm i validators
email: {unique: [true, 'Provide unique email address'],
				validate: [validator.isEmail, "Invalid Email {VALUE}"]  // isEmail is a function
			},
```

## 3. Validate using Zod

```tsx
// npm i zod
// user.controller.ts -> add an extra layer from model which is connected with database
const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(), // not required
});

// create a user
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const body = req.body;
    const body = await CreateUserZodSchema.parseAsync(req.body);
    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
```

## 4. Embedding in Mongoose

```tsx
// user.interface.ts
// embedded schema
export interface IAddress {
  city: string;
  street: string;
  zip: number;
}
export interface IUser {
  address: IAddress;
}

// user.model.ts
const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
); // avoid creating another _id

const userSchema = new Schema<IUser>(
  {
    address: {
      type: addressSchema, // embedded schema
    },
  },
  { versionKey: false, timestamp: true }
);
```

## 5. Referencing and Population in Mongoose

```tsx
// notes.interface.ts
export interface INotes {
  // previous type
  user: Types.ObjectId;
}

// notes.model.ts
const notesSchema = new Schema({
  // previous schema
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// notes.controller.ts
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");

  res.status(201).json({
    success: true,
    message: "Note Found successfully",
    notes,
  });
});
```

## 6. Built-in and Custom Instance Methods in Mongoose

```tsx
// npm i bcryptjs

// user.interface.ts
export interface UserInterfaceMethods {
	hashPassword(password: string): string
}

// user.model.ts
const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>({
	// previous codes here
})

userSchema.method("hashPassord", async function(plainPassword: string){
	const password = await bcrypt.hash(plainPassword, 10);
	// this.password = password;
	this.save();
	return password;
})

// create a user using instance method -> 2 steps
usersRoutes.post('/create-user', async(req: Request, res: Response) => {
	try {
		const body = req.body;
		// const user = await User.create(body);

		const user = await new User(body);
		const password = await user.hashPassword(body.password);
		user.password = password;
		await user.save();

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user
		})
	} catch(error: any){
		console.log(error);
})
```

## 8. Built-in and Custom Static Methods in Mongoose

```tsx
// user.interface.ts
export interface UserInterfaceMethods {
	hashPassword(password: string): string
}
export interface UserStaticMethods extends Model<IUser>{
	hashPassword(password: string): string
}

// user.model.ts
const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
	// previous codes here
})

userSchema.method("hashPassord", async function(plainPassword: string){
	const password = await bcrypt.hash(plainPassword, 10);
	return password;
})
userSchema.static("hashPassord", async function(plainPassword: string){
	const password = await bcrypt.hash(plainPassword, 10);
	return password;
})

export const User = model<IUser, UserStaticMethods>("User", userSchema)

// user.controller.ts
usersRoutes.post('/create-user', async(req: Request, res: Response) => {
	try {
		const body = req.body;
		// using static method
		const password = await User.hashPassword(body.password);
		body.password = password;
		const user = await User.create(body);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user
		})
	} catch(error: any){
		console.log(error);
})
```

## 9. Middleware Pre and Post Hooks in Mongoose

```tsx
// user.model.ts
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("%s has been saved", doc._id); // saved userid
  next();
});
```

## 10. Query Middleware in Mongoose

```tsx
// user.model.ts -> for deleteing reference user and related notes
userSchema.pre("find", function (next) {
  next();
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next();
});
```

## 11. Filter, Sort, Skip, Limit in Mongoose

```tsx
usersRoutes.get("/", async (req: Request, res: Response) => {
  const userEmail = req.query.email ? req.query.email : "";
  let users = [];
  // filtering
  if (userEmail) {
    users = await User.find({ email: userEmail });
  } else {
    users = await User.find();
  }

  // sorting
  users = await User.find().sort({ email: "desc" }); // asc / ascending / decending
  // users = await User.find().sort({"email": 1})   // assending order

  // skip
  users = await User.find().skip(10);

  // limit
  users = await User.find().limit(5);

  res.status(201).json({
    success: true,
    message: "All users retrieved",
    users,
  });
});
```
