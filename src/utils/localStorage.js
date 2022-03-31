
/**
 * @param {*} str  common/username
 * @returns 
 */ 
const getStorage = (str) => {
  let value = '';
  let vuex = JSON.parse(localStorage.getItem('vuex'));
  if (vuex == null) {
    return "";
  }

  if (str.indexOf('/') !== -1) {
    let arr = str.split('/');
    arr.forEach( item => {
      if (vuex[item] == undefined) {
        console.error('Parameter error: ' + item, " The getStorage parameter is incorrect, Use the correct parameters; Example: 'common/username'");
      }
      vuex = vuex[item]
    })
    value = vuex;
  } else {
    console.error("Parameter error: The getStorage parameter is incorrect, Use the correct parameters; parameters: 'common/username'");
    return ""
  }
  return value;
}

export {
  getStorage
}