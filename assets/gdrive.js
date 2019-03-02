const proc = function() {
    const elements = document.querySelectorAll("img[data-gdrive]")
    for (const e of elements) {
        const gdrive = e.getAttribute('data-gdrive');
        e.removeAttribute('data-gdrive');
        e.setAttribute('src', 'https://drive.google.com/uc?export=view&id=' + gdrive);
    }
}

if (document.readyState == 'interactive' || document.readyState == 'complete') {
    proc();
}else{
    document.addEventListener("DOMContentLoaded", proc);
}