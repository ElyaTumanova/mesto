export class UserInfo {
 constructor (name, description) {
  this._name = name;
  this._description = description;
 }

 getUserInfo () {
  const profileUser = {
    profileName: this._name.textContent,
    profileDescripton: this._description.textContent
  }
  return profileUser;
 }

 setUserInfo () {
  const popupProfileName = document.querySelector('.profile-form__input_type_name');
  const popupProfileDescripton = document.querySelector('.profile-form__input_type_descripton');
  this._name.textContent = popupProfileName.value;
  this._description.textContent = popupProfileDescripton.value;
 }
}