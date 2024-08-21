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

    let passedNodes = {};
    let failedNodes = {};

    const buildElement = (type, color, text, className = 'bookMarklet', backgroundColor = 'white', position = 'static', id = null) => {
        const newElement = document.createElement(`${type}`);

        newElement.id = `${id}`;
        newElement.className = `${className}`;
        newElement.innerHTML = `${text}`;
        newElement.style.position = `${position}`;
        newElement.style.backgroundColor = `${backgroundColor}`;
        newElement.style.color = `${color}`;
        newElement.style.border = '2px, solid, Green';
        newElement.style.padding = '1px 4px';
        newElement.style.borderRadius = '3px';
        newElement.style.width = 'max-content';
        newElement.style.zIndex = '99';

        return newElement;
    };

    const buildAdditionalInfo = (type, color, text,  className = 'bookMarklet', id = null) => {
        const additionalInfoElement = document.createElement(`${type}`);

        additionalInfoElement.id = `${id}`;
        additionalInfoElement.className = `${className}`;
        additionalInfoElement.textContent = `${text}`;
        additionalInfoElement.style.color = `${color}`;
        additionalInfoElement.style.padding = '3px';
        additionalInfoElement.style.borderRadius = '3px';
        additionalInfoElement.style.width = 'max-content';
        additionalInfoElement.style.margin = '0';

        return additionalInfoElement;
    };

    const displayOverlay = () => {
        const options = {
            'All': 'img:not([role]), [role=img], svg',
            'Img elements': 'img:not([role])',
            'Elements with a role of image': '[role=img]',
            'svg elements': 'svg',
        };

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
        details.textContent = 'Select the type of elements you would like to check for a11y compliance. Once the scan has run you can hover over the elements in order to view additional details. Open the console to view the complete list of elements scanned.';
        details.style.color = 'black';

        let scanResults = document.createElement('p');
        scanResults.id = 'scanResults';
        scanResults.textContent = '0 nodes scanned';
        scanResults.style.color = 'black';

        let checkboxContainer = document.createElement('div');
        checkboxContainer.style.display = 'flex';
        checkboxContainer.style.flexDirection ='column';
        checkboxContainer.style.alignItems = 'flex-start';
        checkboxContainer.style.justifyContent = 'center';

        for (const option in options) {
            let optionContainer = document.createElement('div');
            let newOption = document.createElement('input');
            newOption.type =  'checkbox';
            newOption.id =  option;
            newOption.name =  'imageTypes';
            newOption.value = options[option];

            let optionLabel = document.createElement('label');
            optionLabel.setAttribute('for', `${option}`);
            optionLabel.style.color = 'black';
            optionLabel.style.paddingLeft = '5px';
            optionLabel.innerHTML = option;

            if (option === 'All') {
                newOption.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        for (const option in options) {
                            let currentSelection = document.getElementById(option);
                            if (currentSelection.value != 'All') {
                                currentSelection.setAttribute('disabled', 'true');
                            }
                        };
                        return;
                    }
                    for (const option in options) {
                        let currentSelection = document.getElementById(option);
                            currentSelection.removeAttribute('disabled');
                    };
                })
            }


            optionContainer.appendChild(newOption);
            optionContainer.appendChild(optionLabel);

            checkboxContainer.appendChild(optionContainer)
        };

        let btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.alignItems = 'center';
        btnContainer.style.justifyContent = 'center';

        let scanBtn = document.createElement('button');
        scanBtn.textContent = 'Scan';
        scanBtn.style.padding = '2px 8px';
        scanBtn.style.borderRadius = '1rem';
        scanBtn.style.backgroundColor = 'grey';
        scanBtn.style.cursor = 'pointer';

        scanBtn.addEventListener('click' , () => {
            let totalQueries = 0;
            for (const option in options) {
                let currentSelection = document.getElementById(option);

                if (currentSelection.checked) {
                    totalQueries += 1;
                    let nodeList = gatherNodesToScan(currentSelection.value);

                    
                    imageQuery(nodeList);
                }
                if (totalQueries > 0) {
                    currentSelection.setAttribute('disabled', 'true');
                    scanBtn.disabled = 'true';
                }
            };
            logResults(passedNodes, failedNodes);
        });

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Close';
        confirmBtn.style.padding = '2px 8px';
        confirmBtn.style.borderRadius = '1rem';
        confirmBtn.style.backgroundColor = 'grey';
        confirmBtn.style.cursor = 'pointer';

        confirmBtn.addEventListener('click' , () => {
            overlay.remove();
        });

        btnContainer.appendChild(scanBtn);
        btnContainer.appendChild(confirmBtn);

        overlay.appendChild(title);
        overlay.appendChild(details);
        overlay.appendChild(scanResults);
        overlay.appendChild(checkboxContainer);
        overlay.appendChild(btnContainer);
        document.body.appendChild(overlay);
    };

    const imageQuery = (nodesToQuery) => {
        const attributesToQuery = ['aria-label', 'aria-hidden', 'alt', 'role'];
        const imgAttributesToQuery = ['aria-label', 'aria-hidden', 'alt',];
        const rolesToQuery = ['img', 'graphics-document', 'graphics-symbol', 'role'];

        for (const element in nodesToQuery) {
            if (element === 'entries') break;

            let currentElement = nodesToQuery[element];
            let elementType = currentElement.localName;
            let elementAttributes = currentElement.getAttributeNames();
            let roleType = currentElement.getAttribute('role');

            if (elementAttributes.some(attribute => imgAttributesToQuery.includes(attribute)) || rolesToQuery.includes(roleType)) {
                let passElement = buildElement('div', 'green', '&#9432', 'bookMarklet', 'rgb(255, 255, 255, .8)', 'absolute');
                let infoContainer = buildElement('div', 'black', '', 'bookMarklet', 'white', 'absolute', 'passedContainer');
                infoContainer.style.display = 'flex';
                infoContainer.style.flexDirection = 'column';
                infoContainer.style.alignItems = 'flex-start';
                infoContainer.style.justifyContent = 'center';
                infoContainer.style.top = '50%';
                infoContainer.style.left = '50%';
                infoContainer.style.width = '30%';
                infoContainer.style.transform = 'translate(-50%, -50%)';
                infoContainer.style.padding = '2rem';
                infoContainer.style.borderRadius = '1rem';
                infoContainer.style.wordBreak  = 'break-all';
                infoContainer.style.wordBreak  = 'anywhere';

                let titleElement = buildAdditionalInfo('h3', 'black', 'Additional Information', 'bookmarklet', 'infoTitle');
                titleElement.style.alignSelf = 'center';

                let typeElement = buildAdditionalInfo('p', 'black', `Element Type: ${currentElement.localName}`, 'bookmarklet', 'infoTitle');

                let attributeElement = buildAdditionalInfo('p', 'black', `Element Attributes`, 'bookmarklet', 'infoTitle');

                infoContainer.appendChild(titleElement);
                infoContainer.appendChild(typeElement);
                infoContainer.appendChild(attributeElement);

                elementAttributes.map(attribute => {
                        let attributeValue = currentElement.getAttribute(attribute);
                        let attributeElement = buildAdditionalInfo('p', 'black', `${attribute} = ` + attributeValue, 'passed-popOver');
                        infoContainer.appendChild(attributeElement);
                });

                passElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px solid yellow';
                    document.body.appendChild(infoContainer);

                });

                passElement.addEventListener('mouseleave', () => {
                    currentElement.style.border = 'initial';

                    let elementsToRemove = document.querySelectorAll('#passedContainer');
        
                    for (const element in elementsToRemove) {
                        elementsToRemove[element].remove();
                    }
                });
        
                currentElement.before(passElement);

                if (!Object.hasOwn(passedNodes, `${currentElement.localName}`)) {
                    passedNodes[`${currentElement.localName}`] = [currentElement];
                }
                else {
                    passedNodes[`${currentElement.localName}`].push(currentElement);
                }
            }
            else {      
                let failElement = buildElement('div', 'red', '&#9432', 'bookMarklet', 'rgb(255, 255, 255, .8)', 'absolute');
                let infoContainer = buildElement('div', 'green', null, 'bookmarklet', 'white', 'absolute', 'failedContainer');

                elementAttributes.map(attribute => {
                    let attributeValue = currentElement.getAttribute(attribute);
                    let attributeElement = buildAdditionalInfo('p', 'red', `${attribute} = ` + attributeValue, 'failed-popOver');
                    infoContainer.appendChild(attributeElement);
                });

                failElement.addEventListener('mouseenter', () => {
                    currentElement.style.border = '2px solid yellow';
                    failElement.appendChild(infoContainer);
                });
        
                failElement.addEventListener('mouseleave', () => {
                    currentElement.style.border = 'initial';

                    let elementsToRemove = document.querySelectorAll('#failedContainer');
        
                    for (const element in elementsToRemove) {
                        elementsToRemove[element].remove();
                    }
                });
        
                currentElement.before(failElement);

                if (!Object.hasOwn(failedNodes, `${currentElement.localName}`)) {
                    failedNodes[`${currentElement.localName}`] = [currentElement];
                }
                else {
                    failedNodes[`${currentElement.localName}`].push(currentElement);
                }
            }
        }
    };

    const gatherNodesToScan = (params) => {
        return document.querySelectorAll(params);
    };

    const logResults = (passedNodes, failedNodes) => {
        let resultsElement = document.getElementById('scanResults');
        let totalNodesScanned = 0;

        for (const prop in passedNodes) {
            totalNodesScanned += (passedNodes[prop].length);
        };

        resultsElement.textContent = `${totalNodesScanned} nodes scanned`;

        console.log('Start of image query');
        console.group('Elements');
        console.groupCollapsed('Passed Elements');

        if (Object.keys(passedNodes).length != 0) {
            for (const type in passedNodes) {
                console.groupCollapsed(type);

                passedNodes[type].map(element => {
                    console.log(element);
                });
                console.groupEnd();
            }
        }
        else {
            console.log('No Elements to display');
        }

        console.groupEnd();
        console.groupCollapsed('Failed Elements');

        if (Object.keys(failedNodes).length != 0) {
            for (const type in failedNodes) {
                console.groupCollapsed(type);

                failedNodes[type].map(element => {
                    console.log(element);
                });
                console.groupEnd();
            }
        }
        else {
            console.log('No Elements to display');
        }
        console.groupEnd();
        console.groupEnd();
    };

    checkForExistingBookmarklets();
})();