let appContainer = null

export const bootstrap = async function() {
  console.log("bootstrap")
}

export const mount = async function() {
  console.log("mount")
  appContainer = document.createElement("div")
  appContainer.id = "root"
  appContainer.innerHTML = "Hello MicroFE"
  document.body.appendChild(appContainer)
}

export const unmount = async function() {
  console.log("unmount")
  document.body.removeChild(appContainer)
}