const load = (file) => {
    var src = document.createElement('script')
    src.setAttribute('type', 'module')
    src.setAttribute('src', file)
    document.getElementsByTagName('head')[0].appendChild(src)
}

load('./button.js')
