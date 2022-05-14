
const defaultCallBack = () => console.log("ABORT FETCH")

class Controller{
  now = null

  _create(cb){
    this.now = new AbortController()
    this.now.signal.addEventListener('abort', cb)
  }

  constructor() {
    this._create(defaultCallBack)
  }

  createNew(cb = defaultCallBack){
    try{
      if(typeof cb !== "function") throw Error("CONTROLLER: arg != function")
      this._create(cb)
    }catch (err){
      console.error(err.message)
    }
  }




  abort(){
    try{
      this.now.abort()
      this.createNew()
    }catch (e){
      console.log(e.message)
    }

  }

  getSignal(){

  }


}


export default new Controller();