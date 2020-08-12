module.exports = (name, style) => {
  let extension
  switch (style) {
    case 'css':
      extension = 'css'
      break
    case 'scss':
      extension = 'scss'
      break
    case 'sass':
      extension = 'sass'
      break
    default:
      extension = 'style.js'
      break
  }
  return `// import {} from './${name}.${extension}'`
}
