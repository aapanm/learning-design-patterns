# Adaper Pattern

N.B The following document is influenced by following this [article](https://deeprnd.medium.com/javascript-adapter-design-pattern-9652122c159d)

Adapter pattern is a design pattern that allows incompitable classes to work together by converting the interface of one class into another interface that client expect.
Three components that are necessary to implement this desing pattern are:

1. [Target](#target)
2. [Adaptee](#adaptee)
3. [Adapter](#adapter)

We will discuss the above components as we walk through with [example](code.js) written in jS.

## Target <a name="target"></a>

Let's consider a situation where our client wants to get data which is fetched via some data manager. For the sake of discussion we will consider this data manager as old data manager because soon the class is going to be updated and we will use adapter to adapt with the new data manager.

```js
//data manager class
class OldDataManager {
  constructor() {}

  getData() {
    return "Data from old data manager";
  }
}
```

The above class has a method `getData()` which is used by our client to fetch data.

```js
//client class
class Client {
  constructor(dataManager) {
    this.data = dataManager.getData();
  }
}
```

In our main file we initiate the client class and get data as following:

```js
const dataManger = new OldDataManager();
const client = new Client(dataManager);
console.log(client.data);
```

So, in this case our client is expecting a data manager class with a method called `getData()`. As, we are going to intorduce adpater pattern to adapt with our new data manager class, this old data manager is our target that client expects to work with.

## Adaptee <a name="adaptee"></a>

Now let's say, for some reason out data manager has changed and it does not have any method called `getData()`, instead, to fetch data it uses `fetchData()` method.

```js
class NewDataManager {
  constructor() {}

  fetchData() {
    return "Data from new data manager";
  }
}
```

To fix this, one solution could be we go through all the client classes where the `getData()` method is called and change it to `fetchData()`. In this, tiny example the way seems too easy, but for a large scale application where the method has been called multiple times, this could potentially lead to alot of errors and bugs. To solve this, we will use the adapter pattern to adapt our `NewDataManager` class, so that we dont have to change inside our client codes, hence we call this `NewDataManager` class the adaptee class.

## Adapter <a name="adapter"></a>

In this adapter class we do nothing fancy. We just take the `fetchData()` method and change it to `getData()`, thats it. Simply this the job of our adapter class, that adapts the adaptee to match with target.

```js
class DataAdapter {
  constructor() {
    const dm = new NewDataManager();
    this.getData = function () {
      return dm.fetchData();
    };
  }
}
```

Now, we just send this adapater class as the data manager into client class and everything should work fine.

```js
const adapter = new DataAdapter();
const client = new Client(adapter);
console.log(client.data);
```

# Limitations

1. The Adapter pattern can lead to increased complexity if used excessively or inappropriately.
2. It might introduce a slight performance overhead due to the additional indirection introduced by the adapter.
3. It requires careful consideration of the design to ensure that the adapters are used consistently and appropriately.
