const { useState, useRef } = React;

// --- STRINGS ---

const STRINGS = {
    en: {
        title: 'NIGHT MARKET',
        subtitle: 'BET-0-BET',
        play: 'ENTER THE MARKET',
        options: 'SETTINGS',
        credits: 'DEVELOPERS',
        tutorial: 'GAME RULES',
        exit: 'QUIT',
        back: 'RETURN',
        start: 'BEGIN',
        enterId: 'ENTER YOUR NAME:',
        bet: 'CHOOSE YOUR LUCKY COLOR',
        roll: 'ROLL THE DICE!',
        next: 'NEXT ROUND',
        win: 'JACKPOT! WINNER!',
        lose: 'BAD LUCK!',
        gameOver: 'MARKET CLOSED',
        playAgain: 'PLAY AGAIN',
        score: 'VICTORIES'
    },
    zh: {
        title: '夜市',
        subtitle: 'BET-0-BET',
        play: '進入夜市',
        options: '設置',
        credits: '開發者',
        tutorial: '遊戲規則',
        exit: '退出',
        back: '返回',
        start: '開始',
        enterId: '輸入你的名字:',
        bet: '選擇你的幸運顏色',
        roll: '擲骰子!',
        next: '下一輪',
        win: '大獎! 贏家!',
        lose: '運氣不好!',
        gameOver: '夜市關閉',
        playAgain: '再玩一次',
        score: '勝利'
    }
};

const COLORS = ['red', 'blue', 'green', 'yellow', 'white', 'pink'];

// Tailwind classes for the swatches
const COLOR_BG = {
    red: 'bg-red-600',
    blue: 'bg-blue-600',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    white: 'bg-gray-100',
    pink: 'bg-pink-500'
};

// --- COMPONENTS ---

const Die = ({ color, isRolling, targetColor }) => {
    // Angles to show specific face
    const getAngles = (c) => {
        switch(c) {
            case 'red': return { x: 0, y: 0 };
            case 'blue': return { x: 0, y: -90 };
            case 'green': return { x: 0, y: 90 };
            case 'yellow': return { x: 0, y: 180 };
            case 'white': return { x: -90, y: 0 };
            case 'pink': return { x: 90, y: 0 };
            default: return { x: 0, y: 0 };
        }
    };

    let style = {};
    
    if (isRolling && targetColor) {
        // Spinning animation logic
        const target = getAngles(targetColor);
        // Add lots of spins (720deg + random extra)
        const spinX = target.x + 720 + (Math.random() * 360); 
        const spinY = target.y + 720 + (Math.random() * 360);
        style = {
            transform: `rotateX(${spinX}deg) rotateY(${spinY}deg)`,
            transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.4, 1)'
        };
    } else {
        const target = getAngles(color);
        style = {
            transform: `rotateX(${target.x}deg) rotateY(${target.y}deg)`,
            transition: 'transform 0.5s ease-out'
        };
    }

    return (
        <div className="scene w-40 h-40 mx-auto my-8">
            <div className="cube" style={style}>
                <div className="cube__face face-red" style={{transform: 'rotateY(0deg) translateZ(80px)'}}></div>
                <div className="cube__face face-blue" style={{transform: 'rotateY(90deg) translateZ(80px)'}}></div>
                <div className="cube__face face-yellow" style={{transform: 'rotateY(180deg) translateZ(80px)'}}></div>
                <div className="cube__face face-green" style={{transform: 'rotateY(-90deg) translateZ(80px)'}}></div>
                <div className="cube__face face-white" style={{transform: 'rotateX(90deg) translateZ(80px)'}}></div>
                <div className="cube__face face-pink" style={{transform: 'rotateX(-90deg) translateZ(80px)'}}></div>
            </div>
        </div>
    );
};

const App = () => {
    const [lang, setLang] = useState('en');
    const [screen, setScreen] = useState('menu'); // menu, setup, game, gameover, credits
    const [name, setName] = useState('');
    const [wins, setWins] = useState(0);
    const [round, setRound] = useState(1);
    
    // Game State
    const [selectedColor, setSelectedColor] = useState(null);
    const [diceResult, setDiceResult] = useState('red');
    const [isRolling, setIsRolling] = useState(false);
    const [targetRoll, setTargetRoll] = useState(null);
    const [lastResult, setLastResult] = useState(null); // 'win', 'lose', null
    const [powText, setPowText] = useState(null);

    const t = STRINGS[lang];

    const handleStart = () => {
        setScreen('setup');
    };

    const startGame = () => {
        if(!name.trim()) return;
        setScreen('game');
        setRound(1);
        setWins(0);
        resetRound();
    };

    const resetRound = () => {
        setSelectedColor(null);
        setLastResult(null);
        setPowText(null);
    };

    const rollDice = () => {
        if(!selectedColor || isRolling) return;
        
        const result = COLORS[Math.floor(Math.random() * COLORS.length)];
        setTargetRoll(result);
        setIsRolling(true);
        setPowText(null);

        setTimeout(() => {
            setIsRolling(false);
            setDiceResult(result);
            
            if(result === selectedColor) {
                setWins(w => w + 1);
                setLastResult('win');
                setPowText(t.win);
            } else {
                setLastResult('lose');
                setPowText(t.lose);
            }
        }, 2000);
    };

    const nextRound = () => {
        if(round < 3) {
            setRound(r => r + 1);
            resetRound();
        } else {
            setScreen('gameover');
        }
    };

    const restart = () => {
        setScreen('menu');
        setName('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
            
            {/* --- MENU SCREEN --- */}
            {screen === 'menu' && (
                <div className="flex flex-col items-center w-full max-w-md pop-in relative">
                    {/* Decorative Lanterns */}
                    <div className="lantern lantern-left"></div>
                    <div className="lantern lantern-right"></div>
                    {/* Decorative Burst */}
                    <div className="burst-star top-10 left-10"></div>
                    <div className="burst-star bottom-10 right-10" style={{background:'#ff3333'}}></div>
                    {/* Night Market Toys */}
                    <div className="toy-pic toy-1">🧸</div>
                    <div className="toy-pic toy-2">🦆</div>
                    <div className="toy-pic toy-3">🚗</div>
                    <div className="toy-pic toy-4">🎈</div>
                    <div className="toy-pic toy-5">🎪</div>
                    <div className="toy-pic toy-6">🎯</div>

                    <h1 className="title-night-market">
                        {t.title}<br/>
                        <span className="text-4xl text-white" style={{textShadow:'2px 2px 0 #000'}}>{t.subtitle}</span>
                    </h1>

                    <div className="flex flex-col gap-4 w-full px-8 mt-8">
                        <button onClick={handleStart} className="btn-comic py-3">
                            {t.play}
                        </button>
                        <button onClick={() => setLang(l => l==='en'?'zh':'en')} className="btn-comic btn-comic-blue py-3">
                            {t.options}: {lang === 'en' ? 'ENGLISH' : '中文'}
                        </button>
                        <button onClick={() => setScreen('credits')} className="btn-comic btn-comic-blue py-3">
                            {t.credits}
                        </button>
                    </div>

                    {/* OWNER CREDIT */}
                    <div className="mt-12 text-center">
                        <p className="font-comic text-yellow-400 text-lg tracking-widest" style={{textShadow:'2px 2px 0 #000'}}>
                            OWNER: 奎妲兒 / dharls
                        </p>
                    </div>
                </div>
            )}

            {/* --- SETUP SCREEN --- */}
            {screen === 'setup' && (
                <div className="panel-comic p-8 w-full max-w-md text-center pop-in relative">
                    {/* Ambiance Elements */}
                    <div className="setup-toy setup-toy-1">🧸</div>
                    <div className="setup-toy setup-toy-2">🎈</div>
                    <h2 className="font-comic text-4xl mb-6 text-yellow-400" style={{textShadow:'2px 2px 0 #000'}}>{t.enterId}</h2>
                    <form onSubmit={(e) => {e.preventDefault(); startGame();}}>
                        <input 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="input-comic w-full mb-8"
                            placeholder="PLAYER 1"
                            autoFocus
                        />
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue flex-1 py-2">{t.back}</button>
                            <button type="submit" disabled={!name} className="btn-comic flex-1 py-2">{t.start}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* --- GAME SCREEN --- */}
            {screen === 'game' && (
                <div className="w-full max-w-lg flex flex-col items-center relative">
                    {/* Game Ambiance */}
                    <div className="game-lantern game-lantern-left"></div>
                    <div className="game-lantern game-lantern-right"></div>
                    <div className="game-toy game-toy-1">🎯</div>
                    <div className="game-toy game-toy-2">🦆</div>
                    
                    {/* HUD */}
                    <div className="flex justify-between w-full mb-4 px-2 font-comic text-xl text-white" style={{textShadow:'2px 2px 0 #000'}}>
                        <div>{name}</div>
                        <div>ROUND {round}/3</div>
                        <div className="text-yellow-400">{t.score}: {wins}</div>
                    </div>

                    {/* GAME BOARD */}
                    <div className="panel-comic w-full p-6 relative">
                        
                        {powText && (
                            <div className="comic-pow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {powText}
                            </div>
                        )}

                        <Die color={diceResult} isRolling={isRolling} targetColor={targetRoll} />

                        {/* CONTROLS */}
                        {!isRolling && lastResult === null && (
                            <div className="mt-6">
                                <p className="text-center font-comic text-xl mb-2">{t.bet}</p>
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {COLORS.map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`swatch h-16 ${COLOR_BG[c]} ${selectedColor === c ? 'selected' : ''}`}
                                        ></button>
                                    ))}
                                </div>
                                <button 
                                    onClick={rollDice} 
                                    disabled={!selectedColor}
                                    className="btn-comic w-full py-4 text-2xl"
                                >
                                    {t.roll}
                                </button>
                            </div>
                        )}

                        {lastResult !== null && (
                            <div className="mt-6">
                                <button onClick={nextRound} className="btn-comic btn-comic-blue w-full py-4 text-2xl animate-pulse">
                                    {t.next} &gt;&gt;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- GAME OVER --- */}
            {screen === 'gameover' && (
                <div className="panel-comic p-10 text-center pop-in">
                    <h2 className="font-comic text-5xl text-red-500 mb-2" style={{textShadow:'3px 3px 0 #fff'}}>{t.gameOver}</h2>
                    <p className="font-comic text-2xl text-white mb-8">{name}</p>
                    
                    <div className="bg-white border-4 border-black p-4 mb-8 transform rotate-2">
                        <p className="font-comic text-black text-xl">FINAL SCORE</p>
                        <p className="font-comic text-6xl text-black">{wins} / 3</p>
                    </div>

                    <button onClick={restart} className="btn-comic w-full py-3">
                        {t.playAgain}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue w-full py-3 mt-4">
                        {t.exit}
                    </button>
                </div>
            )}

            {/* --- CREDITS SCREEN --- */}
            {screen === 'credits' && (
                <div className="panel-comic p-8 w-full max-w-md text-center pop-in">
                    <h2 className="font-comic text-4xl mb-6 text-yellow-400" style={{textShadow:'2px 2px 0 #000'}}>{t.credits}</h2>
                    <p className="font-comic text-xl text-white mb-4">Game by: 奎妲兒 / dharls</p>
                    <h3 className="font-comic text-2xl text-yellow-400 mb-4">{t.tutorial}</h3>
                    <p className="font-comic text-lg text-white mb-6">
                        {lang === 'en' ? 
                            "Welcome to the Night Market! Choose your lucky color and roll the dice. Match the color to win the round. Survive 3 rounds to claim your prize!" :
                            "歡迎來到夜市！選擇你的幸運顏色並擲骰子。匹配顏色贏得這一輪。存活3輪來獲得你的獎品！"
                        }
                    </p>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-3">{t.back}</button>
                </div>
            )}

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
