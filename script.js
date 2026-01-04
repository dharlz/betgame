const { useState, useRef, useEffect } = React;

// --- STRINGS ---

const STRINGS = {
    en: {
        title: 'BET-0-BET',
        subtitle: 'BET-0-BET',
        play: 'ENTER GAME',
        options: 'LANGUAGE',
        credits: 'DEVELOPER',
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
        gameOver: 'GAME OVER',
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
        soloMode: 'SOLO',
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
        explore: '探索',
        controls: 'Use Arrow Keys ← → to Move | Press SPACE to Interact',
        pressSpace: 'Press SPACE to interact',
        skip: 'SKIP >>',
        continue: 'CONTINUE',
        howToPlay: 'HOW TO PLAY',
        changeMode: 'CHANGE MODE'
    },
    zh: {
        title: 'BET-0-BET',
        subtitle: 'BET-0-BET',
        play: '進入遊戲',
        options: '語言',
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
        gameOver: '遊戲結束',
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
        howToPlay: '如何玩',
        changeMode: '更換模式'
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

// --- GAME DATA ---
const GAME_DATA = [
    {
        id: 'betgame',
        name: 'BET-O-BET',
        nameZh: '賭色遊戲',
        emoji: '🎲',
        position: 500, // Centered position
        dialogue: [
            { speaker: '🎪 Game Host', text: "STEP RIGHT UP! 🎉 The LEGENDARY Color Dice awaits!" },
            { speaker: '🎪 Lucky Vendor', text: "🔥 6 COLORS, 1 DESTINY! 🔥 Can YOU beat the odds?" },
            { speaker: '🎪 Lucky Vendor', text: "💎 Choose your lucky color and WIN BIG PRIZES! 💰" },
            { speaker: '🎪 Lucky Vendor', text: "⚡ Get 3 wins for a MEGA BONUS ROUND! ⚡ Are you BRAVE enough?" }
        ],
        dialogueZh: [
            { speaker: '🎪 遊戲主持', text: "快來！🎉 傳說中的顏色骰子等你挑戰！" },
            { speaker: '🎪 遊戲主持', text: "🔥 6種顏色，1次命運！🔥 你能戰勝機率嗎？" },
            { speaker: '🎪 遊戲主持', text: "💎 選擇你的幸運顏色，贏得大獎！💰" },
            { speaker: '🎪 遊戲主持', text: "⚡ 贏3次得到超級獎勵回合！⚡ 你夠勇敢嗎？" }
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

// Die Component
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
    const [screen, setScreen] = useState('menu'); // menu, tutorial, modeSelect, setup, game, gameover, credits
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
    
    // Audio Controls
    const [isMusicEnabled, setIsMusicEnabled] = useState(true);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    const t = STRINGS[lang];

    // Sound effects and music
    const soundEffects = useRef({
        diceRoll: null,
        win: null,
        lose: null,
        click: null,
        bonus: null
    });
    
    const audioContext = useRef(null);
    const musicGainNode = useRef(null);
    const musicOscillators = useRef([]);
    const musicLoopTimeout = useRef(null);

    // Initialize sound effects
    useEffect(() => {
        // Initialize Audio Context
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        musicGainNode.current = audioContext.current.createGain();
        musicGainNode.current.connect(audioContext.current.destination);
        musicGainNode.current.gain.value = 0.25; // Start higher by default
        
        // Dice rolling sound - synthesized for reliability
        soundEffects.current.diceRoll = () => {
            const ctx = audioContext.current;
            const now = ctx.currentTime;
            
            // Create realistic dice rolling with rattling sounds
            const numRattles = 15;
            for (let i = 0; i < numRattles; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                // Random frequencies for realistic dice tumbling
                const freq = 80 + Math.random() * 150;
                osc.frequency.value = freq;
                osc.type = 'square';
                
                const startTime = now + (i * 0.06);
                const duration = 0.04;
                
                // Volume decreases as dice settles
                const volume = 0.25 * (1 - (i / numRattles) * 0.5);
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(volume, startTime + 0.005);
                gain.gain.linearRampToValueAtTime(0, startTime + duration);
                
                osc.start(startTime);
                osc.stop(startTime + duration);
            }
            
            // Final loud "CLACK" when dice stops
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 120;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            }, 900);
        };

        // Win sound (ascending notes)
        soundEffects.current.win = () => {
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
            notes.forEach((freq, i) => {
                const osc = audioContext.current.createOscillator();
                const gain = audioContext.current.createGain();
                osc.connect(gain);
                gain.connect(audioContext.current.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.15, audioContext.current.currentTime + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + i * 0.15 + 0.3);
                osc.start(audioContext.current.currentTime + i * 0.15);
                osc.stop(audioContext.current.currentTime + i * 0.15 + 0.3);
            });
        };

        // Lose sound (descending notes)
        soundEffects.current.lose = () => {
            const notes = [392.00, 329.63]; // G4, E4
            notes.forEach((freq, i) => {
                const osc = audioContext.current.createOscillator();
                const gain = audioContext.current.createGain();
                osc.connect(gain);
                gain.connect(audioContext.current.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.15, audioContext.current.currentTime + i * 0.2);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + i * 0.2 + 0.4);
                osc.start(audioContext.current.currentTime + i * 0.2);
                osc.stop(audioContext.current.currentTime + i * 0.2 + 0.4);
            });
        };

        // Bonus sound (special celebratory)
        soundEffects.current.bonus = () => {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = audioContext.current.createOscillator();
                const gain = audioContext.current.createGain();
                osc.connect(gain);
                gain.connect(audioContext.current.destination);
                osc.frequency.value = freq;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.12, audioContext.current.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + i * 0.1 + 0.25);
                osc.start(audioContext.current.currentTime + i * 0.1);
                osc.stop(audioContext.current.currentTime + i * 0.1 + 0.25);
            });
        };

        // Click sound
        soundEffects.current.click = () => {
            const osc = audioContext.current.createOscillator();
            const gain = audioContext.current.createGain();
            osc.connect(gain);
            gain.connect(audioContext.current.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, audioContext.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
            osc.start();
            osc.stop(audioContext.current.currentTime + 0.1);
        };
        
        return () => {
            // Cleanup
            stopBackgroundMusic();
        };
    }, []);

    const playSound = (soundType) => {
        if (!isSoundEnabled) return; // Don't play if sounds are disabled
        
        try {
            // Resume audio context if suspended (browser autoplay policy)
            if (audioContext.current && audioContext.current.state === 'suspended') {
                audioContext.current.resume();
            }
            
            if (soundEffects.current[soundType]) {
                soundEffects.current[soundType]();
            }
        } catch (error) {
            // Silently fail if audio can't play
            console.log('Audio playback failed:', error);
        }
    };
    
    // Background Music Functions
    const startBackgroundMusic = () => {
        if (!audioContext.current || musicOscillators.current.length > 0) return;
        
        try {
            // Resume audio context if suspended (browser autoplay policy)
            if (audioContext.current.state === 'suspended') {
                audioContext.current.resume();
            }
            
            // "Fluffing a Duck" Style - Playful, Bouncy, Silly Melody!
            // Fun xylophone/marimba-like sound with bouncy rhythm
            const musicPattern = [
                // Phrase 1 - Bouncy intro (like bouncing ball)
                { notes: [523.25], duration: 0.15, delay: 0, type: 'sine' },        // C
                { notes: [659.25], duration: 0.15, delay: 0.2, type: 'sine' },      // E
                { notes: [783.99], duration: 0.15, delay: 0.4, type: 'sine' },      // G
                { notes: [1046.50], duration: 0.25, delay: 0.6, type: 'sine' },     // C6
                
                // Phrase 2 - Silly descending
                { notes: [987.77], duration: 0.15, delay: 0.9, type: 'sine' },      // B
                { notes: [880.00], duration: 0.15, delay: 1.1, type: 'sine' },      // A
                { notes: [783.99], duration: 0.2, delay: 1.3, type: 'sine' },       // G
                
                // Phrase 3 - Quick playful bounce
                { notes: [659.25], duration: 0.12, delay: 1.6, type: 'sine' },      // E
                { notes: [698.46], duration: 0.12, delay: 1.75, type: 'sine' },     // F
                { notes: [783.99], duration: 0.12, delay: 1.9, type: 'sine' },      // G
                { notes: [659.25], duration: 0.2, delay: 2.05, type: 'sine' },      // E
                
                // Phrase 4 - Fun ascending run
                { notes: [523.25], duration: 0.12, delay: 2.3, type: 'sine' },      // C
                { notes: [587.33], duration: 0.12, delay: 2.45, type: 'sine' },     // D
                { notes: [659.25], duration: 0.12, delay: 2.6, type: 'sine' },      // E
                { notes: [698.46], duration: 0.12, delay: 2.75, type: 'sine' },     // F
                { notes: [783.99], duration: 0.25, delay: 2.9, type: 'sine' },      // G
                
                // Phrase 5 - Repeat main bouncy theme
                { notes: [523.25], duration: 0.15, delay: 3.3, type: 'sine' },      // C
                { notes: [659.25], duration: 0.15, delay: 3.5, type: 'sine' },      // E
                { notes: [783.99], duration: 0.15, delay: 3.7, type: 'sine' },      // G
                { notes: [1046.50], duration: 0.25, delay: 3.9, type: 'sine' },     // C6
                
                // Phrase 6 - Silly ending wiggle
                { notes: [783.99], duration: 0.15, delay: 4.25, type: 'sine' },     // G
                { notes: [659.25], duration: 0.15, delay: 4.45, type: 'sine' },     // E
                { notes: [783.99], duration: 0.15, delay: 4.65, type: 'sine' },     // G
                { notes: [659.25], duration: 0.15, delay: 4.85, type: 'sine' },     // E
                { notes: [523.25], duration: 0.3, delay: 5.05, type: 'sine' },      // C (held)
            ];
            
            const patternDuration = 5.5; // Quick loop for continuous fun
            
            const playPattern = (startTime) => {
                musicPattern.forEach(pattern => {
                    pattern.notes.forEach((freq, index) => {
                        const osc = audioContext.current.createOscillator();
                        const noteGain = audioContext.current.createGain();
                        
                        osc.connect(noteGain);
                        noteGain.connect(musicGainNode.current);
                        
                        osc.frequency.value = freq;
                        osc.type = pattern.type || 'sine'; // Bright sine for xylophone/marimba feel
                        
                        const noteStart = startTime + pattern.delay;
                        const noteEnd = noteStart + pattern.duration;
                        
                        // Plucky envelope like xylophone/marimba
                        const baseVolume = 0.12;
                        noteGain.gain.setValueAtTime(0, noteStart);
                        noteGain.gain.linearRampToValueAtTime(baseVolume, noteStart + 0.01); // Fast attack
                        noteGain.gain.exponentialRampToValueAtTime(0.01, noteEnd); // Natural decay
                        
                        osc.start(noteStart);
                        osc.stop(noteEnd);
                        
                        musicOscillators.current.push(osc);
                    });
                });
            };
            
            // Play initial pattern
            playPattern(audioContext.current.currentTime);
            
            // Loop the pattern
            const loopMusic = () => {
                if (isMusicEnabled && audioContext.current) {
                    playPattern(audioContext.current.currentTime);
                    musicLoopTimeout.current = setTimeout(loopMusic, patternDuration * 1000);
                }
            };
            
            musicLoopTimeout.current = setTimeout(loopMusic, patternDuration * 1000);
            
        } catch (error) {
            console.log('Background music failed:', error);
        }
    };
    
    const stopBackgroundMusic = () => {
        // Clear the loop timeout
        if (musicLoopTimeout.current) {
            clearTimeout(musicLoopTimeout.current);
            musicLoopTimeout.current = null;
        }
        
        // Stop all oscillators
        musicOscillators.current.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // Already stopped
            }
        });
        musicOscillators.current = [];
    };
    
    // Handle music toggle
    useEffect(() => {
        if (isMusicEnabled) {
            startBackgroundMusic();
        } else {
            stopBackgroundMusic();
        }
    }, [isMusicEnabled]);

    const toggleMusic = () => {
        setIsMusicEnabled(!isMusicEnabled);
    };
    
    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    // Dynamic music volume adjustment
    const adjustMusicVolume = (volume, fadeDuration = 0.3) => {
        if (musicGainNode.current && audioContext.current) {
            const now = audioContext.current.currentTime;
            musicGainNode.current.gain.cancelScheduledValues(now);
            musicGainNode.current.gain.setValueAtTime(musicGainNode.current.gain.value, now);
            musicGainNode.current.gain.linearRampToValueAtTime(volume, now + fadeDuration);
        }
    };

    // Adjust music volume based on game state
    useEffect(() => {
        if (!isMusicEnabled) return;
        
        if (isRolling) {
            // Lower volume during dice roll
            adjustMusicVolume(0.08);
        } else if (screen === 'game' && lastResult === null && selectedColor) {
            // Higher volume when player is choosing/ready
            adjustMusicVolume(0.28);
        } else if (screen === 'game') {
            // Normal volume during gameplay
            adjustMusicVolume(0.2);
        } else {
            // Lower volume on menu/other screens
            adjustMusicVolume(0.15);
        }
    }, [isRolling, screen, lastResult, selectedColor, isMusicEnabled]);

    // Helper to wrap onClick with sound
    const withClickSound = (callback) => {
        return () => {
            playSound('click');
            callback();
        };
    };

    // Keyboard controls for Player 2 (Two-player mode)
    useEffect(() => {
        if (gameMode !== 'twoplayer' || screen !== 'game' || isRolling || lastResult !== null) return;

        const handleKeyPress = (e) => {
            const keyMap = {
                '1': 'red',
                '2': 'blue',
                '3': 'green',
                '4': 'yellow',
                '5': 'white',
                '6': 'pink'
            };
            
            if (keyMap[e.key]) {
                setPlayer2SelectedColor(keyMap[e.key]);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameMode, screen, isRolling, lastResult]);

    const handleStart = () => {
        playSound('click');
        setScreen('whatIsGame'); // Show "What is this game?" explanation first
    };
    
    const selectMode = (mode) => {
        playSound('click');
        setGameMode(mode);
        if (mode === 'twoplayer') {
            setScreen('twoPlayerTutorial');
        } else {
            setScreen('setup');
        }
    };

    const startGame = () => {
        if(!name.trim()) return;
        if(gameMode === 'twoplayer' && !player2Name.trim()) return;
        playSound('click');
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
        playSound('diceRoll');

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
                    playSound('bonus');
                } else {
                    setPowText(t.win);
                    playSound('win');
                }
            } else {
                setLastResult('lose');
                setPowText(t.lose);
                playSound('lose');
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
        playSound('click');
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
        playSound('click');
        setScreen('menu'); // Return to menu
        setName('');
        setPlayer2Name('');
        setGameMode('solo');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden">
            
            {/* Audio Controls - Fixed Position */}
            <div className="fixed bottom-4 left-4 z-50 flex gap-2">
                <button 
                    onClick={toggleMusic}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all"
                    style={{
                        background: isMusicEnabled 
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: isMusicEnabled 
                            ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                            : '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                    title={isMusicEnabled ? 'Music On' : 'Music Off'}
                >
                    {isMusicEnabled ? '🎵' : '🔇'}
                </button>
                
                <button 
                    onClick={toggleSound}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all"
                    style={{
                        background: isSoundEnabled 
                            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                            : 'rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: isSoundEnabled 
                            ? '0 4px 15px rgba(240, 147, 251, 0.4)'
                            : '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                    title={isSoundEnabled ? 'Sound FX On' : 'Sound FX Off'}
                >
                    {isSoundEnabled ? '🔊' : '🔈'}
                </button>
            </div>
            
            {/* Night Market Background - Always visible */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Night Sky */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900"></div>
                
                {/* City Buildings Skyline */}
                <div className="absolute bottom-0 left-0 right-0 h-full">
                    {[...Array(15)].map((_, i) => {
                        const height = 250 + Math.random() * 300;
                        const width = 60 + Math.random() * 80;
                        const left = i * 6.5;
                        return (
                            <div 
                                key={i}
                                className="absolute bottom-0"
                                style={{
                                    left: `${left}%`,
                                    width: `${width}px`,
                                    height: `${height}px`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 via-blue-900 to-gray-900 border-l border-r border-blue-700 opacity-80">
                                    {height > 450 && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-red-500">
                                            <div className="absolute top-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{left: '-0.125rem'}}></div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                                        {[...Array(Math.floor(height / 20) * 3)].map((_, w) => (
                                            <div 
                                                key={w} 
                                                className={`${
                                                    Math.random() > 0.3 ? 'bg-yellow-300' : 
                                                    Math.random() > 0.5 ? 'bg-blue-300' : 'bg-transparent'
                                                } opacity-70 rounded-sm`}
                                                style={{
                                                    boxShadow: Math.random() > 0.5 ? '0 0 8px rgba(255,255,150,0.6)' : 'none'
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
                                </div>
                            </div>
                        );
                    })}
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
                
                {/* Moon */}
                <div className="absolute top-20 right-32 w-24 h-24 bg-yellow-100 rounded-full" style={{boxShadow: '0 0 80px rgba(255,255,200,0.9), 0 0 120px rgba(255,255,150,0.6)'}}></div>
                
                {/* Falling Snow Effect */}
                <div className="absolute inset-0">
                    {[...Array(80)].map((_, i) => {
                        const size = 4 + Math.random() * 8;
                        const duration = 8 + Math.random() * 15;
                        const delay = Math.random() * 8;
                        const drift = (Math.random() - 0.5) * 100;
                        return (
                            <div
                                key={i}
                                className="absolute bg-white rounded-full"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `-20px`,
                                    animation: `snowfall-${i} ${duration}s linear infinite`,
                                    animationDelay: `${delay}s`,
                                    opacity: 0.6 + Math.random() * 0.4,
                                    boxShadow: '0 0 8px rgba(255,255,255,0.9)',
                                    filter: 'blur(0.5px)'
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>
            
            <style>{`
                ${[...Array(80)].map((_, i) => {
                    const drift = (Math.random() - 0.5) * 150;
                    return `
                        @keyframes snowfall-${i} {
                            0% {
                                transform: translateY(0) translateX(0) rotate(0deg);
                            }
                            100% {
                                transform: translateY(110vh) translateX(${drift}px) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg);
                            }
                        }
                    `;
                }).join('')}
            `}</style>
            
            {/* --- WHAT IS THIS GAME SCREEN (SHOWN FIRST) --- */}
            {screen === 'whatIsGame' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 right-4 z-20" style={{fontSize: '1rem'}}>
                        🏠 HOME
                    </button>
                    
                    <div className="panel-comic p-8 w-full max-w-2xl text-left pop-in overflow-y-auto max-h-[80vh] relative z-10">
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400 text-center" style={{textShadow:'2px 2px 0 #000'}}>
                        {lang === 'en' ? 'WHAT IS THIS GAME?' : '這是什麼遊戲？'}
                    </h2>
                    
                    <div className="font-comic text-white space-y-6">
                        {lang === 'en' ? (
                            <div>
                                <p className="text-lg md:text-xl leading-relaxed mb-4">
                                    The BET-0-BET Game is a digital version of the most popular game of chance found in Filipino town carnivals (known as Perya). 
                                    It is purely a game of luck where players choose a specific color, hoping that color appears when the dice are rolled.
                                </p>
                                <p className="text-lg md:text-xl leading-relaxed">
                                    We have reimagined the classic carnival experience with a dazzling Night Market style. Whether you are chasing nostalgia or just testing your destiny, this game brings the festive spirit of the fiesta straight to your pocket!
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg md:text-xl leading-relaxed">
                                    BET-0-BET遊戲是菲律賓鎮上嘉年華（稱為Perya）中最受歡迎的機會遊戲的數字版本。
                                    這純粹是一個運氣遊戲，玩家選擇特定顏色，希望擲骰子時出現該顏色。
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <button onClick={() => setScreen('tutorial')} className="btn-comic btn-comic-blue py-3 w-full mt-6">
                        {t.continue}
                    </button>
                </div>
                </>
            )}
            
            {/* --- MENU SCREEN --- */}
            {screen === 'menu' && (
                <div className="flex flex-col items-center w-full max-w-md pop-in relative z-10">
                    {/* Decorative Lanterns */}
                    <div className="lantern lantern-left"></div>
                    <div className="lantern lantern-right"></div>
                    {/* Decorative Burst */}
                    <div className="burst-star top-10 left-10"></div>
                    <div className="burst-star bottom-10 right-10" style={{background:'#ff3333'}}></div>

                    <div className="title-night-market">
                        <div className="title-bet-header">{t.title}</div>
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
                    </div>
                    <p className="text-center text-white text-sm mt-6" style={{fontFamily: 'Georgia, serif'}}>奎妲兒-DHARLS IBONALO QUINTO</p>
                </div>
            )}

            {/* --- MODE SELECTION SCREEN --- */}
            {screen === 'modeSelect' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen('tutorial')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 left-4 z-20" style={{fontSize: '1rem'}}>
                        ← {t.back}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 right-4 z-20" style={{fontSize: '1rem'}}>
                        🏠 HOME
                    </button>
                    
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
                            <button onClick={() => selectMode('twoplayer')} className="btn-comic py-4">
                                <div className="text-3xl mb-1">👥</div>
                                {t.twoPlayerMode}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* --- TWO PLAYER TUTORIAL SCREEN --- */}
            {screen === 'twoPlayerTutorial' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen('modeSelect')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 left-4 z-20" style={{fontSize: '1rem'}}>
                        ← {t.back}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 right-4 z-20" style={{fontSize: '1rem'}}>
                        🏠 HOME
                    </button>
                    
                    <div className="panel-comic p-8 w-full max-w-2xl text-left pop-in overflow-y-auto max-h-[80vh] relative z-10">
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400 text-center" style={{textShadow:'2px 2px 0 #000'}}>
                        {lang === 'en' ? '2 PLAYER CONTROLS' : '雙人遊戲控制'}
                    </h2>
                    
                    <div className="font-comic text-white space-y-6">
                        {lang === 'en' ? (
                            <>
                                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg">
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">🖱️ PLAYER 1 - MOUSE CONTROLS</h3>
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        Player 1 uses the <strong>MOUSE</strong> to click and select colors from the color grid.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-4 rounded-lg">
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">⌨️ PLAYER 2 - KEYBOARD CONTROLS</h3>
                                    <p className="text-lg md:text-xl leading-relaxed mb-3">
                                        Player 2 uses the <strong>KEYBOARD NUMBER KEYS</strong> to select colors:
                                    </p>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2">
                                        <li><strong className="text-red-300">1</strong> = 🔴 RED</li>
                                        <li><strong className="text-blue-300">2</strong> = 🔵 BLUE</li>
                                        <li><strong className="text-green-300">3</strong> = 🟢 GREEN</li>
                                        <li><strong className="text-yellow-300">4</strong> = 🟡 YELLOW</li>
                                        <li><strong className="text-gray-300">5</strong> = ⚪ WHITE</li>
                                        <li><strong className="text-pink-300">6</strong> = 🟣 PINK</li>
                                    </ul>
                                </div>

                                <div className="text-center bg-yellow-400 bg-opacity-20 p-4 rounded-lg">
                                    <p className="text-xl md:text-2xl text-yellow-400 font-bold">
                                        🎮 Both players select at the same time, then roll the dice! 🎲
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg">
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">🖱️ 玩家1 - 滑鼠控制</h3>
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        玩家1使用<strong>滑鼠</strong>點擊選擇顏色。
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-4 rounded-lg">
                                    <h3 className="text-2xl md:text-3xl text-yellow-400 mb-3">⌨️ 玩家2 - 鍵盤控制</h3>
                                    <p className="text-lg md:text-xl leading-relaxed mb-3">
                                        玩家2使用<strong>鍵盤數字鍵</strong>選擇顏色：
                                    </p>
                                    <ul className="text-lg md:text-xl leading-relaxed space-y-2">
                                        <li><strong className="text-red-300">1</strong> = 🔴 紅色</li>
                                        <li><strong className="text-blue-300">2</strong> = 🔵 藍色</li>
                                        <li><strong className="text-green-300">3</strong> = 🟢 綠色</li>
                                        <li><strong className="text-yellow-300">4</strong> = 🟡 黃色</li>
                                        <li><strong className="text-gray-300">5</strong> = ⚪ 白色</li>
                                        <li><strong className="text-pink-300">6</strong> = 🟣 粉色</li>
                                    </ul>
                                </div>

                                <div className="text-center bg-yellow-400 bg-opacity-20 p-4 rounded-lg">
                                    <p className="text-xl md:text-2xl text-yellow-400 font-bold">
                                        🎮 兩位玩家同時選擇，然後擲骰子！🎲
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    
                    <button onClick={() => setScreen('setup')} className="btn-comic btn-comic-blue py-3 w-full mt-6">
                        {t.continue}
                    </button>
                </div>
                </>
            )}

            {/* --- SETUP SCREEN --- */}
            {screen === 'setup' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen(gameMode === 'twoplayer' ? 'twoPlayerTutorial' : 'modeSelect')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 left-4 z-20" style={{fontSize: '1rem'}}>
                        ← {t.back}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 right-4 z-20" style={{fontSize: '1rem'}}>
                        🏠 HOME
                    </button>
                    
                    <div className="panel-comic p-8 w-full max-w-md text-center pop-in relative">
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
                        <button type="submit" disabled={!name || (gameMode === 'twoplayer' && !player2Name)} className="btn-comic w-full py-3">{t.start}</button>
                    </form>
                </div>
                </>
            )}

            {/* --- GAME SCREEN --- */}
            {screen === 'game' && (
                <div className="w-full max-w-lg flex flex-col items-center relative">
                    {/* Game Ambiance */}
                    <div className="game-lantern game-lantern-left"></div>
                    <div className="game-lantern game-lantern-right"></div>
                    
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
                                                onClick={() => {
                                                    playSound('click');
                                                    setSelectedColor(c);
                                                }}
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
                                                    onClick={() => {
                                                        playSound('click');
                                                        setPlayer2SelectedColor(c);
                                                    }}
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
                    <button onClick={() => setScreen('modeSelect')} className="btn-comic btn-comic-blue w-full py-3 mt-4">
                        {t.changeMode}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue w-full py-3 mt-2">
                        {t.exit}
                    </button>
                </div>
            )}

            {/* --- CREDITS SCREEN --- */}
            {screen === 'credits' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 left-4 z-20" style={{fontSize: '1rem'}}>
                        ← {t.back}
                    </button>
                    
                    <div className="panel-comic p-8 w-full max-w-md text-center pop-in">
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400" style={{textShadow:'2px 2px 0 #000'}}>{t.credits}</h2>
                    <p className="font-comic text-2xl md:text-3xl text-white mb-2">奎妲兒</p>
                    <p className="font-comic text-xl md:text-2xl text-white mb-2">資訊工程系</p>
                    <p className="font-comic text-xl md:text-2xl text-white mb-6">樹德科技大學</p>
                </div>
                </>
            )}

            {/* --- TUTORIAL SCREEN (WELCOME & RULES) --- */}
            {screen === 'tutorial' && (
                <>
                    {/* Corner Navigation Buttons */}
                    <button onClick={() => setScreen('whatIsGame')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 left-4 z-20" style={{fontSize: '1rem'}}>
                        ← {t.back}
                    </button>
                    <button onClick={() => setScreen('menu')} className="btn-comic btn-comic-blue py-2 px-4 fixed top-4 right-4 z-20" style={{fontSize: '1rem'}}>
                        🏠 HOME
                    </button>
                    
                    <div className="panel-comic p-8 w-full max-w-2xl text-left pop-in overflow-y-auto max-h-[80vh]">
                    <h2 className="font-comic text-4xl md:text-5xl mb-6 text-yellow-400 text-center" style={{textShadow:'2px 2px 0 #000'}}>
                        {lang === 'en' ? 'WELCOME TO BET-0-BET!' : '歡迎來到BET-0-BET！'}
                    </h2>
                    
                    <div className="font-comic text-white space-y-6">
                        {lang === 'en' ? (
                            <>
                                <div>
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">1. How to Play:</h4>
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
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">2. The "Survival" Rule (Chances):</h4>
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
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">1. 如何玩：</h4>
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
                                    <h4 className="text-xl md:text-2xl text-yellow-400 mb-2">2. "生存"規則（機會）：</h4>
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
                    
                    <button onClick={() => setScreen('modeSelect')} className="btn-comic btn-comic-blue py-3 w-full mt-6">{t.continue}</button>
                </div>
                </>
            )}

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
