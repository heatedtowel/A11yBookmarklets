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

const displayOverlay = () => {

    let overlay = document.createElement('div');
    overlay.className = 'bookMarklet';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#000000';
    overlay.style.display = 'flex';
    overlay.style.zIndex = '100';

    let peekButton = document.createElement('button');
    peekButton.className = 'bookMarklet';
    peekButton.style.position = 'fixed';
    peekButton.style.top = '30px';
    peekButton.style.right = '30px';
    peekButton.style.width = '60px';
    peekButton.style.height = '30px';
    peekButton.style.color = 'black';
    peekButton.style.backgroundColor = '#FFFFFF';
    peekButton.style.zIndex = '100';
    peekButton.innerHTML = 'Peek';

    peekButton.addEventListener('click', () => {
        overlay.style.backgroundColor = '';
        setTimeout(() => {
            overlay.style.backgroundColor = '#000000';
        },'2000')
    });

    overlay.append(peekButton);
    document.body.prepend(overlay);
};

checkForExistingBookmarklets();
})();
