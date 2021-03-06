const mermaiding = async function() {
    const elements = document.querySelectorAll("pre>code.language-mermaid");
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i];
        const pre = e.parentElement;
        const replace = function(graph) {
            if (pre.getAttribute('data-style') == 'details') {
                const details = document.createElement('details');
                details.className = 'mermaid';
                details.setAttribute('data-processed', 'true');
                details.setAttribute('data-toggle-id', 'toggle:' + document.querySelector("meta[name=id]").getAttribute("content") + "#mermaid." + i);
                details.addEventListener("toggle", function() {
                    if (details.open) {
                        localStorage[details.getAttribute("data-toggle-id")] = true;
                    } else {
                        delete localStorage[details.getAttribute("data-toggle-id")];
                    }
                }, false);
                if (localStorage[details.getAttribute("data-toggle-id")]) {
                    details.setAttribute("open", "open");
                }

                if (pre.getAttribute('title')) {
                    const summary = document.createElement('summary');
                    summary.textContent = pre.getAttribute('title');
                    details.appendChild(summary)
                }

                const elem = document.createElement('div');
                elem.innerHTML = graph;
                details.appendChild(elem);
                pre.parentElement.replaceChild(details, pre);
            }else{
                const elem = document.createElement('div');
                elem.innerHTML = graph;
                elem.className = 'mermaid';
                elem.setAttribute('data-processed', 'true');
                if (pre.getAttribute('title')) {
                    elem.setAttribute('title', pre.getAttribute('title'));
                }
                pre.parentElement.replaceChild(elem, pre);
            }
        }
        mermaid.mermaidAPI.render('id' + i, e.textContent, replace);
    }
}

if (document.readyState == 'interactive' || document.readyState == 'complete') {
    mermaiding();
}else{
    document.addEventListener("DOMContentLoaded", mermaiding);
}