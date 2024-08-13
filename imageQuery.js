javascript:(function () {
    
    const checkForExistingBookmarklets = () => {
        const existingBookmarkletNodes = document.querySelectorAll(".bookMarklet");
        
        if (existingBookmarkletNodes.length) {
            for (const element in existingBookmarkletNodes) {
                if (element === 'entries') break;
                existingBookmarkletNodes[element].remove();
            }
            console.log('All elements have been cleared.');
            return;
        }
        displayOverlay();
    };

    const buildElement = (type, color, text, className = 'bookMarklet', backgroundColor = 'rgb(255, 255, 255, .8)') => {
        const newElement = document.createElement(`${type}`);

        newElement.className = `${className}`;
        newElement.innerHTML = `${text}`;
        newElement.style.backgroundColor = `${backgroundColor}`;
        newElement.style.color = `${color}`;
        newElement.style.border = '2px, solid, Green';
        newElement.style.padding = '1px';
        newElement.style.borderRadius = '3px';
        newElement.style.width = 'max-content';
        newElement.style.zIndex = '99';

        return newElement;
    };

    const buildAdditionalInfo = (type, color, text,  className = 'bookMarklet') => {
        const newPopOver = document.createElement(`${type}`);

        newPopOver.className = `${className}`;
        newPopOver.textContent = `${text}`;
        newPopOver.style.color = `${color}`;
        newPopOver.style.padding = '3px';
        newPopOver.style.borderRadius = '3px';
        newPopOver.style.width = 'max-content';

        return newPopOver;
    };

    const displayOverlay = () => {
        let options = ['Images', 'Elements with role = image', 'All'];

        let overlay = document.createElement('div');
        overlay.className = 'bookMarklet';
        overlay.style.position = 'fixed';
        overlay.style.top = '20%';
        overlay.style.left = '35%';
        overlay.style.width = '30%';
        overlay.style.backgroundColor = '#f0f0f0';
        overlay.style.display = 'flex';
        overlay.style.gap = '5px';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.textAlign = 'center';
        overlay.style.borderRadius  = '8px';
        overlay.style.padding  = '1rem';

        let title = document.createElement('h2');
        title.textContent = 'Welcome to the image a11y checker.';
        title.style.color = 'black';

        let details = document.createElement('p');
        details.textContent = 'Select the type of elements you would like to check for a11y compliance. Once the scan has run you can hover over the elements in order to view additional detilas. Open the console to view the complete list of elements scanned.';
        details.style.color = 'black';

        let dropdown = document.createElement('select');
        dropdown.id = 'elementSelectionDropdown';
        dropdown.name = 'elements';
        dropdown.style.width = 'max-content';

        options.map(option => {
            let newOption = document.createElement('option');
            newOption.value = option;
            newOption.textContent = option;

            dropdown.appendChild(newOption);
        });

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Ok';

        confirmBtn.addEventListener('click' , () => {
            let selection = document.getElementById('elementSelectionDropdown');
            let value = selection.value;
            overlay.remove();
            startScan(value);
        });

        overlay.appendChild(title);
        overlay.appendChild(details);
        overlay.appendChild(dropdown);
        overlay.appendChild(confirmBtn);
        document.body.appendChild(overlay);
    };

    const imageQuery = (nodesToQuery) => {
        let passedNodes = [];
        let failedNodes = [];

        for (const element in nodesToQuery) {
            if (element === 'entries') break;

            let currentElement = nodesToQuery[element];
            let containsAriaHidden = currentElement.getAttribute('aria-hidden');
            let containsAltText = currentElement.hasAttribute('alt');
            let containsAriaLabel = currentElement.getAttribute('aria-label');

            if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
                let passElement = buildElement('div', 'green', '&#9432', 'bookMarklet');
                let ariaHiddenElement = buildAdditionalInfo('p', 'green', 'aria-hidden=' + containsAriaHidden, 'passed-popOver');
                let altElement = buildAdditionalInfo('p', 'green', 'alt= ' + containsAltText, 'passed-popOver');
                let ariaLabelElement = buildAdditionalInfo('p', 'green', 'aria-label= ' + containsAriaLabel, 'passed-popOver');

                passElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px, solid, yellow';

                    passElement.appendChild(ariaHiddenElement);
                    passElement.appendChild(altElement);
                    passElement.appendChild(ariaLabelElement);
                });

                passElement.addEventListener('mouseleave', () => {
                    currentElement.style.border = 'initial';

                    let elementsToRemove = document.querySelectorAll('.passed-popOver');
        
                    for (const element in elementsToRemove) {
                        elementsToRemove[element].remove();
                    }
                });
        
                currentElement.after(passElement);
                passedNodes.push(currentElement);
            }
            else {
                let failElement = buildElement('div', 'red', '&#9432', 'bookMarklet');
                let ariaHiddenElement = buildAdditionalInfo('p', 'red', 'aria-hidden= ' + containsAriaHidden, 'failed-popOver');
                let altElement = buildAdditionalInfo('p', 'red', 'alt= ' + containsAltText, 'failed-popOver');
                let ariaLabelElement = buildAdditionalInfo('p', 'red', 'aria-label= ' + containsAriaLabel, 'failed-popOver');
        
                failElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px, solid, yellow';

                    failElement.appendChild(ariaHiddenElement);
                    failElement.appendChild(altElement);
                    failElement.appendChild(ariaLabelElement);
                });
        
                failElement.addEventListener('mouseleave', () => {
                    currentElement.style.border = 'initial';

                    let infobox = document.querySelectorAll('.failed-popOver');
        
                    for (const element in infobox) {
                        infobox[element].remove();
                    }
                });
        
                currentElement.after(failElement);
                failedNodes.push(currentElement);
            }
        }
        logResults(passedNodes, failedNodes)
    };

    const startScan = (elementType) => {
        if (elementType === 'Images') {
            const imgNodes = document.querySelectorAll("img:not([role])");
            imageQuery(imgNodes);
        }

        if (elementType === 'Elements with role = image') {
            const nonImgNodes = document.querySelectorAll("[role=img]");
            imageQuery(nonImgNodes);
        }

        if (elementType === 'All') {
            const nonImgNodes = document.querySelectorAll("[role=img]");
            const imgNodes = document.querySelectorAll("img:not([role])");

            imageQuery(nonImgNodes);
            imageQuery(imgNodes);
        }
    };

    const logResults = (passedNodes, failedNodes) => {
        console.log('Start of image query');
        console.group('Elements');
        console.groupCollapsed('Passed Elements');
        
        if (passedNodes.length != 0) {
            passedNodes.map(element => {
            console.log('Passed', element);
        });
        }
        else {
            console.log('No Elements to display');
        }

        console.groupEnd();
        console.groupCollapsed('Failed Elements');

        if (failedNodes.length != 0) {
            failedNodes.map(element => {
            console.log('Failed', element);
        });
        }
        else {
            console.log('No Elements to display');
        }

        console.groupEnd();
        console.groupEnd();
    };

    checkForExistingBookmarklets();
})();