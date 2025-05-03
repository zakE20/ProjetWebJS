function initListeners(inputStates, canvas) {
    window.onkeydown = (event) => {
        console.log("Touche pressée : " + event.key);
        if(event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
            inputStates.ArrowRight = true;
        }
        if(event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
            inputStates.ArrowLeft = true;
        }
        if(event.key === "ArrowUp") {
            inputStates.ArrowUp = true;
        }
        if(event.key === "ArrowDown") {
            inputStates.ArrowDown = true;
        }
        if(event.key === " ") {
            inputStates.Space= true;
            console.log("Espace pressé");

        }
    }

    window.onkeyup = (event) => {
        console.log("Touche relachée : " + event.key);
        if(event.key === "ArrowRight") {
            inputStates.ArrowRight = false;
        }
        if(event.key === "ArrowLeft") {
            inputStates.ArrowLeft = false;
        }
        if(event.key === "ArrowUp") {
            inputStates.ArrowUp = false;
        }
        if(event.key === "ArrowDown") {
            inputStates.ArrowDown = false;
        }
        if(event.key === " ") {
            inputStates.Space = false;
            console.log("Espace relaché");

        }
    }

    window.onmousemove = (event) => {
        // get proper x and y for the mouse in the canvas
        inputStates.mouseX = event.clientX - canvas.getBoundingClientRect().left;
        inputStates.mouseY = event.clientY - canvas.getBoundingClientRect().top;
    }
}

export { initListeners };