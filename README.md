# Pokémon Type Master 🎮

An engaging, gaming-focused web application that tests your knowledge of Pokémon type effectiveness matchups. Built with React, TypeScript, and Vite.

![Pokémon Type Master](./public/pokeball.svg)

## 🎯 Features

- **Immersive Gaming Experience**: Polished UI with smooth animations and visual feedback
- **Score Tracking**: Real-time score, streak counter, and accuracy statistics
- **18 Pokémon Types**: Complete type chart with all type effectiveness matchups
- **Persistent Progress**: Your stats are saved automatically using localStorage
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Streak Bonuses**: Earn bonus points for consecutive correct answers

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd pogoweakV2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. You'll be presented with two Pokémon types: an **attacking type** and a **defending type**
2. Choose the correct effectiveness:
   - **Super Effective** (2x damage)
   - **Normal** (1x damage)
   - **Not Very Effective** (0.5x damage)
   - **No Effect** (0x damage)
3. Build up your streak to earn bonus points!
4. Try to beat your best streak and improve your accuracy

## 🛠️ Built With

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

## 📁 Project Structure

```
pogoweakV2/
├── src/
│   ├── components/
│   │   ├── TypeCard.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── AnswerButtons.tsx
│   │   └── FeedbackOverlay.tsx
│   ├── gameData.ts       # Type chart and colors
│   ├── gameUtils.ts      # Game logic
│   ├── types.ts          # TypeScript definitions
│   ├── App.tsx           # Main app component
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
│   └── pokeball.svg
├── index.html
└── package.json
```

## 🎨 Features in Detail

### Type Effectiveness System

- Comprehensive type chart covering all 18 Pokémon types
- Accurate effectiveness calculations based on official Pokémon games

### Scoring System

- Base score: 100 points per correct answer
- Streak bonus: Up to 200 additional points
- Tracks best streak and overall accuracy

### Visual Design

- Gaming-focused aesthetic with vibrant colors
- Smooth animations and transitions
- Visual feedback for correct/incorrect answers
- Responsive layout for all screen sizes

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

- Sound effects and background music
- Multiple difficulty levels
- Timed challenges
- Leaderboard system
- Dual-type effectiveness questions
- Different game modes

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Pokémon type effectiveness data from the official Pokémon games
- Inspired by the Pokémon franchise by Game Freak and Nintendo
