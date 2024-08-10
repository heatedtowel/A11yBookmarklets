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
        if (element === 'entries') break;

        let containsAriaHidden = imgNodes[element].getAttribute('aria-hidden');
        let containsAltText = imgNodes[element].getAttribute('alt');
        let containsAriaLabel = imgNodes[element].getAttribute('aria-label');

        if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
            let pseudoElement = document.createElement('div');

            pseudoElement.className = 'bookMarklet';
            pseudoElement.textContent = 'Pass';
            pseudoElement.style.backgroundColor = 'white';
            pseudoElement.style.opacity = '.8';
            pseudoElement.style.color = 'Green';
            pseudoElement.style.border = '2px, solid, Green';
            pseudoElement.style.padding = '3px';
            pseudoElement.style.borderRadius = '3px';
            pseudoElement.style.width = 'max-content';
    
            imgNodes[element].before(pseudoElement);
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

        imgNodes[element].before(pseudoElement);
        console.log('Image elements', imgNodes[element]);
    }

    for (const element in nonImgNodes) {
        if (element === 'entries') break;

        let containsAriaHidden = nonImgNodes[element].getAttribute('aria-hidden');
        let containsAltText = nonImgNodes[element].getAttribute('alt');
        let containsAriaLabel = nonImgNodes[element].getAttribute('aria-label');

        if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
            let pseudoElement = document.createElement('div');

            pseudoElement.className = 'bookMarklet';
            pseudoElement.textContent = 'Pass';
            pseudoElement.style.backgroundColor = 'white';
            pseudoElement.style.opacity = '.8';
            pseudoElement.style.color = 'Green';
            pseudoElement.style.border = '2px, solid, Green';
            pseudoElement.style.padding = '3px';
            pseudoElement.style.borderRadius = '3px';
            pseudoElement.style.width = 'max-content';
    
            imgNodes[element].before(pseudoElement);
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

        nonImgNodes[element].before(pseudoElement);
        console.log('Not an image element', nonImgNodes[element]);
}
})();