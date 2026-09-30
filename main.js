/**
 * 스네이크 게임 (Snake Game) - 메인 자바스크립트
 * 규칙: 400x400 캔버스, 20x20 격자, 방향키 조종, 먹이 섭취 시 +10점 및 몸길이 증가, 충돌 시 게임 오버, 최고점수 LocalStorage 저장
 */

// 캔버스 및 콘텍스트 참조
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// DOM 요소 참조
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const finalScoreEl = document.getElementById('finalScore');
const startOverlay = document.getElementById('startOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// 격자 및 게임 상수 (20x20 격자, 400x400 캔버스)
const GRID_SIZE = 20;   // 한 타일의 크기 (20px)
const TILE_COUNT = 20;  // 타일 개수 (20개 -> 20 * 20 = 400px)
const GAME_SPEED = 110; // 게임 루프 속도 (ms)

// 게임 상태 변수
let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = -1;
let nextDx = 0;
let nextDy = -1;
let score = 0;
let highScore = 0;
let gameInterval = null;
let isRunning = false;

// 최고 점수 LocalStorage에서 불러오기
function loadHighScore() {
  const saved = localStorage.getItem('snake_high_score');
  highScore = saved ? parseInt(saved, 10) : 0;
  highScoreEl.textContent = highScore;
}

// 최고 점수 저장하기
function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snake_high_score', highScore);
    highScoreEl.textContent = highScore;
  }
}

// 게임 초기화
function initGame() {
  // 뱀 초기 위치 (중앙에 3칸)
  snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
  ];

  // 초기 이동 방향: 위쪽
  dx = 0;
  dy = -1;
  nextDx = 0;
  nextDy = -1;

  score = 0;
  scoreEl.textContent = score;

  spawnFood();
  draw();
}

// 무작위 먹이 생성 (뱀 몸과 겹치지 않게)
function spawnFood() {
  let valid = false;
  while (!valid) {
    food.x = Math.floor(Math.random() * TILE_COUNT);
    food.y = Math.floor(Math.random() * TILE_COUNT);
    
    // 뱀의 어느 조각과도 겹치지 않는지 검사
    valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
  }
}

// 게임 시작
function startGame() {
  initGame();
  startOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  isRunning = true;

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, GAME_SPEED);
}

// 게임 루프 (이동, 충돌 검사, 렌더링)
function gameLoop() {
  if (!isRunning) return;

  // 방향 업데이트 (180도 반대 이동 방지)
  dx = nextDx;
  dy = nextDy;

  // 다음 머리 위치 계산
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // 1. 벽 충돌 검사 (400x400 범위 벗어남)
  if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
    triggerGameOver();
    return;
  }

  // 2. 자기 몸 충돌 검사
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    triggerGameOver();
    return;
  }

  // 머리를 뱀 제일 앞에 추가
  snake.unshift(head);

  // 3. 먹이 섭취 검사
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    saveHighScore();
    spawnFood();
  } else {
    // 먹이를 먹지 않았으면 꼬리 하나 자르기 (몸길이 유지)
    snake.pop();
  }

  // 화면 렌더링
  draw();
}

// 게임 화면 그리기
function draw() {
  // 1. 배경 클리어
  ctx.fillStyle = '#0b1329';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. 배경 격자 무늬 그리기 (은은한 가이드라인)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= TILE_COUNT; i++) {
    ctx.beginPath();
    ctx.moveTo(i * GRID_SIZE, 0);
    ctx.lineTo(i * GRID_SIZE, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * GRID_SIZE);
    ctx.lineTo(canvas.width, i * GRID_SIZE);
    ctx.stroke();
  }

  // 3. 먹이 그리기 (빨간색 동그라미 & 글로우)
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  const foodRadius = GRID_SIZE / 2 - 2;
  ctx.arc(
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    foodRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.shadowBlur = 0; // 글로우 리셋

  // 4. 뱀 그리기
  snake.forEach((segment, index) => {
    const x = segment.x * GRID_SIZE;
    const y = segment.y * GRID_SIZE;

    if (index === 0) {
      // 뱀 머리 (밝은 네온 그린 & 라운드)
      ctx.fillStyle = '#4ade80';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 10;
      drawRoundedRect(ctx, x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 6);
      ctx.shadowBlur = 0;

      // 뱀 눈 표현
      ctx.fillStyle = '#090d16';
      const eyeSize = 3;
      if (dx === 1) { // 오른쪽
        ctx.fillRect(x + 13, y + 5, eyeSize, eyeSize);
        ctx.fillRect(x + 13, y + 12, eyeSize, eyeSize);
      } else if (dx === -1) { // 왼쪽
        ctx.fillRect(x + 4, y + 5, eyeSize, eyeSize);
        ctx.fillRect(x + 4, y + 12, eyeSize, eyeSize);
      } else if (dy === -1) { // 위쪽
        ctx.fillRect(x + 5, y + 4, eyeSize, eyeSize);
        ctx.fillRect(x + 12, y + 4, eyeSize, eyeSize);
      } else { // 아래쪽
        ctx.fillRect(x + 5, y + 13, eyeSize, eyeSize);
        ctx.fillRect(x + 12, y + 13, eyeSize, eyeSize);
      }
    } else {
      // 뱀 몸통 (에메랄드 그린)
      ctx.fillStyle = '#22c55e';
      drawRoundedRect(ctx, x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4, 4);
    }
  });
}

// 라운드 사각형 헬퍼 함수
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// 게임 오버 처리
function triggerGameOver() {
  isRunning = false;
  if (gameInterval) clearInterval(gameInterval);

  saveHighScore();
  finalScoreEl.textContent = score;
  gameOverOverlay.classList.remove('hidden');
}

// 키보드 조작 이벤트 (방향키)
document.addEventListener('keydown', (e) => {
  // Arrow keys navigation
  switch (e.key) {
    case 'ArrowUp':
      if (dy !== 1) { // 아래로 이동 중이 아닐 때만 위로
        nextDx = 0;
        nextDy = -1;
      }
      e.preventDefault();
      break;
    case 'ArrowDown':
      if (dy !== -1) { // 위로 이동 중이 아닐 때만 아래로
        nextDx = 0;
        nextDy = 1;
      }
      e.preventDefault();
      break;
    case 'ArrowLeft':
      if (dx !== 1) { // 오른쪽으로 이동 중이 아닐 때만 왼쪽으로
        nextDx = -1;
        nextDy = 0;
      }
      e.preventDefault();
      break;
    case 'ArrowRight':
      if (dx !== -1) { // 왼쪽으로 이동 중이 아닐 때만 오른쪽으로
        nextDx = 1;
        nextDy = 0;
      }
      e.preventDefault();
      break;
  }
});

// 버튼 이벤트 바인딩
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// 페이지 로드 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadHighScore();
  initGame();
});
