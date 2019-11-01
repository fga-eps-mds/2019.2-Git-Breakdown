const load = (file, type_) => {
    let src = document.createElement('script')
    src.setAttribute('type', type_)
    src.setAttribute('src', file)
    document.getElementsByTagName('head')[0].appendChild(src)
    if (file === './Chart.min.js')
        console.log("loading chartjs!")
}

load('./button.js', 'module')
load('./screen.js', 'module')
load('./popup.js', 'module')
load('./Chart.min.js', 'text/javascript')