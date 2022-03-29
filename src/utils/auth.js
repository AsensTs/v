/**
 * https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day js-cookie
 * Controls login and logout
*/
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: new Date(new Date().getTime() + 3 * 60 * 60 * 1000)})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
