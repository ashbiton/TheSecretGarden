import { observable, computed, decorate, action, runInAction } from "mobx";
import { getAll } from "../utils/server_utils";

class Users {
    users = []
    
    async getUsers(){
        const usersArr =  await getAll("users");
        this.users = usersArr;
    }
}

decorate(Users,{
    users: observable,
    getUsers: action
})

export default new Users();