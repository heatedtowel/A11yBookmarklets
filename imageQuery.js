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

    let passedNodes = [];
    let failedNodes = [];

    const buildElement = (type, color, text, className = 'bookMarklet', backgroundColor = 'white', position = 'static') => {
        const newElement = document.createElement(`${type}`);

        newElement.className = `${className}`;
        newElement.innerHTML = `${text}`;
        newElement.style.position = `${position}`;
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
        let options = ['All', 'Images', `Elements with role='image'`, 'svg'];

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
        details.id = 'overlayDetails';
        details.textContent = 'Select the type of elements you would like to check for a11y compliance. Once the scan has run you can hover over the elements in order to view additional detilas. Open the console to view the complete list of elements scanned.';
        details.style.color = 'black';

        let checkboxContainer = document.createElement('div');
        checkboxContainer.style.display = 'flex';
        checkboxContainer.style.flexDirection ='column';
        checkboxContainer.style.alignItems = 'flex-start';
        checkboxContainer.style.justifyContent = 'center';

        options.map(option => {
            let optionContainer = document.createElement('div');
            let newOption = document.createElement('input');
            newOption.type =  'checkbox';
            newOption.id =  option;
            newOption.name =  'imageTypes';
            newOption.value = option;

            let optionLabel = document.createElement('label');
            optionLabel.setAttribute('for', `${option}`);
            optionLabel.style.color = 'black';
            optionLabel.innerHTML = option;


            optionContainer.appendChild(newOption);
            optionContainer.appendChild(optionLabel);

            checkboxContainer.appendChild(optionContainer)
        });

        let scanBtn = document.createElement('button');
        scanBtn.textContent = 'Scan';
        scanBtn.style.padding = '2px 8px';
        scanBtn.style.borderRadius = '1rem';
        scanBtn.style.backgroundColor = 'grey';
        scanBtn.style.cursor = 'pointer';

        scanBtn.addEventListener('click' , () => {
            options.map(option => {
                let currentSelection = document.getElementById(option);

                if (currentSelection.checked) {
                    let nodeList = gatherNodesToScan(currentSelection.value);

                    imageQuery(nodeList);
                }
                scanBtn.disabled = 'true';
            });
            logResults(passedNodes, failedNodes);
        });

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Ok';
        confirmBtn.style.padding = '2px 8px';
        confirmBtn.style.borderRadius = '1rem';
        confirmBtn.style.backgroundColor = 'grey';
        confirmBtn.style.cursor = 'pointer';

        confirmBtn.addEventListener('click' , () => {
            overlay.remove();
        });

        overlay.appendChild(title);
        overlay.appendChild(details);
        overlay.appendChild(checkboxContainer);
        overlay.appendChild(scanBtn);
        overlay.appendChild(confirmBtn);
        document.body.appendChild(overlay);
    };

    const imageQuery = (nodesToQuery) => {
        for (const element in nodesToQuery) {
            if (element === 'entries') break;

            let currentElement = nodesToQuery[element];
            let containsAriaHidden = currentElement.getAttribute('aria-hidden');
            let altText = currentElement.getAttribute('alt');
            let containsAltText = currentElement.hasAttribute('alt');
            let containsAriaLabel = currentElement.getAttribute('aria-label');

            if ((containsAriaHidden === 'true') || containsAltText || containsAriaLabel) {
                let passElement = buildElement('div', 'green', '&#9432', 'bookMarklet', 'white', 'absolute');
                let ariaHiddenElement = buildAdditionalInfo('p', 'green', 'aria-hidden=' + containsAriaHidden, 'passed-popOver');
                let altElement = buildAdditionalInfo('p', 'green', 'alt= ' + altText, 'passed-popOver');
                let ariaLabelElement = buildAdditionalInfo('p', 'green', 'aria-label= ' + containsAriaLabel, 'passed-popOver');

                passElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px solid yellow';

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
        
                currentElement.before(passElement);
                passedNodes.push(currentElement);
            }
            else {
                let failElement = buildElement('div', 'red', '&#9432', 'bookMarklet', 'white', 'absolute');
                let ariaHiddenElement = buildAdditionalInfo('p', 'red', 'aria-hidden= ' + containsAriaHidden, 'failed-popOver');
                let altElement = buildAdditionalInfo('p', 'red', 'alt= ' + altText, 'failed-popOver');
                let ariaLabelElement = buildAdditionalInfo('p', 'red', 'aria-label= ' + containsAriaLabel, 'failed-popOver');
        
                failElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px solid yellow';

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
        
                currentElement.before(failElement);
                failedNodes.push(currentElement);
            }
        }
    };

    const gatherNodesToScan = (elementType) => {
        let nodeList;
        console.log('nodes',nodeList);

        if (elementType === 'Images') {
            nodeList = document.querySelectorAll("img:not([role])");
        }

        if (elementType === 'Elements with role = image') {
            nodeList = document.querySelectorAll("[role=img]");
        }

        if (elementType === 'svg') {
            nodeList = document.querySelectorAll("svg");
        }

        if (elementType === 'All') {
            nonImgNodes = document.querySelectorAll("[role=img]");
            imgNodes = document.querySelectorAll("img:not([role])");
            svgNodes = document.querySelectorAll("svg");


            nodeList = [...nonImgNodes, ...imgNodes, ...svgNodes];

        }
        return nodeList;
    };

    const logResults = (passedNodes, failedNodes) => {
        let resultsElement = document.getElementById('scanResults');

        if (resultsElement) {
            resultsElement.textContent = `${passedNodes.length + failedNodes.length} nodes scanned`;
        }
        else{
            resultsElement = document.createElement('p');
            resultsElement.id = 'scanResults';
            resultsElement.textContent = `${passedNodes.length + failedNodes.length} nodes scanned`;
            document.getElementById('overlayDetails').appendChild(resultsElement);
        }

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