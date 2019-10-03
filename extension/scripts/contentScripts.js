
const load = (file) => {
    console.log(`:SYS: load(${file})`)
    var src = document.createElement('script')
    src.setAttribute('type', 'Module')
    src.setAttribute('src', file)
    document.getElementsByTagName('head')[0].appendChild(src)
}

//The first routine necessary to start the app: load the button
load('./button.js')


