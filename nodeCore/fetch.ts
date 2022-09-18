/* Build in fetch from 17.5 Node */

async function networkTricks() {
  fetch('someurl', {method: 'GET', body: JSON.stringify({a: 1})})
    .then(r => {
      return r.text();
    })
    .then(respBody => console.log(respBody))
    .catch(err => console.log(err))
}
