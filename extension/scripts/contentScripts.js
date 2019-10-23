const load = (file) => {
    let src = document.createElement('script')
    src.setAttribute('type', 'module')
    src.setAttribute('src', file)
    document.getElementsByTagName('head')[0].appendChild(src)
}

//console.log('1-load(button)')
load('./button.js')
//console.log("5-load(screen)")
load('./screen.js')