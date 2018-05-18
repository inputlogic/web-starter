export const runSerial = (tasks) => new Promise((resolve, reject) => {
  const results = []
  const getResult = (prev, task) =>
    prev
      .then(() => task())
      .then(result => {
        results.push(result)
        return result
      })
      .catch(err => reject(err))
  tasks
    .reduce(getResult, Promise.resolve())
    .then(() => resolve(results))
    .catch(err => reject(err))
})

export default runSerial
