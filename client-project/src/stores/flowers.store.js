import { observable, decorate, action, runInAction } from "mobx";
import { getAll } from "../utils/server_utils";

class Flowers {
    flowers = []
    
    getFlowers(){
        getAll("flowers").then(flowersArr => {
            runInAction(() => {
                this.flowers = flowersArr;
            })
        });
    }
}

decorate(Flowers,{
    flowers: observable,
    getFlowers: action
})

export default new Flowers();