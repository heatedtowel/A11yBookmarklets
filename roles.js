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
        pseudoElement.style.width = 'max-content';

        nodes[element].before(pseudoElement);
        console.log('role=', role, nodes[element]);
    }
})();
