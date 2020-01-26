import { observable, computed, decorate } from "mobx";

class User {
    user = {};
    decorate(User,{
        user: observable
    })
}