function throttle(fn, timer) {
  let prev = new Date();
  return function () {
    let now = new Date();
    if (now - prev > timer) {
      fn.apply(this, arguments)
      prev = new Date()
    }
  }
}

function debounce(fn, wait) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

/*
function throttle(fn, wait) {
	let pre = new Date();
	return function() {
		let now = new Date()
		if(pre - now > wait) {
			fn.apply(this, arguments)
			pre = new Date()
		}
	}
}
function debounce(fn, wait) {
	let timer = null;
	return function () {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(this,arguments)
		}, wait)
	}
}
*/
