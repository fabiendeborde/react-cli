module.exports = (name) => {
  return JSON.stringify({
    main: `${name}.jsx`
  }, null, 2)
}
