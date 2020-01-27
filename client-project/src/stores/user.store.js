import { observable, computed, decorate } from "mobx";

class User {
    user = {
        username: "Shalva"
    };

}

decorate(User,{
    user: observable
})

export default new User();