export class UserInfo {
  constructor(nameUserSelector, professionUserSelector, avatarUserSelector) {
    this._nameUserElement = document.querySelector(nameUserSelector);
    this._professionUserElement = document.querySelector(
      professionUserSelector
    );
    this._avatarUserElement = document.querySelector(avatarUserSelector);
  }

  getUserInfo() {
    return {
      name: this._nameUserElement.textContent,
      profession: this._professionUserElement.textContent,
    };
  }

  setUserInfo = (data) => {
    this._nameUserElement.textContent = data.name;
    this._professionUserElement.textContent = data.profession;
    this._avatarUserElement.src = data.avatar;
  };
}
