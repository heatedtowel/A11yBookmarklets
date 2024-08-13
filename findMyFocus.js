javascript:(function () {
    const existingNode = document.querySelector(".bookMarklet");
    if (existingNode) {
        existingNode.classList.remove("bookMarklet");
        isFocusEnabled = false;
        return;
    }
    
    const focusableNodes = document.querySelectorAll('a, button, input, textarea, select, div[role=button], div[role=link], div[role=tab], div[role=tabpanel]');
    var currentlyFocusedElement;

    window.addEventListener('keyup', function(e){
        if(e.key == "Tab" && focusableNodes.length){
            for (const fn of focusableNodes) {
                if(document.activeElement == fn){
                    console.log("Focused element: ", fn);
                }
            }
        }
    });
})();