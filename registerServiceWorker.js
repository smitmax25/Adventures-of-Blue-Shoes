// Service worker
const status = document.getElementById('offlineStatus')
const newVersion = document.getElementById('newVersion')
const update = document.getElementById('update')

const readyText = '✓ Ready'

const handleRegistration = registration => {
  if (registration.active) {
    status.innerText = readyText
    if (registration.waiting) {
      newVersion.classList.remove('hidden')
      update.onclick = () => {
        update.innerText = 'Updating...'
        registration.waiting.postMessage('skipWaiting')
      }
    }      
  } 
  if (registration.installing) {
    if (!registration.active) {
      status.innerText = 'Installing...'
    }
    registration.installing.addEventListener('statechange', e => {
      handleRegistration(registration)
    })
  }
  registration.addEventListener('updatefound', () => {
    handleRegistration(registration)
  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
    .then(registration => {
      handleRegistration(registration)
    })
    .catch(e => {
      console.error('Error registering service worker', e)
    })
  navigator.serviceWorker.addEventListener('message', e => {
          if (e.data === 'reload') {
            window.location.reload()
          }
        })
} else {
  status.innerText = 'Not supported by browser'
}