const setClassName = (dom, str) => {
  let className = dom.className;
  let arr = className.split(' ');
  if (arr.indexOf(str) !== -1) {
    return;
  } else {
    dom.className = className + ' ' + str;
  }
}

const delClassName = (dom, str) =>  {
  let className = dom.className;
  let arr = className.split(' ');
  if (arr.indexOf(str) !== -1) {
    dom.className = className.replace(str, '')
  }
}

export {
  setClassName,
  delClassName
}