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
        score: 'VICTORIES',
        yourChoice: 'YOUR CHOICE',
        bonusRound: 'BONUS ROUND!',
        bonusWin: 'GRAND PRIZE! LEGENDARY!',
        perfectScore: 'PERFECT! You are a true champion! 🏆',
        greatScore: 'AMAZING! Keep up the great work! 🌟',
        goodScore: 'GOOD JOB! Practice makes perfect! 💪',
        tryAgain: 'Never give up! Every master was once a beginner! 🎯',
        selectMode: 'CHOOSE GAME MODE',
        soloMode: 'SOLO PLAY',
        aiMode: 'VS AI OPPONENT',
        aiName: 'LUCKY BOT',
        aiChoice: 'AI CHOICE',
        youWin: 'YOU WIN!',
        aiWins: 'AI WINS!',
        draw: 'IT\'S A TIE!',
        vsAI: 'VS'
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
        score: '勝利',
        yourChoice: '你的選擇',
        bonusRound: '獎金回合!',
        bonusWin: '大獎! 傳奇!',
        perfectScore: '完美！你是真正的冠軍！🏆',
        greatScore: '驚人！繼續保持！🌟',
        goodScore: '做得好！熟能生巧！💪',
        tryAgain: '永不放棄！每個大師都曾是初學者！🎯',
        selectMode: '選擇遊戲模式',
        soloMode: '單人遊戲',
        aiMode: '對戰AI',
        aiName: '幸運機器人',
        aiChoice: 'AI選擇',
        youWin: '你贏了！',
        aiWins: 'AI贏了！',
        draw: '平手！',
        vsAI: 'VS'
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
        // Spinning animation - multiple full rotations then land on target
        const target = getAngles(targetColor);
        // Add exactly 4 full rotations (1440deg) to the target angles for smooth landing
        const spinX = target.x + 1440;
        const spinY = target.y + 1440;
        style = {
            transform: `rotateX(${spinX}deg) rotateY(${spinY}deg)`,
            transition: 'transform 12s cubic-bezier(0.2, 0.8, 0.4, 1)'
        };
    } else {
        const target = getAngles(color);
        style = {
            transform: `rotateX(${target.x}deg) rotateY(${target.y}deg)`,
            transition: 'transform 0.5s ease-out'
        };
    }

    return (
        <div className="scene dice-container mx-auto my-8">
            <div className="cube" style={style}>
                <div className="cube__face face-red"></div>
                <div className="cube__face face-blue"></div>
                <div className="cube__face face-yellow"></div>
                <div className="cube__face face-green"></div>
                <div className="cube__face face-white"></div>
                <div className="cube__face face-pink"></div>
            </div>
        </div>
    );
};

const App = () => {
    const [lang, setLang] = useState('en');
    const [screen, setScreen] = useState('menu'); // menu, modeSelect, setup, game, gameover, credits, tutorial
    const [gameMode, setGameMode] = useState('solo'); // 'solo' or 'ai'
    const [name, setName] = useState('');
    const [wins, setWins] = useState(0);
    const [round, setRound] = useState(1);
    const [isBonusRound, setIsBonusRound] = useState(false);
    const [bonusWon, setBonusWon] = useState(false);
    
    // Game State
    const [selectedColor, setSelectedColor] = useState(null);
    const [diceResult, setDiceResult] = useState('red');
    const [isRolling, setIsRolling] = useState(false);
    const [targetRoll, setTargetRoll] = useState(null);
    const [lastResult, setLastResult] = useState(null); // 'win', 'lose', null
    const [powText, setPowText] = useState(null);
    
    // AI State
    const [aiWins, setAiWins] = useState(0);
    const [aiSelectedColor, setAiSelectedColor] = useState(null);
    const [aiLastResult, setAiLastResult] = useState(null);

    const t = STRINGS[lang];

    const handleStart = () => {
        setScreen('modeSelect');
    };
    
    const selectMode = (mode) => {
        setGameMode(mode);
        setScreen('setup');
    };

    const startGame = () => {
        if(!name.trim()) return;
        setScreen('game');
        setRound(1);
        setWins(0);
        setAiWins(0);
        setIsBonusRound(false);
        setBonusWon(false);
        resetRound();
    };

    const resetRound = () => {
        setSelectedColor(null);
        setLastResult(null);
        setPowText(null);
        setAiSelectedColor(null);
        setAiLastResult(null);
        
        // AI makes its choice
        if (gameMode === 'ai') {
            const colors = ['red', 'blue', 'yellow', 'green', 'white', 'pink'];
            const aiChoice = colors[Math.floor(Math.random() * colors.length)];
            setAiSelectedColor(aiChoice);
        }
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
            
            // Check player result
            if(result === selectedColor) {
                setWins(w => w + 1);
                setLastResult('win');
                if(isBonusRound) {
                    setPowText(t.bonusWin);
                    setBonusWon(true);
                } else {
                    setPowText(t.win);
                }
            } else {
                setLastResult('lose');
                setPowText(t.lose);
            }
            
            // Check AI result if in AI mode
            if(gameMode === 'ai' && aiSelectedColor) {
                if(result === aiSelectedColor) {
                    setAiWins(w => w + 1);
                    setAiLastResult('win');
                } else {
                    setAiLastResult('lose');
                }
            }
        }, 12000);
    };

    const nextRound = () => {
        if(round < 3) {
            setRound(r => r + 1);
            resetRound();
        } else if(wins === 3 && !isBonusRound) {
            // Player got 3 wins, give bonus round
            setIsBonusRound(true);
            setRound(4);
            resetRound();
        } else {
            setScreen('gameover');
        }
    };

    const restart = () => {
        setScreen('menu');
        setName('');
        setGameMode('solo');
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

                    <div className="title-night-market">
                        <div className="title-bet-header">{t.subtitle}</div>
                        <div className="title-split-container">
                            <div className="title-night">NIGHT</div>
                            <div className="title-market">MARKET</div>
                        </div>
                    </div>

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
                        <button onClick={() => setScreen('tutorial')} className="btn-comic btn-comic-blue py-3">
                            {t.tutorial}
                        </button>
                    </div>
                </div>
            )}

            {/* --- MODE SELECTION SCREEN --- */}
            {screen === 'modeSelect' && (
                <div className="panel-comic p-8 w-full max-w-md text-center pop-in relative">
                    <h2 className="font-comic text-4xl mb-6 text-yellow-400" style={{textShadow:'2px 2px 0 #000'}}>{t.selectMode}</h2>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => selectMode('solo')} className="btn-comic py-4">
                            <div className="text-3xl mb-1">🎯</div>
                            {t.soloMode}
                        </button>
                        <button onClick={() => selectMode('ai')} className="btn-comic btn-comic-blue py-4">
                            <div className="text-3xl mb-1">🤖</div>
                            {t.aiMode}
                        </button>
                        <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 mt-2">{t.back}</button>
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
                            <button type="button" onClick={() => setScreen('modeSelect')} className="btn-comic btn-comic-blue flex-1 py-2">{t.back}</button>
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
                    <div className="flex justify-between w-full mb-4 px-2 font-comic text-2xl md:text-3xl text-white" style={{textShadow:'2px 2px 0 #000'}}>
                        <div>{name}</div>
                        <div>{isBonusRound ? t.bonusRound : `ROUND ${round}/3`}</div>
                        <div className="text-yellow-400">{t.score}: {wins}</div>
                    </div>

                    {/* AI Player HUD (if in AI mode) */}
                    {gameMode === 'ai' && (
                        <div className="w-full mb-4 px-2">
                            <div className="panel-comic px-4 py-2 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🤖</span>
                                    <span className="font-comic text-xl text-white">{t.aiName}</span>
                                </div>
                                <div className="font-comic text-xl text-yellow-400">{t.score}: {aiWins}</div>
                            </div>
                        </div>
                    )}

                    {/* Bottom Display: Selected Color & Wins */}
                    <div className="flex justify-between w-full mb-4 px-4">
                        <div className="panel-comic px-4 py-2">
                            <p className="font-comic text-sm text-yellow-400 mb-1">{t.yourChoice}</p>
                            {selectedColor && (
                                <div className={`w-12 h-12 rounded ${COLOR_BG[selectedColor]} border-4 border-white shadow-lg`}></div>
                            )}
                            {!selectedColor && (
                                <div className="w-12 h-12 rounded bg-gray-600 border-4 border-white border-dashed opacity-50"></div>
                            )}
                        </div>
                        
                        {/* AI Choice Display (if in AI mode) */}
                        {gameMode === 'ai' && (
                            <div className="panel-comic px-4 py-2">
                                <p className="font-comic text-sm text-yellow-400 mb-1">{t.aiChoice}</p>
                                {aiSelectedColor && (
                                    <div className={`w-12 h-12 rounded ${COLOR_BG[aiSelectedColor]} border-4 border-white shadow-lg`}></div>
                                )}
                                {!aiSelectedColor && (
                                    <div className="w-12 h-12 rounded bg-gray-600 border-4 border-white border-dashed opacity-50"></div>
                                )}
                            </div>
                        )}
                        <div className="panel-comic px-4 py-2">
                            <p className="font-comic text-sm text-yellow-400 mb-1">{t.score}</p>
                            <p className="font-comic text-3xl text-white" style={{textShadow:'2px 2px 0 #000'}}>{wins}</p>
                        </div>
                    </div>

                    {/* GAME BOARD */}
                    <div className="panel-comic w-full p-6 relative">
                        
                        {powText && (
                            <div className="comic-pow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {powText}
                            </div>
                        )}

                        <Die color={diceResult} isRolling={isRolling} targetColor={targetRoll} />

                        {/* RESULT DISPLAY - Show winning color after roll */}
                        {!isRolling && lastResult !== null && (
                            <div className="mt-6 mb-4">
                                <div className="bg-white border-4 border-black p-4 rounded-lg transform -rotate-1">
                                    <p className="font-comic text-black text-xl mb-2">
                                        {lang === 'en' ? 'WINNING COLOR:' : '中獎顏色:'}
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className={`w-16 h-16 rounded-lg ${COLOR_BG[diceResult]} border-4 border-black shadow-lg`}></div>
                                        <p className="font-comic text-3xl text-black uppercase">{diceResult}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTROLS */}
                        {!isRolling && lastResult === null && (
                            <div className="mt-6">
                                <p className="text-center font-comic text-2xl md:text-3xl mb-4">{t.bet}</p>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {COLORS.map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`swatch h-20 md:h-24 ${COLOR_BG[c]} ${selectedColor === c ? 'selected' : ''}`}
                                        ></button>
                                    ))}
                                </div>
                                <button 
                                    onClick={rollDice} 
                                    disabled={!selectedColor}
                                    className="btn-comic w-full py-4 text-3xl md:text-4xl"
                                >
                                    {t.roll}
                                </button>
                            </div>
                        )}

                        {lastResult !== null && (
                            <div className="mt-6">
                                <button onClick={nextRound} className="btn-comic btn-comic-blue w-full py-4 text-3xl md:text-4xl animate-pulse">
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
                    <h2 className="font-comic text-5xl md:text-6xl text-red-500 mb-4" style={{textShadow:'3px 3px 0 #fff'}}>{t.gameOver}</h2>
                    
                    {/* AI Mode: Show Winner */}
                    {gameMode === 'ai' && (
                        <div className="mb-6">
                            {wins > aiWins && (
                                <div className="text-6xl mb-2">🏆</div>
                            )}
                            {wins < aiWins && (
                                <div className="text-6xl mb-2">🤖</div>
                            )}
                            {wins === aiWins && (
                                <div className="text-6xl mb-2">🤝</div>
                            )}
                            <p className="font-comic text-4xl md:text-5xl text-yellow-400 mb-2">
                                {wins > aiWins ? t.youWin : wins < aiWins ? t.aiWins : t.draw}
                            </p>
                        </div>
                    )}
                    
                    <p className="font-comic text-3xl md:text-4xl text-white mb-8">{name}</p>
                    
                    {/* Score Comparison for AI Mode */}
                    {gameMode === 'ai' ? (
                        <div className="flex gap-4 justify-center mb-4">
                            <div className="bg-white border-4 border-black p-6 transform rotate-2 flex-1">
                                <p className="font-comic text-black text-xl mb-2">{name}</p>
                                <p className="font-comic text-5xl md:text-6xl text-black">{wins}</p>
                            </div>
                            <div className="flex items-center font-comic text-4xl text-yellow-400">
                                {t.vsAI}
                            </div>
                            <div className="bg-white border-4 border-black p-6 transform -rotate-2 flex-1">
                                <p className="font-comic text-black text-xl mb-2">🤖 {t.aiName}</p>
                                <p className="font-comic text-5xl md:text-6xl text-black">{aiWins}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-4 border-black p-6 mb-4 transform rotate-2">
                            <p className="font-comic text-black text-2xl md:text-3xl">FINAL SCORE</p>
                            <p className="font-comic text-7xl md:text-8xl text-black">{wins} / 3</p>
                            {bonusWon && (
                                <div className="mt-4">
                                    <p className="font-comic text-3xl text-yellow-600">🎁 {t.bonusWin} 🎁</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Inspirational Message */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black rounded-lg">
                        <p className="font-comic text-xl md:text-2xl text-black">
                            {gameMode === 'ai' ? (
                                wins > aiWins ? t.perfectScore :
                                wins === aiWins ? t.greatScore :
                                t.tryAgain
                            ) : (
                                bonusWon ? t.perfectScore :
                                wins === 3 ? t.perfectScore :
                                wins === 2 ? t.greatScore :
                                wins === 1 ? t.goodScore :
                                t.tryAgain
                            )}
                        </p>
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
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400" style={{textShadow:'2px 2px 0 #000'}}>{t.credits}</h2>
                    <p className="font-comic text-2xl md:text-3xl text-white mb-4">奎妲兒/dharls</p>
                    <p className="font-comic text-xl md:text-2xl text-white mb-6">樹德科技大學 資訊工程系</p>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-3">{t.back}</button>
                </div>
            )}

            {/* --- TUTORIAL SCREEN --- */}
            {screen === 'tutorial' && (
                <div className="panel-comic p-8 w-full max-w-2xl text-left pop-in overflow-y-auto max-h-[80vh]">
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400 text-center" style={{textShadow:'2px 2px 0 #000'}}>
                        {lang === 'en' ? 'WHAT IS THIS GAME?' : '這是什麼遊戲？'}
                    </h2>
                    
                    <div className="font-comic text-white space-y-6">
                        {lang === 'en' ? (
                            <>
                                <div>
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">Welcome to BET-0-BET!</h3>
                                </div>
                                
                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">1. What is the BET-0-BET Game?</h4>
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        The BET-0-BET Game is a digital version of the most popular game of chance found in Filipino town carnivals (known as Perya). 
                                        It is purely a game of luck where players choose a specific color, hoping that color appears when the dice are rolled.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">2. How to Play:</h4>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2 list-disc list-inside">
                                        <li><strong>Choose a Color:</strong> Simply click on one of the 6 colors on the board (Red, Blue, Yellow, Green, White, or Pink).</li>
                                        <li><strong>Watch the Roll:</strong> The system will roll 1 die.</li>
                                        <li><strong>Collect Credits:</strong> If your color appears, you earn Credits!
                                            <ul className="ml-6 mt-1 space-y-1">
                                                <li>• Single Match: Earn points for 1 match.</li>
                                                <li>• Double/Triple Match: Earn huge bonus points!</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">3. The "Survival" Rule (Chances):</h4>
                                    <p className="text-lg md:text-xl leading-relaxed mb-2">
                                        To keep the game exciting, you have a limit on how long you can play!
                                    </p>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2 list-disc list-inside">
                                        <li><strong>Starting Life:</strong> You start with 3 Chances.</li>
                                        <li><strong>Winning Bonus:</strong> If you win 3 times, you gain +1 Chance!</li>
                                        <li><strong>Game Over:</strong> If you run out of Chances, the game ends.</li>
                                    </ul>
                                </div>

                                <div className="text-center">
                                    <p className="text-xl md:text-2xl text-yellow-400 font-bold">
                                        Can you get the highest score before your chances run out? Good luck!
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">歡迎來到BET-0-BET！</h3>
                                </div>
                                
                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">1. 什麼是BET-0-BET遊戲？</h4>
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        BET-0-BET遊戲是菲律賓鎮上嘉年華（稱為Perya）中最受歡迎的機會遊戲的數字版本。
                                        這純粹是一個運氣遊戲，玩家選擇一個特定的顏色，希望在擲骰子時出現該顏色。
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">2. 如何玩：</h4>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2 list-disc list-inside">
                                        <li><strong>選擇顏色：</strong> 只需點擊板上的6種顏色之一（紅色、藍色、黃色、綠色、白色或粉紅色）。</li>
                                        <li><strong>觀看擲骰：</strong> 系統將擲1個骰子。</li>
                                        <li><strong>收集積分：</strong> 如果您的顏色出現，您將獲得積分！
                                            <ul className="ml-6 mt-1 space-y-1">
                                                <li>• 單次匹配：獲得1次匹配的積分。</li>
                                                <li>• 雙/三次匹配：獲得巨大的獎勵積分！</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">3. "生存"規則（機會）：</h4>
                                    <p className="text-lg md:text-xl leading-relaxed mb-2">
                                        為了保持遊戲的刺激性，您可以玩的時間有限！
                                    </p>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2 list-disc list-inside">
                                        <li><strong>起始生命：</strong> 您從3次機會開始。</li>
                                        <li><strong>獲勝獎勵：</strong> 如果您贏了3次，您將獲得+1次機會！</li>
                                        <li><strong>遊戲結束：</strong> 如果您用完了機會，遊戲結束。</li>
                                    </ul>
                                </div>

                                <div className="text-center">
                                    <p className="text-xl md:text-2xl text-yellow-400 font-bold">
                                        在機會用完之前，您能獲得最高分嗎？祝你好運！
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-3 w-full mt-6">{t.back}</button>
                </div>
            )}

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
