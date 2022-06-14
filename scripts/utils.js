function obsoleteCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    let supported;
    textArea.value = text;
    textArea.style.top = "0px";
    textArea.style.left = "0px";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        supported = document.execCommand("copy");
    } catch (error) {
        console.error("Unable to copy", error);
    }
    document.body.removeChild(textArea);
}

function copyToClipboard(text) {
    if (!navigator.clipboard) {
        obsoleteCopyToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {}, function(error) {
        console.error("Async: Unable to copy: ", error);
    });
}

function initCopyButtons() {
    const copyButtons = document.querySelectorAll("div.code-block-copy-icon-container");
    for (const button of copyButtons) {
        button.addEventListener("click", function(event) {
            const text = button.parentElement.querySelector("pre").innerHTML;
            copyToClipboard(parseHTML(text));
        });
    }
}

function parseHTML(text) {
    text = text.replaceAll("&lt;", "<");
    text = text.replaceAll("&gt;", ">");
    return text;
}

function init() {
    console.log("init");
    initCopyButtons();
}

window.onload = init;