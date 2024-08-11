javascript:(function () {
    const existingBookmarkletNodes = document.querySelectorAll(".bookMarklet");

    if (existingBookmarkletNodes.length) {
        for (const element in existingBookmarkletNodes) {
            existingBookmarkletNodes[element].remove();
        }
        return;
    }
    
    const imgNodes = document.querySelectorAll("img:not([role])");
    const nonImgNodes = document.querySelectorAll("[role=img]");

    const buildElement = (type, color, text, className = 'bookMarklet', backgroundColor = 'rgb(255, 255, 255, .6)') => {
        const newElement = document.createElement(`${type}`);

        newElement.className = `${className}`;
        newElement.textContent = `${text}`;
        newElement.style.backgroundColor = `${backgroundColor}`;
        newElement.style.color = `${color}`;
        newElement.style.border = '2px, solid, Green';
        newElement.style.padding = '3px';
        newElement.style.borderRadius = '3px';
        newElement.style.width = 'max-content';

        return newElement;
    };

    const buildPopOver = (type, color, text,  className = 'bookMarklet', backgroundColor = 'rgb(255, 255, 255, .6)') => {
        const newElement = document.createElement(`${type}`);

        newElement.className = `${className}`;
        newElement.style.textContent = `${text}`;
        newElement.style.position = 'absolute';
        newElement.style.top = `${imgFailElement.getBoundingClientRect().bottom}px`;
        newElement.style.backgroundColor = `${backgroundColor}`;
        newElement.style.color = `${color}`;
        newElement.style.border = '2px, solid, red';
        newElement.style.padding = '3px';
        newElement.style.borderRadius = '3px';
        newElement.style.width = 'max-content';

        return newElement;
    };

    for (const element in imgNodes) {
        if (element === 'entries') break;

        let containsAriaHidden = imgNodes[element].getAttribute('aria-hidden');
        let containsAltText = imgNodes[element].getAttribute('alt');
        let containsAriaLabel = imgNodes[element].getAttribute('aria-label');

        if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
            let passElement = buildElement('div', 'green', 'Passed');
            let ariaHiddenElement = buildElement('p', 'green', 'aria-hidden=' + containsAriaHidden, 'passed-popOver');
            let altElement = buildElement('p', 'green', 'alt=' + containsAltText, 'passed-popOver');
            let ariaLabelElement = buildElement('p', 'green', 'aria-label=' + containsAriaLabel, 'passed-popOver');

            passElement.addEventListener('mouseover', () => {
                passElement.appendChild(ariaHiddenElement);
                passElement.appendChild(altElement);
                passElement.appendChild(ariaLabelElement);
            });

            passElement.addEventListener('mouseout', () => {
                let elementsToRemove = document.querySelectorAll('.passed-popOver');
    
                for (const element in elementsToRemove) {
                    console.log(elementsToRemove[element]);
                    elementsToRemove[element].remove();
    
                }
            });

            imgNodes[element].before(passElement);
            continue;
        }

        let imgFailElement = buildElement('div', 'red');
        console.log(imgFailElement);

        imgFailElement.addEventListener('mouseover', () => {
            let infoBox = buildPopOver('div', 'red');
            imgFailElement.after(infoBox);
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
            let passElement = buildElement('div', 'green', 'Passed', 'bookMarklet');
            let ariaHiddenElement = buildElement('p', 'green', 'aria-hidden=' + containsAriaHidden, 'passed-popOver');
            let altElement = buildElement('p', 'green', 'alt=' + containsAltText, 'passed-popOver');
            let ariaLabelElement = buildElement('p', 'green', 'aria-label=' + containsAriaLabel, 'passed-popOver');

            passElement.addEventListener('mouseover', () => {
                passElement.appendChild(ariaHiddenElement);
                passElement.appendChild(altElement);
                passElement.appendChild(ariaLabelElement);
            });

            passElement.addEventListener('mouseout', () => {
                let elementsToRemove = document.querySelectorAll('.passed-popOver');
    
                for (const element in elementsToRemove) {
                    console.log(elementsToRemove[element]);
                    elementsToRemove[element].remove();
    
                }
            });
    
            nonImgNodes[element].before(passElement);
            continue;
        }

        let failElement = buildElement('div', 'red', 'X', 'bookMarklet');
        let ariaHiddenElement = buildElement('p', 'red', 'aria-hidden=' + containsAriaHidden, 'failed-popOver');
        let altElement = buildElement('p', 'red', 'alt=' + containsAltText, 'failed-popOver');
        let ariaLabelElement = buildElement('p', 'red', 'aria-label=' + containsAriaLabel, 'failed-popOver');

        failElement.addEventListener('mouseover', () => {
            failElement.appendChild(ariaHiddenElement);
            failElement.appendChild(altElement);
            failElement.appendChild(ariaLabelElement);
        });

        failElement.addEventListener('mouseout', () => {
            let infobox = document.querySelectorAll('.failed-popOver');

            for (const element in infobox) {
                console.log(infobox[element]);
                infobox[element].remove();

            }
        });

        nonImgNodes[element].before(failElement);
        console.log('Not an image element', nonImgNodes[element]);
}
})();