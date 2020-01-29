import { observable, decorate, runInAction, action } from "mobx";
import { login, getSingle } from "../utils/server_utils";

class User {
    user = undefined;
    loginErrText = "";

    loginUser(userData, username) {
        this.loginErrText = "";
        login(userData).then(err => {
            if (err) {
                runInAction(() => { this.loginErrText = err })
            } else {
                getSingle("user", username).then(userObject => {
                    runInAction(() => {
                        this.user = userObject;
                    })
                })
            }
        })
    }

}

decorate(User, {
    user: observable,
    loginErrText: observable,
    login: action
})

export default new User();