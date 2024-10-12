let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let draw = false;
let erase = false;

// Initializes the values on page load
window.onload = () => {
    // Set the minimum values of the sliders instead of 0
    gridWidth.value = gridWidth.min;
    gridHeight.value = gridHeight.min;

    // Updates the displayed values
    widthValue.innerHTML = gridWidth.min < 10 ? `0${gridWidth.min}` : gridWidth.min;
    heightValue.innerHTML = gridHeight.min < 10 ? `0${gridHeight.min}` : gridHeight.min;
};

// Restore the functionality of the grid creation and painting events.
gridButton.addEventListener("click", () => {
    container.innerHTML = ""; // Clean the container

    for (let i = 0; i < gridHeight.value; i++) {
        let row = document.createElement("div");
        row.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            let col = document.createElement("div");
            col.classList.add("gridCol");

            col.addEventListener("mousedown", () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener("mousemove", () => {
                if (draw) {
                    if (erase) {
                        col.style.backgroundColor = "transparent";
                    } else {
                        col.style.backgroundColor = colorButton.value;
                    }
                }
            });

            col.addEventListener("mouseup", () => {
                draw = false;
            });

            row.appendChild(col);
        }

        container.appendChild(row);
    }
});

// Function to manage the change of status of the buttons
function toggleButtonState(activeButton, inactiveButton) {
    // Apply asset class to the selected button
    activeButton.classList.add("active-btn");
    // Remove asset class from unselected button
    inactiveButton.classList.remove("active-btn");
}

eraseBtn.addEventListener("click", () => {
    erase = true; 
    toggleButtonState(eraseBtn, paintBtn); 
});

paintBtn.addEventListener("click", () => {
    erase = false; 
    toggleButtonState(paintBtn, eraseBtn); 
});

clearGridButton.addEventListener("click", () => {
    container.innerHTML = ""; 
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});
