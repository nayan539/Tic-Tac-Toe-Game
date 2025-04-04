let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turn0 = true;
let gameOver = false; // Added gameOver flag
newGameBtn.classList.add("hide");

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turn0 = true;
    gameOver = false; // Reset gameOver flag
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return; // Prevent clicking after game over

        box.innerText = turn0 ? "O" : "X";
        turn0 = !turn0;
        box.classList.add("disabled"); // Add a disabled class for visual feedback

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.classList.add("disabled"));
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.classList.remove("disabled");
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    newGameBtn.classList.remove("hide");
    disableBoxes();
    gameOver = true; // Set gameOver to true
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        newGameBtn.classList.remove("hide");
        gameOver = true;
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
