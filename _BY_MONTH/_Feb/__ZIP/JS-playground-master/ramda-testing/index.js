import { __, curry } from 'ramda'

console.log('bye')

const matches = (event, id) => event.target.matches(id)

const curriedFetch = curry(fetch)
const headers = {
  'Content-Type': 'application/json',
}
const fetchGet = curriedFetch(__, { method: 'GET', headers })
console.log(fetchGet)
const fetchPost = curriedFetch(__, { method: 'POST', headers })

document.addEventListener('click', async event => {
  const matchesId = curry(matches)(event)
  if (matchesId('#ramda-fetch')) {
    fetchGet('https://icanhazdadjoke.com/')
      .then(res => res.json())
      .then(json => (document.getElementById('joke').innerText = json.joke))
  }
})
