javascript:(function () {
    const existingNode = document.querySelector(".bookMarklet");
    if (existingNode) {
        console.log("clearing");
        existingNode.classList.remove("bookMarklet");
        existingNode.removeAttribute('style');
        window.removeEventListener('keyup', handleFocusedElement);
        window.removeEventListener('keydown', revertUnfocusedElement);
        console.log("cleared all");
        return;
    }


    const focusableNodes = document.querySelectorAll('a, button, input, textarea, select, [tabindex], [role=button], [role=link], [role=tab], [role=tabpanel], [role=gridcell]');

    function handleFocusedElement(e){
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
    }
    function revertUnfocusedElement(e){
        if (e.key == "Tab"){
            var unfocusedElem = e.target;
            if (unfocusedElem.getAttribute("class") === 'bookMarklet'){
                unfocusedElem.classList.remove('bookMarklet');
                unfocusedElem.removeAttribute('style');
                console.log("removed attributes from", unfocusedElem);
            }
        }
    }
    
    window.addEventListener('keyup', handleFocusedElement);
    window.addEventListener('keydown', revertUnfocusedElement);
})();