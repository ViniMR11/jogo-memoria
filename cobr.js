const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

// Configurações iniciais
const box = 20;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = 'RIGHT';
let fruit = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let score = 0;
let game;
let gameSpeed = 150; // Velocidade do jogo ajustada para 150ms

// Controle de direção com W, A, S, D
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    const key = event.keyCode;
    if ((key === 37 || key === 65) && direction !== 'RIGHT') direction = 'LEFT';  // Esquerda (Seta ou A)
    else if ((key === 38 || key === 87) && direction !== 'DOWN') direction = 'UP';   // Cima (Seta ou W)
    else if ((key === 39 || key === 68) && direction !== 'LEFT') direction = 'RIGHT'; // Direita (Seta ou D)
    else if ((key === 40 || key === 83) && direction !== 'UP') direction = 'DOWN';    // Baixo (Seta ou S)
}

// Desenha a cobra com bordas mais suaves
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#4caf50' : '#81c784';
        ctx.strokeStyle = '#2e7d32';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Desenha a fruta em formato de círculo
function drawFruit() {
    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.arc(fruit.x + box / 2, fruit.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();
}

// Função principal do jogo
function gameLoop() {
    // Atualiza a posição da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Se a cobra comer a fruta
    if (snakeX === fruit.x && snakeY === fruit.y) {
        score++;
        fruit = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        // Remove a cauda
        snake.pop();
    }

    // Adiciona uma nova cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over: se a cobra colidir com as paredes ou com ela mesma
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Frutas coletadas: ' + score);
        return;
    }

    snake.unshift(newHead);

    // Limpa o canvas e redesenha a cobra e a fruta
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFruit();

    // Exibe a pontuação
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText('Frutas: ' + score, box, box * 1.5);
}

// Verifica colisão da cobra
function collision(head, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

// Função para resetar o jogo
function resetGame() {
    clearInterval(game);
    snake = [{ x: 8 * box, y: 8 * box }];
    direction = 'RIGHT';
    fruit = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
    };
    score = 0;
    game = setInterval(gameLoop, gameSpeed);
}

// Inicia o jogo
game = setInterval(gameLoop, gameSpeed);
