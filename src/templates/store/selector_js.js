module.exports = () => {
  return `import { createSelector } from 'reselect'

const selectSomething = state => state.something

export const selectSomethingData = createSelector(
  selectSomething,
  something => something?.loading
)
`
}
