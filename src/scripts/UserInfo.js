export class UserInfo {
  #username;
  #job;

  constructor({ username, job }) {
      this.#username = document.querySelector(username);
      this.#job = document.querySelector(job);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
      const userInfoProf = {
          username: this.#username.textContent,
          job: this.#job.textContent,
      };
      return userInfoProf;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
      this.#username.textContent = data.name;
      this.#job.textContent = data.about;
  }
}
