export class UserInfo {
 constructor (name, description, link) {
  this._name = name;
  this._description = description;
  this._link = link;
 }

 getUserInfo () {
  const profileUser = {
    profileName: this._name.textContent,
    profileDescripton: this._description.textContent
  }
  return profileUser;
 }

 setUserInfo (data) {
  this._name.textContent = data.profileName;
  this._description.textContent = data.profileDesccription;
  this._link.src = data.profileAvatar;
 }

 updateUserAvatar (link) {
  this._link.src = link;
 }

 updateUserInfo (data) {
  this._name.textContent = data.profileName;
  this._description.textContent = data.profileDesccription;
 }
}