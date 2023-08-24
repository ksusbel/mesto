export class UserInfo {
    constructor({ username, job, avatar }) {
        this._username = document.querySelector(username);
        this._job = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
    }

    // возвращает объект с данными пользователя
    getUserInfo() {
        const userInfoProf = {
            username: this._username.textContent,
            job: this._job.textContent,
        };
        return userInfoProf;
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(userInfoProf) {
        if (userInfoProf.name) {
            this._username.textContent = userInfoProf.name;
        }
        if (userInfoProf.about) {
            this._job.textContent = userInfoProf.about;
        }
    }

    setUserAvatar(data) {
        if (data.avatar) {
            this._avatar.src = data.avatar;
        }
    }
}
