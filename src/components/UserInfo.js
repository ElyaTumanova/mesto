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

 setUserInfo (userName,userDescription) {
  this._name.textContent = userName;
  this._description.textContent = userDescription;
 }
}