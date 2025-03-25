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

    document.body.appendChild(overlay);
};

checkForExistingBookmarklets();
})();