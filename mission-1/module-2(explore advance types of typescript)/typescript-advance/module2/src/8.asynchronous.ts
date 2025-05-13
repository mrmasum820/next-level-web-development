// Promise -> resolve, reject

type DataType = { name: string; age: number };

const createPromise = (): Promise<DataType> => {
  return new Promise<DataType>((resolve, reject) => {
    const data: DataType = { name: "John", age: 30 };
    if (data) {
      resolve(data);
    } else {
      reject("Data not found");
    }
  });
};

const getData = async (): Promise<DataType> => {
  const data: DataType = await createPromise();
  return data;
  //   console.log(data);
};

// getData();

// fetch data from api

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
const getTodo = async (): Promise<Todo> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  return data;
  //   console.log(data);
};

getTodo();
