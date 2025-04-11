const colors = {
    1: { name: "Rouge", value: "red" },
    2: { name: "Jaune", value: "yellow" },
};

export default class Game {
    currentPlayId = 1;
    cells = [];
    players = [];
    gameOver = false;

    constructor(colomnCount, cellsCount) {
        this.colomnCount = colomnCount;
        this.cellsCount = cellsCount;
        this.addPlayer(1);
        this.addPlayer(2);
    }

    createGrid() {
        const body = document.body;
        const div = document.createElement("div");
        div.setAttribute("class", "game");
        body.appendChild(div);
        const container = document.createElement("div");
        const grid = document.createElement("div");

        const instructions = document.createElement("div");
        instructions.setAttribute("class", "instructions");
        instructions.innerHTML = `
            <h2>Bienvenue dans le jeu Puissance 4 !</h2>
            <p>Deux joueurs s’affrontent : <strong>Rouge</strong> et <strong>Jaune</strong>.</p>
            <p>Le premier qui aligne 4 jetons horizontalement, verticalement ou en diagonale gagne.</p>
            <p>Cliquez sur une colonne pour y placer votre jeton.</p>
            <hr />
        `;
        div.appendChild(instructions);

        container.setAttribute("class", "container");
        grid.setAttribute("class", "grid");

        container.appendChild(grid);
        div.appendChild(container);

        for (let i = 0; i < this.colomnCount; i++) {
            this.cells[i] = [];

            const colomn = document.createElement("div");
            colomn.setAttribute("class", "colomn");
            colomn.setAttribute("col", i);

            for (let j = 0; j < this.cellsCount; j++) {
                const cell = document.createElement("div");
                cell.setAttribute("class", "cell");
                cell.setAttribute("raw", j);
                colomn.appendChild(cell);

                this.cells[i][j] = cell;
            }

            grid.appendChild(colomn);
            colomn.onclick = () => {
                const colIndex = parseInt(colomn.getAttribute("col"));
                const colCells = this.cells[colIndex];

                if (colCells[0].style.backgroundColor) {
                    alert("Tu ne peux pas jouer ici !");
                    this.showResetButton();
                    const grid = document.querySelector(".grid");
                    grid.style.opacity = "0.5";
                    return;
                }

                for (let j = this.cellsCount - 1; j >= 0; j--) {
                    if (!colCells[j].style.backgroundColor) {
                        colCells[j].style.backgroundColor =
                            colors[this.currentPlayId].value;
                        if (this.winPlayer(colIndex, j)) {
                            this.gameOver = true;
                        }
                        break;
                    }
                }

                this.currentPlayId = this.currentPlayId === 1 ? 2 : 1;
            };
        }
    }

    addPlayer(playerId) {
        if (this.currentPlayId === null) {
            this.currentPlayId = 1;
        }

        if (!this.players[playerId]) {
            this.players[playerId] = {
                id: playerId,
                color: colors[playerId],
                win: 0,
                lose: 0,
            };
        }
    }

    winPlayer(col, row) {
        if (this.gameOver) return false;
        const currentColor = this.cells[col][row].style.backgroundColor;
        if (!currentColor) return;

        let count = 1;
        let left = col - 1;
        while (
            left >= 0 &&
            this.cells[left][row].style.backgroundColor === currentColor
        ) {
            count++;
            left--;
        }
        let right = col + 1;
        while (
            right < this.colomnCount &&
            this.cells[right][row].style.backgroundColor === currentColor
        ) {
            count++;
            right++;
        }
        if (count >= 4) return this.declareWinner();

        count = 1;
        let top = row - 1;
        while (
            top >= 0 &&
            this.cells[col][top].style.backgroundColor === currentColor
        ) {
            count++;
            top--;
        }
        let bottom = row + 1;
        while (
            bottom < this.cellsCount &&
            this.cells[col][bottom].style.backgroundColor === currentColor
        ) {
            count++;
            bottom++;
        }
        if (count >= 4) return this.declareWinner();

        count = 1;
        let topLeftCol = col - 1;
        let topLeftRow = row - 1;
        while (
            topLeftCol >= 0 &&
            topLeftRow >= 0 &&
            this.cells[topLeftCol][topLeftRow].style.backgroundColor ===
                currentColor
        ) {
            count++;
            topLeftCol--;
            topLeftRow--;
        }
        let bottomRightCol = col + 1;
        let bottomRightRow = row + 1;
        while (
            bottomRightCol < this.colomnCount &&
            bottomRightRow < this.cellsCount &&
            this.cells[bottomRightCol][bottomRightRow].style.backgroundColor ===
                currentColor
        ) {
            count++;
            bottomRightCol++;
            bottomRightRow++;
        }
        if (count >= 4) return this.declareWinner();

        count = 1;
        let topRightCol = col + 1;
        let topRightRow = row - 1;
        while (
            topRightCol < this.colomnCount &&
            topRightRow >= 0 &&
            this.cells[topRightCol][topRightRow].style.backgroundColor ===
                currentColor
        ) {
            count++;
            topRightCol++;
            topRightRow--;
        }
        let bottomLeftCol = col - 1;
        let bottomLeftRow = row + 1;
        while (
            bottomLeftCol >= 0 &&
            bottomLeftRow < this.cellsCount &&
            this.cells[bottomLeftCol][bottomLeftRow].style.backgroundColor ===
                currentColor
        ) {
            count++;
            bottomLeftCol--;
            bottomLeftRow++;
        }
        if (count >= 4) return this.declareWinner();

        return (this.gameOver = false);
    }

    showResetButton() {
        if (document.querySelector(".reset")) return;

        const div = document.querySelector(".game");
        const reset = document.createElement("button");
        reset.setAttribute("type", "button");
        reset.setAttribute("class", "reset");
        reset.textContent = "Rejouer";

        reset.onclick = () => {
            window.location.reload();
        };

        div.appendChild(reset);
    }

    declareWinner() {
        this.players[this.currentPlayId].win++;
        this.gameOver = true;

        alert(`Le joueur ${colors[this.currentPlayId].name} a gagné !`);

        this.showResetButton();
        this.showResetButton.onclick = () => {
            window.location.reload();
        };
        const grid = document.querySelector(".grid");
        grid.style.opacity = "0.5";
        document.querySelectorAll(".colomn").forEach((col) => {
            col.onclick = null;
        });

        div.appendChild(reset);
        return true;
    }
}
