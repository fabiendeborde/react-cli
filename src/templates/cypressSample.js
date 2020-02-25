module.exports = (name) => {
  return `
describe('My First Test inside ${name}', function () {
  it('Does not do much!', function () {
    expect(true).to.equal(true)
  })
})
  `
}
