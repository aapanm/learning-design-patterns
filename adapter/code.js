class OldDataManager {
  constructor() {}

  getData() {
    return "Data from old data manager";
  }
}

class NewDataManager {
  constructor() {}

  fetchData() {
    return "Data from new data manager";
  }
}

class Client {
  constructor(dataManager) {
    this.data = dataManager.getData();
  }
}

class DataAdapter {
  constructor() {
    const dm = new NewDataManager();
    this.getData = function () {
      return dm.fetchData();
    };
  }
}

const dataManger = new OldDataManager();
const adapter = new DataAdapter();
const client = new Client(adapter);
console.log(client.data);
