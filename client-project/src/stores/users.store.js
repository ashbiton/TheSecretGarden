import { observable, computed, decorate } from "mobx";
const { getAll } = require('../../utils/server_utils');

class Users {
    users = [];
    isLoading = false;

    getUsers(){
        this.isLoading = true;
        getAll('users').then(users => {
            this.users = users;
            this.isLoading = false;
        });
    }
    decorate(Users,{
        users: observable,
        isLoading: observable
    })
}