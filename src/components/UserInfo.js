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

 setUserInfo (data) {
  this._name.textContent = data.profileName;
  this._description.textContent = data.profileDesccription;
 }
}