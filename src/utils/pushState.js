const pushState = (path) => {
  history.pushState(null, null, `/#${path}`);
}

export default pushState;