javascript:(function () { 
    const existingNodes = document.querySelectorAll(".bookMarklet");

    if (existingNodes.length) {
        for (const element in existingNodes) {
            existingNodes[element].remove();
        }
        return;
    }

    let userInput = prompt("What tab index are you looking for? Leave blank for all tabindex elements");
    let nodes = {};

    if (userInput != '') {
        nodes = document.querySelectorAll(`[tabindex="${userInput.toString()}"]`);
    }
    else {
        nodes = document.querySelectorAll(`[tabindex]`);
    }

    if (!nodes.length) {
        window.alert(`no tabindex=${userInput} was found`);
    }

    for (element in nodes) {
        if (element === 'entries') break;

        let tabIndex = nodes[element].getAttribute('tabindex');
        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = `Tabindex=${tabIndex} ${nodes[element].innerText}`;
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';
        pseudoElement.style.width = 'max-content';

        nodes[element].before(pseudoElement);

        console.log('tabindex=', tabIndex, nodes[element]);
    }

    window.alert(`For a complete list of the elements please open the console.`);
})();






javascript:(function () {
    const existingNodes = document.querySelectorAll(".bookMarklet");
    console.log(existingNodes);

    if (existingNodes.length) {
        for (const element in existingNodes) {
            existingNodes[element].remove();
        }
        return;
    }

    const nodes = document.querySelectorAll("[role]");

    for (const element in nodes) {
        let role = nodes[element].getAttribute('role');
        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = role;
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';

        nodes[element].before(pseudoElement);
        console.log('role=', role, nodes[element]);
    }
})();





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
        pseudoElement.textContent = 'X';
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';

        nodes[element].before(pseudoElement);
        console.log('imgNodes', nodes[element]);
    }

    for (const element in nonImgNodes) {
        if (imgNodes[element].getAttribute('alt')) {
            continue;
        }

        let pseudoElement = document.createElement('div');

        pseudoElement.className = 'bookMarklet';
        pseudoElement.textContent = 'X';
        pseudoElement.style.backgroundColor = 'white';
        pseudoElement.style.opacity = '.8';
        pseudoElement.style.color = 'red';
        pseudoElement.style.border = '2px, solid, red';
        pseudoElement.style.padding = '3px';
        pseudoElement.style.borderRadius = '3px';

        nodes[element].before(pseudoElement);
        console.log('nonImgNodes', nodes[element]);
}
})();