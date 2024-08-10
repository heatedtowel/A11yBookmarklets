javascript:(function () {
    const existingNodes = document.querySelectorAll(".bookMarklet");

    if (existingNodes.length) {
        for (const element in existingNodes) {
            existingNodes[element].remove();
        }
        return;
    }
    
    const imgNodes = document.querySelectorAll("img:not([role])");
    const nonImgNodes = document.querySelectorAll("[role=img]");

    for (const element in imgNodes) {
        if (imgNodes[element].getAttribute('alt')) {
            continue;
        }

        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = 'X - no role or alt text found';
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';
        pseudoElement.style.width = 'max-content';

        nodes[element].before(pseudoElement);
        console.log('Image elements', nodes[element]);
    }

    for (const element in nonImgNodes) {
        if (imgNodes[element].getAttribute('alt')) {
            continue;
        }

        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = 'X no alt text found';
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';

        nodes[element].before(pseudoElement);
        console.log('Not an image element', nodes[element]);
}
})();