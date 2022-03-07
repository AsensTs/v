const setClassName = (dom, str) => {
  let className = dom.className;
  let arr = className.split(' ');
  if (arr.indexOf(str) !== -1) {
    return;
  } else {
    dom.className = className.trim() + ' ' + str;
  }
}

const delClassName = (dom, str) =>  {
  let className = dom.className;
  let arr = className.split(' ');
  if (arr.indexOf(str) !== -1) {
    dom.className = className.replace(str, '').trim();
  }
}

const suffix = (str) => {
  let tmpStr = str;
  if (typeof tmpStr !== 'string') console.error('stringType() function parameters is not string');
  tmpStr = tmpStr.trim();

  if (tmpStr.lastIndexOf('.') !== -1) {
    let tmpSuffix = tmpStr.slice(tmpStr.lastIndexOf('.')+1);
    return tmpSuffix;
  } else {
    return "";
  }
}

export {
  setClassName,
  delClassName,
  suffix
}