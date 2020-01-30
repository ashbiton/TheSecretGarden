import { observable, decorate, runInAction, action } from "mobx";
import { login, getSingle } from "../utils/server_utils";

class User {
    user = undefined;
    loginErrText = "";

    loginUser(userData, username, onSuccess) {
        this.loginErrText = "";
        login(userData).then(err => {
            if (err) {
                runInAction(() => { this.loginErrText = "username or password are wrong" });
            } else {
                getSingle("user", username).then(userObject => {
                    runInAction(() => {
                        this.user = userObject;
                        this.loginErrText = "Successfully Logged In!"
                    })
                    onSuccess();
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