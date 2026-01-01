const { useState, useRef, useEffect } = React;

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
        win: '🎉 JACKPOT! YOU WON! 🎉',
        lose: '😥 SO CLOSE! TRY AGAIN! 😥',
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
        twoPlayerMode: '2 PLAYERS',
        player1: 'PLAYER 1',
        player2: 'PLAYER 2',
        aiName: 'LUCKY BOT',
        aiChoice: 'AI CHOICE',
        youWin: 'YOU WIN!',
        aiWins: 'AI WINS!',
        draw: 'IT\'S A TIE!',
        vsAI: 'VS',
        // Night Market Exploration
        explore: 'EXPLORE MARKET',
        controls: 'Use Arrow Keys ← → to Move | Press SPACE to Interact',
        pressSpace: 'Press SPACE to interact',
        skip: 'SKIP >>',
        continue: 'CONTINUE',
        howToPlay: 'HOW TO PLAY'
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
        win: '🎉 大獎! 你贏了! 🎉',
        lose: '😥 差一點! 再試一次! 😥',
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
        twoPlayerMode: '雙人遊戲',
        player1: '玩家1',
        player2: '玩家2',
        aiName: '幸運機器人',
        aiChoice: 'AI選擇',
        youWin: '你贏了！',
        aiWins: 'AI贏了！',
        draw: '平手！',
        vsAI: 'VS',
        explore: '探索夜市',
        controls: '使用方向鍵 ← → 移動 | 按空格鍵互動',
        pressSpace: '按空格鍵互動',
        skip: '跳過 >>',
        continue: '繼續',
        howToPlay: '如何玩'
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

// --- GAME STALLS DATA ---
const GAME_STALLS = [
    {
        id: 'betgame',
        name: '🔥 BET-O-BET 🔥',
        nameZh: '🔥 賭色遊戲 🔥',
        emoji: '🎲',
        position: 500, // Centered position
        dialogue: [
            { speaker: '🎪 Lucky Vendor', text: "STEP RIGHT UP! 🎉 The LEGENDARY Color Dice awaits!" },
            { speaker: '🎪 Lucky Vendor', text: "🔥 6 COLORS, 1 DESTINY! 🔥 Can YOU beat the odds?" },
            { speaker: '🎪 Lucky Vendor', text: "💎 Choose your lucky color and WIN BIG PRIZES! 💰" },
            { speaker: '🎪 Lucky Vendor', text: "⚡ Get 3 wins for a MEGA BONUS ROUND! ⚡ Are you BRAVE enough?" }
        ],
        dialogueZh: [
            { speaker: '🎪 幸運攤販', text: "快來！🎉 傳說中的顏色骰子等你挑戰！" },
            { speaker: '🎪 幸運攤販', text: "🔥 6種顏色，1次命運！🔥 你能戰勝機率嗎？" },
            { speaker: '🎪 幸運攤販', text: "💎 選擇你的幸運顏色，贏得大獎！💰" },
            { speaker: '🎪 幸運攤販', text: "⚡ 贏3次得到超級獎勵回合！⚡ 你夠勇敢嗎？" }
        ],
        instructions: [
            "🎯 HOW TO WIN BIG:",
            "1️⃣ Pick YOUR lucky color from 6 vibrant choices",
            "2️⃣ Hit ROLL THE DICE and feel the excitement!",
            "3️⃣ Match the color = INSTANT WIN! 💰",
            "4️⃣ Win 3 rounds → Unlock MEGA BONUS ROUND! 🔥",
            "5️⃣ You have 3 chances - make them COUNT!",
            "⭐ LEGEND says: Those with courage WIN the most!"
        ],
        instructionsZh: [
            "🎯 如何大獲全勝:",
            "1️⃣ 從6種鮮豔顏色中選擇你的幸運色",
            "2️⃣ 點擊擲骰子，感受刺激！",
            "3️⃣ 顏色匹配 = 立即獲勝！💰",
            "4️⃣ 贏得3輪 → 解鎖超級獎勵回合！🔥",
            "5️⃣ 你有3次機會 - 把握每一次！",
            "⭐ 傳說：勇敢的人贏得最多！"
        ]
    }
];

// --- COMPONENTS ---

// Night Market Exploration Component
const NightMarketExplorer = ({ lang, onSelectGame, onBack }) => {
    const [playerPos, setPlayerPos] = useState(500); // Start in center
    const [facingRight, setFacingRight] = useState(true);
    const [isWalking, setIsWalking] = useState(false);
    const [nearStall, setNearStall] = useState(null);
    const [dialogueActive, setDialogueActive] = useState(false);
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [showInstructions, setShowInstructions] = useState(false);
    const [currentStall, setCurrentStall] = useState(null);
    
    const t = STRINGS[lang];
    
    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (dialogueActive || showInstructions) return;
            
            if (e.key === 'ArrowRight') {
                setIsWalking(true);
                setPlayerPos(p => Math.min(950, p + 20));
                setFacingRight(true);
            } else if (e.key === 'ArrowLeft') {
                setIsWalking(true);
                setPlayerPos(p => Math.max(50, p - 20));
                setFacingRight(false);
            } else if (e.key === ' ' && nearStall) {
                e.preventDefault();
                startInteraction(nearStall);
            }
        };
        
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                setIsWalking(false);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [dialogueActive, showInstructions, nearStall]);
    
    // Check if near any stall
    useEffect(() => {
        const nearby = GAME_STALLS.find(stall => 
            Math.abs(playerPos - stall.position) < 80
        );
        setNearStall(nearby || null);
    }, [playerPos]);
    
    const startInteraction = (stall) => {
        setCurrentStall(stall);
        setDialogueActive(true);
        setDialogueIndex(0);
    };
    
    const nextDialogue = () => {
        const dialogues = lang === 'en' ? currentStall.dialogue : currentStall.dialogueZh;
        if (dialogueIndex < dialogues.length - 1) {
            setDialogueIndex(i => i + 1);
        } else {
            setDialogueActive(false);
            setShowInstructions(true);
        }
    };
    
    const skipDialogue = () => {
        setDialogueActive(false);
        setShowInstructions(true);
    };
    
    const startGame = () => {
        if (currentStall.id === 'betgame') {
            onSelectGame(currentStall.id);
        } else {
            // Game not available yet
            setShowInstructions(false);
            setCurrentStall(null);
        }
    };
    
    const closeInstructions = () => {
        setShowInstructions(false);
        setCurrentStall(null);
    };
    
    const dialogues = currentStall ? (lang === 'en' ? currentStall.dialogue : currentStall.dialogueZh) : [];
    const instructions = currentStall ? (lang === 'en' ? currentStall.instructions : currentStall.instructionsZh) : [];
    
    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Night Sky with City Skyline */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900"></div>
            
            {/* City Buildings Silhouette */}
            <div className="absolute top-0 left-0 right-0 h-1/2">
                {/* Background buildings */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bottom-0 bg-gradient-to-b from-blue-800 to-blue-900 opacity-60"
                        style={{
                            left: `${i * 8 + Math.random() * 3}%`,
                            width: `${60 + Math.random() * 40}px`,
                            height: `${100 + Math.random() * 150}px`,
                        }}
                    >
                        {/* Building windows */}
                        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                            {[...Array(9)].map((_, w) => (
                                <div key={w} className={`${Math.random() > 0.3 ? 'bg-yellow-400' : 'bg-transparent'} opacity-80 rounded-sm`}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Stars */}
            <div className="absolute inset-0">
                {[...Array(80)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0.3 + Math.random() * 0.7
                        }}
                    />
                ))}
            </div>
            
            {/* Large Moon */}
            <div className="absolute top-20 right-32 w-24 h-24 bg-yellow-100 rounded-full" style={{boxShadow: '0 0 80px rgba(255,255,200,0.9), 0 0 120px rgba(255,255,150,0.6)'}}></div>
            
            {/* String Lights Across Scene */}
            <div className="absolute top-32 left-0 right-0 h-1">
                <svg className="w-full h-32" style={{overflow: 'visible'}}>
                    <path d="M 0,60 Q 200,40 400,60 T 800,60 T 1200,60" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none"/>
                </svg>
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-3 h-4 rounded-full animate-pulse"
                        style={{
                            left: `${i * 5}%`,
                            top: `${20 + Math.sin(i * 0.5) * 10}px`,
                            backgroundColor: ['#ff4444', '#ffaa00', '#44ff44', '#4444ff', '#ff44ff'][i % 5],
                            boxShadow: `0 0 10px ${['#ff4444', '#ffaa00', '#44ff44', '#4444ff', '#ff44ff'][i % 5]}`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Ground/Market Floor */}
            <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-gray-800 via-gray-700 to-transparent">
                <div className="w-full h-full opacity-20" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.3) 50px, rgba(0,0,0,0.3) 51px)'}}></div>
            </div>
            
            {/* Background Stalls (Other market stalls) */}
            <div className="absolute bottom-28 left-0 right-0 flex justify-around opacity-50">
                {/* Left background stalls */}
                <div className="relative w-32 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-t-lg border-2 border-yellow-500" style={{boxShadow: '0 0 20px rgba(255,100,0,0.5)'}}>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-comic text-white">🍜 FOOD</div>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl">🍲</div>
                </div>
                
                <div className="relative w-32 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-lg border-2 border-cyan-400" style={{boxShadow: '0 0 20px rgba(100,100,255,0.5)'}}>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-comic text-white">🎯 GAMES</div>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl">🎪</div>
                </div>
                
                <div className="relative w-32 h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-t-lg border-2 border-yellow-500" style={{boxShadow: '0 0 20px rgba(255,100,150,0.5)'}}>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-comic text-white">🧸 TOYS</div>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl">🎁</div>
                </div>
            </div>
            
            {/* Market Entrance Sign */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="relative">
                    {/* Glow effect behind sign */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 blur-xl opacity-60 animate-pulse"></div>
                    {/* Main sign */}
                    <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-600 border-6 border-yellow-400 px-8 py-3 rounded-2xl transform hover:rotate-0 transition-transform" style={{boxShadow: '0 8px 0 rgba(0,0,0,0.4), 0 0 40px rgba(255,215,0,0.7)'}}>
                        <div className="font-comic text-3xl text-yellow-300 font-bold text-center animate-pulse" style={{textShadow: '3px 3px 0 #000, 0 0 20px rgba(255,215,0,0.8)'}}>
                            🎪 {lang === 'en' ? 'NIGHT MARKET' : '夜市'} 🎪
                        </div>
                        {/* Decorative lights on sign */}
                        <div className="absolute -top-2 left-4 right-4 flex justify-between">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-full bg-yellow-300 animate-pulse" style={{animationDelay: `${i * 0.2}s`, boxShadow: '0 0 10px rgba(255,255,0,0.9)'}}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Game Stall - BET-O-BET */}
            <div className="absolute bottom-48 w-full h-64 flex items-end justify-center">
                {GAME_STALLS.map(stall => (
                    <div 
                        key={stall.id}
                        className="relative transition-all duration-300"
                    >
                        {/* Stall Structure - Modern Redesign */}
                        <div className="relative w-80">
                            
                            {/* Neon Sign Above */}
                            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-72">
                                <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 p-1 rounded-2xl" style={{boxShadow: '0 0 40px rgba(147,51,234,0.8), 0 0 80px rgba(236,72,153,0.6)'}}>
                                    <div className="bg-black rounded-xl py-4 px-6">
                                        <div className="font-comic text-4xl text-center bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 text-transparent bg-clip-text animate-pulse" style={{textShadow: '0 0 20px rgba(255,215,0,0.8)'}}>
                                            {lang === 'en' ? stall.name : stall.nameZh}
                                        </div>
                                        {/* Neon glow effect */}
                                        <div className="flex justify-center gap-1 mt-2">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.15}s`, boxShadow: '0 0 10px rgba(255,215,0,0.9)'}}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* HOT Badge */}
                            <div className="absolute -top-20 -right-6 z-20">
                                <div className="relative">
                                    <div className="bg-red-600 text-yellow-300 font-comic text-xl px-4 py-2 rounded-full border-4 border-yellow-400 animate-bounce" style={{boxShadow: '0 0 30px rgba(255,215,0,0.9), 0 4px 0 rgba(0,0,0,0.5)'}}>
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl">🔥</span>
                                            <span>HOT!</span>
                                            <span className="text-2xl">🔥</span>
                                        </div>
                                    </div>
                                    {/* Sparkle effects */}
                                    <div className="absolute -top-1 -left-1 text-xl animate-spin" style={{animationDuration: '3s'}}>✨</div>
                                    <div className="absolute -bottom-1 -right-1 text-xl animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}}>✨</div>
                                </div>
                            </div>

                            {/* Prize Icons Floating */}
                            <div className="absolute -top-16 left-4 text-3xl animate-float" style={{animationDuration: '2s'}}>💎</div>
                            <div className="absolute -top-20 left-16 text-3xl animate-float" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>💰</div>
                            <div className="absolute -top-16 right-16 text-3xl animate-float" style={{animationDuration: '2.3s', animationDelay: '1s'}}>🏆</div>
                            <div className="absolute -top-20 right-4 text-3xl animate-float" style={{animationDuration: '2.7s', animationDelay: '0.3s'}}>⭐</div>
                            
                            {/* Main Stall Body */}
                            <div className="relative">
                                {/* Awning/Canopy */}
                                <div className="absolute -top-8 -left-4 -right-4 h-16 bg-gradient-to-b from-red-600 via-red-500 to-red-600 rounded-t-3xl border-4 border-yellow-400" style={{boxShadow: '0 -4px 20px rgba(255,0,0,0.4), 0 4px 0 rgba(0,0,0,0.3)'}}>
                                    {/* Striped pattern */}
                                    <div className="absolute inset-0 flex rounded-t-3xl overflow-hidden opacity-30">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : ''}`}></div>
                                        ))}
                                    </div>
                                    {/* Hanging decorations */}
                                    <div className="absolute -bottom-3 left-8 w-3 h-6 bg-yellow-400 rounded-b-full animate-sway"></div>
                                    <div className="absolute -bottom-3 left-20 w-3 h-6 bg-yellow-400 rounded-b-full animate-sway" style={{animationDelay: '0.2s'}}></div>
                                    <div className="absolute -bottom-3 right-20 w-3 h-6 bg-yellow-400 rounded-b-full animate-sway" style={{animationDelay: '0.4s'}}></div>
                                    <div className="absolute -bottom-3 right-8 w-3 h-6 bg-yellow-400 rounded-b-full animate-sway" style={{animationDelay: '0.6s'}}></div>
                                </div>

                                {/* Stall Front Panel */}
                                <div className="relative w-80 h-64 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl border-6 border-yellow-400 overflow-hidden" style={{boxShadow: '0 0 60px rgba(236,72,153,0.8), 0 0 100px rgba(147,51,234,0.6), 0 12px 0 rgba(0,0,0,0.4), inset 0 2px 20px rgba(255,255,255,0.2)'}}>
                                    
                                    {/* Animated background pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '40px 40px'}}></div>
                                    </div>
                                    
                                    {/* Spotlight effects */}
                                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                                    <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-300 rounded-full blur-3xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                                    
                                    {/* Stall Name on Panel */}
                                    <div className="absolute top-6 left-0 right-0 flex justify-center">
                                        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-red-600 font-comic text-2xl font-bold px-6 py-2 rounded-full border-4 border-red-600 shadow-2xl" style={{textShadow: '2px 2px 0 rgba(0,0,0,0.3)', boxShadow: '0 0 20px rgba(255,215,0,0.8), 0 4px 0 rgba(0,0,0,0.3)'}}>
                                            {lang === 'en' ? stall.name : stall.nameZh}
                                        </div>
                                    </div>
                                    
                                    {/* Dice Display - Center */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="relative">
                                            {/* Glow ring behind dice */}
                                            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 blur-xl opacity-60 animate-spin" style={{animationDuration: '6s'}}></div>
                                            {/* Dice */}
                                            <div className="relative text-9xl animate-bounce filter drop-shadow-2xl" style={{animationDuration: '2s'}}>
                                                {stall.emoji}
                                            </div>
                                            {/* Sparkles around dice */}
                                            <div className="absolute -top-4 -left-4 text-3xl animate-ping" style={{animationDuration: '2s'}}>✨</div>
                                            <div className="absolute -top-4 -right-4 text-3xl animate-ping" style={{animationDuration: '2s', animationDelay: '0.5s'}}>✨</div>
                                            <div className="absolute -bottom-4 -left-4 text-3xl animate-ping" style={{animationDuration: '2s', animationDelay: '1s'}}>✨</div>
                                            <div className="absolute -bottom-4 -right-4 text-3xl animate-ping" style={{animationDuration: '2s', animationDelay: '1.5s'}}>✨</div>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative corners */}
                                    <div className="absolute top-2 left-2 text-2xl">⭐</div>
                                    <div className="absolute top-2 right-2 text-2xl">⭐</div>
                                    <div className="absolute bottom-14 left-2 text-2xl">⭐</div>
                                    <div className="absolute bottom-14 right-2 text-2xl">⭐</div>
                                    
                                    {/* Counter/Table at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-600 to-amber-900 border-t-4 border-yellow-500">
                                        <div className="flex justify-center items-center h-full gap-3 text-2xl">
                                            <span className="animate-bounce" style={{animationDelay: '0s'}}>🎰</span>
                                            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎲</span>
                                            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🎯</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Wooden Support Poles */}
                                <div className="absolute -left-2 top-0 bottom-0 w-4 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-950 rounded-full" style={{boxShadow: '2px 0 8px rgba(0,0,0,0.5)'}}></div>
                                <div className="absolute -right-2 top-0 bottom-0 w-4 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-950 rounded-full" style={{boxShadow: '-2px 0 8px rgba(0,0,0,0.5)'}}></div>
                            </div>
                            
                            {/* Glow effect when near */}
                            {nearStall?.id === stall.id && (
                                <>
                                    <div className="absolute inset-0 bg-yellow-300 opacity-30 rounded-2xl animate-pulse" style={{boxShadow: '0 0 60px rgba(255,255,0,0.9), 0 0 100px rgba(255,215,0,0.7)'}}></div>
                                    <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">
                                        <div className="font-comic text-yellow-300 text-3xl mb-2" style={{textShadow: '2px 2px 0 #000'}}>PRESS SPACE!</div>
                                        <div className="text-center">👇</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Player Character */}
            <div 
                className="absolute bottom-48 transition-all duration-200 ease-out z-10"
                style={{ 
                    left: `${playerPos}px`, 
                    transform: `translateX(-50%) ${facingRight ? 'scaleX(-1)' : ''}` 
                }}
            >
                <div className="text-6xl drop-shadow-lg">
                    {isWalking ? '🏃‍♀️' : '🧍‍♀️'}
                </div>
            </div>
            
            {/* Street Lamps */}
            <div className="absolute bottom-48 left-20">
                <div className="relative">
                    <div className="w-2 h-32 bg-gray-700 mx-auto"></div>
                    <div className="w-8 h-8 bg-yellow-300 rounded-full mx-auto -mt-1" style={{boxShadow: '0 0 40px rgba(255,255,150,0.9)'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
                </div>
            </div>
            <div className="absolute bottom-48 right-20">
                <div className="relative">
                    <div className="w-2 h-32 bg-gray-700 mx-auto"></div>
                    <div className="w-8 h-8 bg-yellow-300 rounded-full mx-auto -mt-1" style={{boxShadow: '0 0 40px rgba(255,255,150,0.9)'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
                </div>
            </div>
            
            {/* Vendor Character at stall */}
            {GAME_STALLS.map(stall => (
                <div 
                    key={`vendor-${stall.id}`}
                    className="absolute bottom-72 left-1/2 transform -translate-x-1/2 text-5xl animate-sway pointer-events-none"
                >
                    👨‍🍳
                </div>
            ))}
            
            {/* Controls HUD */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-4 py-2 rounded-lg border-2 border-yellow-400">
                <p className="font-comic text-white text-center text-xs">
                    {t.controls}
                </p>
            </div>
            
            {/* Interaction Prompt */}
            {nearStall && !dialogueActive && !showInstructions && (
                <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-4 py-1 rounded-lg border-2 border-black animate-bounce">
                    <p className="font-comic text-black text-sm">
                        {t.pressSpace}
                    </p>
                </div>
            )}
            
            {/* Dialogue Box */}
            {dialogueActive && currentStall && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-3xl bg-black bg-opacity-90 border-4 border-yellow-400 rounded-lg p-6">
                    <div className="mb-4">
                        <p className="font-comic text-yellow-400 text-xl mb-2">
                            {dialogues[dialogueIndex].speaker}
                        </p>
                        <p className="font-comic text-white text-2xl">
                            {dialogues[dialogueIndex].text}
                        </p>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button 
                            onClick={skipDialogue}
                            className="btn-comic btn-comic-blue px-6 py-2"
                        >
                            {t.skip}
                        </button>
                        <button 
                            onClick={nextDialogue}
                            className="btn-comic px-6 py-2"
                        >
                            {dialogueIndex < dialogues.length - 1 ? t.continue : t.howToPlay}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Instructions Screen */}
            {showInstructions && currentStall && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="panel-comic p-8 max-w-2xl w-11/12 max-h-[80vh] overflow-y-auto">
                        <h2 className="font-comic text-4xl md:text-5xl text-yellow-400 mb-6 text-center">
                            {lang === 'en' ? currentStall.name : currentStall.nameZh}
                        </h2>
                        <div className="text-center text-6xl mb-6">
                            {currentStall.emoji}
                        </div>
                        <h3 className="font-comic text-2xl md:text-3xl text-yellow-400 mb-4">
                            {t.howToPlay}
                        </h3>
                        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
                            {instructions.map((instruction, i) => (
                                <p key={i} className="font-comic text-white text-lg md:text-xl mb-3">
                                    {instruction}
                                </p>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={closeInstructions}
                                className="btn-comic btn-comic-blue flex-1 py-3"
                            >
                                {t.back}
                            </button>
                            {currentStall.id === 'betgame' && (
                                <button 
                                    onClick={startGame}
                                    className="btn-comic flex-1 py-3"
                                >
                                    {t.start}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Back Button */}
            <button 
                onClick={onBack}
                className="absolute top-4 left-4 btn-comic btn-comic-blue px-6 py-2"
            >
                {t.back}
            </button>
        </div>
    );
};

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
        // Enhanced spinning animation - multiple full rotations then land on target
        const target = getAngles(targetColor);
        // Add exactly 6 full rotations (2160deg) to the target angles for smooth landing with z-axis
        const spinX = target.x + 2160;
        const spinY = target.y + 2160;
        const spinZ = 2160; // Add Z-axis rotation for more dynamic roll
        style = {
            transform: `rotateX(${spinX}deg) rotateY(${spinY}deg) rotateZ(${spinZ}deg)`,
            transition: 'transform 3s cubic-bezier(0.2, 0.8, 0.4, 1)'
        };
    } else {
        const target = getAngles(color);
        style = {
            transform: `rotateX(${target.x}deg) rotateY(${target.y}deg) rotateZ(0deg)`,
            transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
    const [screen, setScreen] = useState('menu'); // menu, explore, modeSelect, setup, game, gameover, credits, tutorial
    const [gameMode, setGameMode] = useState('solo'); // 'solo', 'ai', or 'twoplayer'
    const [name, setName] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [wins, setWins] = useState(0);
    const [player2Wins, setPlayer2Wins] = useState(0);
    const [round, setRound] = useState(1);
    const [isBonusRound, setIsBonusRound] = useState(false);
    const [bonusWon, setBonusWon] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState(null);
    
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
    
    // Player 2 State
    const [player2SelectedColor, setPlayer2SelectedColor] = useState(null);
    const [player2LastResult, setPlayer2LastResult] = useState(null);

    const t = STRINGS[lang];

    const handleStart = () => {
        setScreen('explore'); // Changed to go to exploration first
    };
    
    const handleGameSelected = (gameId) => {
        setSelectedGameId(gameId);
        if (gameId === 'betgame') {
            setScreen('modeSelect');
        }
    };
    
    const selectMode = (mode) => {
        setGameMode(mode);
        setScreen('setup');
    };

    const startGame = () => {
        if(!name.trim()) return;
        if(gameMode === 'twoplayer' && !player2Name.trim()) return;
        setScreen('game');
        setRound(1);
        setWins(0);
        setAiWins(0);
        setPlayer2Wins(0);
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
        setPlayer2SelectedColor(null);
        setPlayer2LastResult(null);
        
        // AI makes its choice
        if (gameMode === 'ai') {
            const colors = ['red', 'blue', 'yellow', 'green', 'white', 'pink'];
            const aiChoice = colors[Math.floor(Math.random() * colors.length)];
            setAiSelectedColor(aiChoice);
        }
    };

    const rollDice = () => {
        if(!selectedColor || isRolling) return;
        
        // Use crypto API for better randomness if available, fallback to Math.random
        let randomValue;
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            randomValue = array[0] / (0xFFFFFFFF + 1);
        } else {
            randomValue = Math.random();
        }
        
        // Player-friendly probability: 40% chance for selected color, 60% for others
        let result;
        if (randomValue < 0.4) {
            // 40% chance - player wins!
            result = selectedColor;
        } else {
            // 60% chance - random other color
            const otherColors = COLORS.filter(c => c !== selectedColor);
            result = otherColors[Math.floor((randomValue - 0.4) / 0.6 * otherColors.length)];
        }
        
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
            
            // Check player 2 result if in two-player mode
            if(gameMode === 'twoplayer' && player2SelectedColor) {
                if(result === player2SelectedColor) {
                    setPlayer2Wins(w => w + 1);
                    setPlayer2LastResult('win');
                } else {
                    setPlayer2LastResult('lose');
                }
            }
        }, 3000);
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
        setScreen('explore'); // Changed to return to exploration
        setName('');
        setPlayer2Name('');
        setGameMode('solo');
        setSelectedGameId(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
            
            {/* --- EXPLORATION SCREEN --- */}
            {screen === 'explore' && (
                <NightMarketExplorer 
                    lang={lang}
                    onSelectGame={handleGameSelected}
                    onBack={() => setScreen('menu')}
                />
            )}
            
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
                        <button onClick={() => selectMode('twoplayer')} className="btn-comic py-4" style={{background: 'linear-gradient(180deg, #ff6b81 0%, #ff3838 100%)'}}>
                            <div className="text-3xl mb-1">👥</div>
                            {t.twoPlayerMode}
                        </button>
                        <button onClick={() => setScreen('explore')} className="btn-comic btn-comic-blue py-2 mt-2">{t.back}</button>
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
                            className="input-comic w-full mb-4"
                            placeholder={gameMode === 'twoplayer' ? t.player1 : "PLAYER 1"}
                            autoFocus
                        />
                        {gameMode === 'twoplayer' && (
                            <input 
                                type="text" 
                                value={player2Name}
                                onChange={e => setPlayer2Name(e.target.value)}
                                className="input-comic w-full mb-8"
                                placeholder={t.player2}
                            />
                        )}
                        {gameMode !== 'twoplayer' && <div className="mb-4"></div>}
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setScreen('explore')} className="btn-comic btn-comic-blue flex-1 py-2">{t.back}</button>
                            <button type="submit" disabled={!name || (gameMode === 'twoplayer' && !player2Name)} className="btn-comic flex-1 py-2">{t.start}</button>
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
                    
                    {/* Player 2 HUD (if in two-player mode) */}
                    {gameMode === 'twoplayer' && (
                        <div className="w-full mb-4 px-2">
                            <div className="panel-comic px-4 py-2 flex justify-between items-center" style={{background: 'rgba(255,107,129,0.2)'}}>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">👤</span>
                                    <span className="font-comic text-xl text-white">{player2Name}</span>
                                </div>
                                <div className="font-comic text-xl text-yellow-400">{t.score}: {player2Wins}</div>
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
                        
                        {/* Player 2 Choice Display (if in two-player mode) */}
                        {gameMode === 'twoplayer' && (
                            <div className="panel-comic px-4 py-2">
                                <p className="font-comic text-sm text-yellow-400 mb-1">{player2Name}</p>
                                {player2SelectedColor && (
                                    <div className={`w-12 h-12 rounded ${COLOR_BG[player2SelectedColor]} border-4 border-white shadow-lg`}></div>
                                )}
                                {!player2SelectedColor && (
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
                                {lastResult === 'win' && (
                                    <div className="text-center mb-4 animate-bounce">
                                        <div className="text-6xl mb-2">🎊🎉🏆🎉🎊</div>
                                        <div className="text-5xl">💰💎✨💎💰</div>
                                    </div>
                                )}
                                {lastResult === 'lose' && (
                                    <div className="text-center mb-4 animate-pulse">
                                        <div className="text-6xl mb-2">😢💔😢</div>
                                    </div>
                                )}
                                <div className={`border-4 border-black p-4 rounded-lg transform -rotate-1 ${lastResult === 'win' ? 'bg-yellow-300 animate-pulse' : 'bg-white'}`} style={lastResult === 'win' ? {boxShadow: '0 0 30px rgba(255,215,0,0.9), 8px 8px 0 rgba(0,0,0,0.5)'} : {}}>
                                    <p className="font-comic text-black text-xl mb-2">
                                        {lang === 'en' ? 'WINNING COLOR:' : '中獎顏色:'}
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className={`w-16 h-16 rounded-lg ${COLOR_BG[diceResult]} border-4 border-black shadow-lg ${lastResult === 'win' ? 'animate-spin' : ''}`}></div>
                                        <p className="font-comic text-3xl text-black uppercase">{diceResult}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTROLS */}
                        {!isRolling && lastResult === null && (
                            <div className="mt-6">
                                <div className="text-center mb-6 animate-bounce">
                                    <p className="font-comic text-3xl md:text-4xl mb-2 text-yellow-300" style={{textShadow: '3px 3px 0 #000, 0 0 20px rgba(255,215,0,0.8)'}}>
                                        {t.bet}
                                    </p>
                                    <p className="font-comic text-lg text-yellow-400">💰 {lang === 'en' ? 'Pick Your Lucky Color!' : '選擇你的幸運色！'} 💰</p>
                                </div>
                                
                                {/* Player 1 Selection */}
                                <div className="mb-4">
                                    <p className="font-comic text-xl text-white mb-2 text-center">{gameMode === 'twoplayer' ? name : ''}</p>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {COLORS.map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => setSelectedColor(c)}
                                                className={`swatch h-20 md:h-24 ${COLOR_BG[c]} ${selectedColor === c ? 'selected' : ''}`}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Player 2 Selection (Two-Player Mode) */}
                                {gameMode === 'twoplayer' && (
                                    <div className="mb-4 p-4 rounded-lg" style={{background: 'rgba(255,107,129,0.1)', border: '2px solid rgba(255,107,129,0.3)'}}>
                                        <p className="font-comic text-xl text-white mb-2 text-center">{player2Name}</p>
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            {COLORS.map(c => (
                                                <button 
                                                    key={c}
                                                    onClick={() => setPlayer2SelectedColor(c)}
                                                    className={`swatch h-20 md:h-24 ${COLOR_BG[c]} ${player2SelectedColor === c ? 'selected' : ''}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={rollDice} 
                                    disabled={!selectedColor || (gameMode === 'twoplayer' && !player2SelectedColor)}
                                    className={`btn-comic w-full py-4 text-3xl md:text-4xl ${(selectedColor && (gameMode !== 'twoplayer' || player2SelectedColor)) ? 'animate-pulse' : 'opacity-50'}`}
                                    style={(selectedColor && (gameMode !== 'twoplayer' || player2SelectedColor)) ? {boxShadow: '0 0 20px rgba(255,215,0,0.8), 0 8px 0 #000'} : {}}
                                >
                                    🎲 {t.roll} 🎲
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
                    
                    {/* Two-Player Mode: Show Winner */}
                    {gameMode === 'twoplayer' && (
                        <div className="mb-6">
                            {wins > player2Wins && (
                                <div className="text-6xl mb-2">🏆</div>
                            )}
                            {wins < player2Wins && (
                                <div className="text-6xl mb-2">🏆</div>
                            )}
                            {wins === player2Wins && (
                                <div className="text-6xl mb-2">🤝</div>
                            )}
                            <p className="font-comic text-4xl md:text-5xl text-yellow-400 mb-2">
                                {wins > player2Wins ? `${name} ${t.youWin.replace('YOU WIN', 'WINS')}` : wins < player2Wins ? `${player2Name} ${t.youWin.replace('YOU WIN', 'WINS')}` : t.draw}
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
                    ) : gameMode === 'twoplayer' ? (
                        <div className="flex gap-4 justify-center mb-4">
                            <div className="bg-white border-4 border-black p-6 transform rotate-2 flex-1">
                                <p className="font-comic text-black text-xl mb-2">{name}</p>
                                <p className="font-comic text-5xl md:text-6xl text-black">{wins}</p>
                            </div>
                            <div className="flex items-center font-comic text-4xl text-yellow-400">
                                {t.vsAI}
                            </div>
                            <div className="bg-white border-4 border-black p-6 transform -rotate-2 flex-1">
                                <p className="font-comic text-black text-xl mb-2">👤 {player2Name}</p>
                                <p className="font-comic text-5xl md:text-6xl text-black">{player2Wins}</p>
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
                            ) : gameMode === 'twoplayer' ? (
                                wins > player2Wins ? t.perfectScore :
                                wins === player2Wins ? t.greatScore :
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
                    <button onClick={() => setScreen('explore')} className="btn-comic btn-comic-blue w-full py-3 mt-4">
                        {t.explore}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue w-full py-3 mt-2">
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
