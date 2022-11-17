/**
 * 
 * @param {*} email 
 * @returns true if email have invalide format else return false
 */
export const inputEmailFormatInvalide = (email) =>
{
  if(!email.match("^([A-Za-z0-9_\\-\\.]+)@([A-Za-z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")) {
    return true
  } else {
    return false
  }
}