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
            let passElement = document.createElement('div');

            passElement.className = 'bookMarklet';
            passElement.textContent = 'Pass';
            passElement.style.backgroundColor = 'white';
            passElement.style.opacity = '.8';
            passElement.style.color = 'Green';
            passElement.style.border = '2px, solid, Green';
            passElement.style.padding = '3px';
            passElement.style.borderRadius = '3px';
            passElement.style.width = 'max-content';
    
            imgNodes[element].before(passElement);
            continue;
        }

        let imgFailElement = document.createElement('div');

        imgFailElement.className = 'bookMarklet';
        imgFailElement.textContent = 'X';
        imgFailElement.style.backgroundColor = 'white';
        imgFailElement.style.opacity = '.8';
        imgFailElement.style.color = 'red';
        imgFailElement.style.border = '2px, solid, red';
        imgFailElement.style.padding = '3px';
        imgFailElement.style.borderRadius = '3px';
        imgFailElement.style.width = 'max-content';

        imgFailElement.addEventListener('mouseover', () => {
            let infobox = document.createElement('div');

            infobox.className = 'infoBox';

            infobox.textContent = 'test';
            
            infobox.style.position = 'absolute';
            infobox.style.top = `${imgFailElement.getBoundingClientRect().bottom}px`;
            infobox.style.backgroundColor = 'white';
            infobox.style.opacity = '.8';
            infobox.style.color = 'red';
            infobox.style.border = '2px, solid, red';
            infobox.style.padding = '3px';
            infobox.style.borderRadius = '3px';
            infobox.style.width = 'max-content';
            imgFailElement.after(infobox);
        });

        imgFailElement.addEventListener('mouseout', () => {
            let infobox = document.querySelectorAll('.infoBox');

            for (const element in infobox) {
                console.log(infobox[element]);
                infobox[element].remove();

            }
        });

        imgNodes[element].before(imgFailElement);
        console.log('Image elements', imgNodes[element]);
    }

    for (const element in nonImgNodes) {
        if (element === 'entries') break;

        let containsAriaHidden = nonImgNodes[element].getAttribute('aria-hidden');
        let containsAltText = nonImgNodes[element].getAttribute('alt');
        let containsAriaLabel = nonImgNodes[element].getAttribute('aria-label');

        if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
            let passElement = document.createElement('div');

            passElement.className = 'bookMarklet';
            passElement.textContent = 'Pass';
            passElement.style.backgroundColor = 'white';
            passElement.style.opacity = '.8';
            passElement.style.color = 'Green';
            passElement.style.border = '2px, solid, Green';
            passElement.style.padding = '3px';
            passElement.style.borderRadius = '3px';
            passElement.style.width = 'max-content';
    
            nonImgNodes[element].before(passElement);
            continue;
        }

        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = 'X no alt text found';
        pseudoElement.style.position = 'relative';
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';

        pseudoElement.addEventListener('mouseover', () => {
            let infobox = document.createElement('div');

            infobox.className = 'infoBox';

            infobox.textContent = 'test 2';

            infobox.style.position = 'absolute';
            infobox.style.top = `${pseudoElement.getBoundingClientRect().bottom}px`;
            infobox.style.backgroundColor = 'white';
            infobox.style.opacity = '.8';
            infobox.style.color = 'red';
            infobox.style.border = '2px, solid, red';
            infobox.style.padding = '3px';
            infobox.style.borderRadius = '3px';
            infobox.style.width = 'max-content';
            pseudoElement.after(infobox);
        });

        pseudoElement.addEventListener('mouseout', () => {
            let infobox = document.querySelectorAll('.infoBox');

            for (const element in infobox) {
                console.log(infobox[element]);
                infobox[element].remove();

            }
        });

        nonImgNodes[element].before(pseudoElement);
        console.log('Not an image element', nonImgNodes[element]);
}
})();