export class UserInfo {
  constructor(nameUserSelector, professionUserSelector) {
    this._nameUserElement = document.querySelector(nameUserSelector);
    this._professionUserElement = document.querySelector(
      professionUserSelector
    );
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
  };
}
