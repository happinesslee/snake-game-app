# 🐍 스네이크 게임 (Snake Game)

HTML5 Canvas와 Vanilla JavaScript로 제작된 클래식 고전 스네이크(뱀 주사위) 게임입니다.  
깔끔한 네온 스타일의 UI 디자인과 애니메이션 효과, 그리고 브라우저 `LocalStorage`를 활용한 최고 점수 저장 기능을 제공합니다.

---

## ✨ 주요 기능 (Features)

- **🎮 반응형 HTML5 Canvas 게임 구현**: 400x400 해상도 및 20x20 타일 격자 기반으로 부드러운 게임 플레이 제공
- **⌨️ 직관적인 방향키 조작**: 키보드 방향키(`↑`, `↓`, `←`, `→`)로 뱀의 진행 방향 조종
- **🍎 먹이 획득 및 성장**: 먹이를 획득할 때마다 점수가 +10점 올라가며, 뱀의 몸길이가 길어집니다.
- **💥 충돌 감지 (벽 및 자기 몸체)**: 벽면 외곽에 부딪히거나 자신의 몸에 부딪히면 게임 오버 오버레이 화면이 표시됩니다.
- **🏆 최고 점수 (High Score) 자동 저장**: `LocalStorage` 연동으로 브라우저를 다시 켜도 나의 최고 기록이 유지됩니다.
- **🖼️ 스타일리시한 오버레이 화면**: 게임 시작 전 및 게임 오버 시 결과 창과 재시작 버튼 제공

---

## 🕹️ 게임 조작 방법 (Controls)

| 키보드 입력 | 기능 |
| :---: | :--- |
| **`↑` (위쪽 방향키)** | 위쪽으로 이동 |
| **`↓` (아래쪽 방향키)** | 아래쪽으로 이동 |
| **`←` (왼쪽 방향키)** | 왼쪽으로 이동 |
| **`→` (오른쪽 방향키)** | 오른쪽으로 이동 |

---

## 🛠️ 기술 스택 (Tech Stack)

- **HTML5**: Canvas Element 렌더링
- **CSS3**: Modern Flexbox, CSS 변수, Google Fonts (`Outfit`, `Plus Jakarta Sans`)
- **JavaScript (ES6+)**: Canvas 2D Context API, 게임 루프(`setInterval`), LocalStorage API

---

## 📁 프로젝트 구조 (Directory Structure)

```text
Snake game/
├── index.html   # 메인 HTML 및 Canvas 구조
├── style.css    # 게임 디자인 및 오버레이 CSS 스타일
├── main.js      # 게임 루프, 충돌 알고리즘 및 렌더링 자바스크립트 로직
└── README.md    # 프로젝트 설명서
```

---

## 🚀 실행 방법 (Getting Started)

1. 이 저장소를 클론(Clone)합니다:
   ```bash
   git clone https://github.com/happinesslee/snake-game-app.git
   ```
2. `index.html` 파일을 브라우저(Chrome, Edge, Safari 등)에서 더블 클릭하여 실행합니다.

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.
