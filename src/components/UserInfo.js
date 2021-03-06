export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent, avatar: this._avatar.src }
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }

  updateUserInfo({ name, about}) {
    this._name.textContent = name;
    this._avatar.alt = name;
    this._about.textContent = about;
  }

  updateImage({avatar}) {
    this._avatar.src = avatar;
  }
}
