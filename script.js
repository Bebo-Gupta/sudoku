let nums = document.getElementsByClassName("nums")

let temp = Array.from(nums)

for (let i = 2; i < temp.length; i = i + 3) {
    temp[i].style.borderBottom = "3px solid black"
}


for (let i = 0; i < temp.length; i++) {
    temp[i].addEventListener('input', () => {
        if (temp[i].value != '' && (temp[i].value < 1 || temp[i].value > 9)) {
            alert("Enter a Number from 1-9");
            temp[i].value = null;
        }
    })
}

let button = document.getElementById("button")


button.addEventListener('click', getInput);

function getInput() {
    let nums = document.getElementsByTagName("input")
    let numarr = Array.from(nums)

    var board = Array.from({ length: 9 }, () => Array(9).fill('.'))
    let k = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (numarr[k].value) {
                board[j][i] = numarr[k].value;
            }
            k++;
        }
    }
    if (isInitialBoardValid(board)) {
        solveSudoku(board);
        printSolution(board, numarr)
    }
    else {
        alert("Unsolvalble Sudoku. Check values again.")

    }

}

function solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (let val = '1'; val <= '9'; val++) {
                    if (isvalid(board, i, j, val)) {
                        board[i][j] = val;
                        if (solveSudoku(board) == true)
                            return true;
                        else
                            board[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }

    return true;
}

function isvalid(board, row, col, val) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == val)
            return false;
        if (board[i][col] == val)
            return false;
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == val)
            return false;
    }
    return true;
}

function isInitialBoardValid(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val !== '.') {
                board[r][c] = '.'; // Temporarily remove to test validity
                const valid = isvalid(board, r, c, val);
                board[r][c] = val; // Restore original value
                if (!valid) return false;
            }
        }
    }
    return true;
}

function printSolution(board, numarr) {
    let k = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            numarr[k].value = board[j][i];

            k++;
        }
    }
}