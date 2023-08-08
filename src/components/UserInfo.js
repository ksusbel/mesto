export class UserInfo {
 
  constructor({ username, job }) {
      this._username = document.querySelector(username);
      this._job = document.querySelector(job);
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
  setUserInfo(data) {
      this._username.textContent = data.name;
      this._job.textContent = data.about;
  }
}
