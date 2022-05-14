
class DatabaseAPI{


  async getAllWorks(){
    const res = await fetch("https://mylib-e19e9-default-rtdb.europe-west1.firebasedatabase.app/data/works/all.json")
    return res.json()
  }

  async setWorks(body){
    const res = await fetch("https://mylib-e19e9-default-rtdb.europe-west1.firebasedatabase.app/data/works/all.json", {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body,
    })
    return res.json()
  }

}


export default new DatabaseAPI()