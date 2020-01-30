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

    checkFlowerExist(flowerName){
        let flowerWithSameName = this.flowers.find((flower) => flower.name.toLowerCase() === flowerName.toLowerCase());
        return flowerWithSameName != undefined;
    }

}

decorate(Flowers,{
    flowers: observable,
    getFlowers: action,
    checkFlowerExist: action

})

export default new Flowers();