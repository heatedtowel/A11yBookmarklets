javascript:(function () {
    const existingNode = document.querySelector(".bookMarklet");
    if (existingNode) {
        existingNode.classList.remove("bookMarklet");
        isFocusEnabled = false;
        return;
    }
    
    const focusableNodes = document.querySelectorAll('a, button, input, select');
    var currentlyFocusedElement;

    window.addEventListener('keydown', function(e){
        if(e.key == "Tab" && focusableNodes.length){
            for (const focusableNode of focusableNodes) {
                currentlyFocusedElement = document.activeElement;
                if(currentlyFocusedElement == focusableNode){
                    console.log("focused element:" + focusableNode.tagName);
                }
            }
        }
    });
})();