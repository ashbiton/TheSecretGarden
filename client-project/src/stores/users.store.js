import { observable, decorate, action, runInAction, extendObservable } from "mobx";
import { getAll, deleteUser } from "../utils/server_utils";
let autoNumber = 0;

function User(userData) {
    this.id = userData._id; // UUID for this article
    extendObservable(this,
        {
            ...userData,
            edit: function (newData) {
                Object.keys(this).map((key) => {
                    if (newData[key] && newData[key] != this[key]) {
                        this[key] = newData[key]
                    }
                })
            }
        },
        {
            edit: action
        });
}

function PositionEntry(positionData) {
    this.id = ++autoNumber; // UUID for this entry
    this.users = positionData ? positionData.users.map((user) => new User(user)) : [];
    extendObservable(this,
        {
            ...positionData,
            deleteUser: function (username) {
                var existingEntry = this.users.find(function (entry) {
                    return entry.username === username;
                });
                if (existingEntry) {
                    this.users.splice(this.users.indexOf(existingEntry), 1)
                }
            }
        },
        {
            users: observable,
            deleteUser: action
        });

}
class Users {
    users = []

    async getUsers() {
        const usersArr = await getAll("users");
        this.users = usersArr.map(position => new PositionEntry(position))
    }
}

decorate(Users, {
    users: observable,
    getUsers: action,
    deleteUser: action
})

export default new Users();