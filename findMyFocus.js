javascript:(function () {
    const existingNode = document.querySelector(".bookMarklet");
    if (existingNode) {
        existingNode.classList.remove("bookMarklet");
        isFocusEnabled = false;
        return;
    }
    
    const focusableNodes = document.querySelectorAll('a, button, input, textarea, select, [tabindex="0"], [role=button], [role=link], [role=tab], [role=tabpanel]');

    window.addEventListener('keyup', function(e){
        if (e.key == "Tab" && focusableNodes.length){
            for (const fn of focusableNodes) {
                if(document.activeElement == fn){
                    fn.className = 'bookMarklet';
                    fn.style.border = '2px, solid, red';
                    fn.style.color = 'red';
                    console.log("Focused element: ", fn);
                }
            }
        }
    });
    
    window.addEventListener('keydown', function(e){
        if (e.key == "Tab"){
            var unfocusedElem = e.target;
            if (unfocusedElem.getAttribute("class") === 'bookMarklet'){
                unfocusedElem.removeAttribute('class');
                unfocusedElem.removeAttribute('style');
                console.log("removed attributes from", unfocusedElem);
            }
        }
    });


})();