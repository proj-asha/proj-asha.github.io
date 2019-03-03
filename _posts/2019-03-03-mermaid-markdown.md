---
title: mermaid を GitHub Pages とかで使う
description: markdown 内に記述された mermaid を、GitHub Pages 等でグラフの形で表示するためのスニペット。
category: ['note']
---

[mermaid](https://mermaidjs.github.io/) は、フローチャート、シーケンス図、ガントチャートをテキストで記述し、SVG に変換するソフトウェア。類似プロダクトの PlantUML と異なり、全てブラウザ上で動作する。

しかし、jekyll や GitBook のためのプラグインは用意されているが、GitHub Pages では許可されたもの以外の jekyll plugin が使用できない。

ここでは、markdown 内に記述され、html の code 要素として出力された mermaid を、 SVG へ変換し埋め込む JavaScript スニペットを示す。これにより、 jekyll theme への変更によって GitHub Pages 等でも mermaid が使用できる。

## スニペット ##

`<head>` 要素内に以下のコードを貼り付ける。

```html
<script src="https://unpkg.com/mermaid@8.0.0/dist/mermaid.min.js"></script>
<script>
const mermaiding = function() {
    const elements = document.querySelectorAll("pre>code.language-mermaid");
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i];
        const pre = e.parentElement;
        const replace = function(graph) {
            const elem = document.createElement('div');
            elem.innerHTML = graph;
            elem.className = 'mermaid';
            elem.setAttribute('data-processed', 'true');
            pre.parentElement.replaceChild(elem, pre);
        }
        mermaid.mermaidAPI.render('id' + i, e.textContent, replace);
    }
}

if (document.readyState == 'interactive' || document.readyState == 'complete') {
    mermaiding();
}else{
    document.addEventListener("DOMContentLoaded", mermaiding);
}
</script>
```

`<script>` 要素内のコードは、別ファイルに記述して `src` 属性で読み込んでもよい。その時、一瞬コードが映るのが気にならなければ、 `defer async` してもよい。


## mermaid を書く ##

次のように書く。

    ```mermaid
    graph TD
      A --> B
      C --> D
    ```
