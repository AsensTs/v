const pushState = (path) => {
  history.pushState(null, null, `/#${path}/details`);
}

export default pushState;