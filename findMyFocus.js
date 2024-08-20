javascript:(function () {
    const existingNode = document.querySelector(".bookMarklet");
    if (existingNode) {
        existingNode.classList.remove("bookMarklet");
        isFocusEnabled = false;
        return;
    }
    
    const focusableNodes = document.querySelectorAll('a, button, input, textarea, select, div[role=button], div[role=link], div[role=tab], div[role=tabpanel]');

    window.addEventListener('keyup', function(e){
        if (e.key == "Tab" && focusableNodes.length){
            for (const fn of focusableNodes) {
                if(document.activeElement == fn){
                    fn.className = 'bookMarklet';
                    console.log("Focused element: ", fn);
                }
            }
        }
    });
    
    window.addEventListener('keydown', function(e){
        if (e.key == "Tab"){
            if (e.target.getAttribute("class") === 'bookMarklet'){
                e.target.removeAttribute('class');
                console.log("removed class from", e.target);
            }
        }
    });


})();