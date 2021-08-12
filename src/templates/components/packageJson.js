module.exports = (name, extension) => {
  return JSON.stringify({
    main: `${name}.${extension}`
  }, null, 2)
}
