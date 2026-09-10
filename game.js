/* =========================================================
   KRISH SOCCER V0.4
   BEAST FOOTBALL ENGINE

   FEATURES
   ---------------------------------------------------------
   ⚽ Improved player models
   ⚽ Ball physics
   🧠 AI teammates
   🧠 AI opponents
   🧤 Goalkeeper
   🎥 Dynamic camera
   💚 Stamina
   🔄 Player switching
   🎮 Joystick
   A = PASS / THROUGH PASS
   B = SHOOT / POWER SHOT
   C = SKILL / SPRINT
   🥅 Goals
   ⏱ Match clock
   ⏸ Pause
   ========================================================= */


/* =========================================================
   TEAMS
   ========================================================= */

const teams = {

    "Premier League": [
        "Liverpool",
        "Arsenal",
        "Manchester City",
        "Manchester United",
        "Chelsea",
        "Tottenham",
        "Newcastle United",
        "Aston Villa",
        "West Ham United",
        "Everton"
    ],

    "La Liga": [
        "Barcelona",
        "Real Madrid",
        "Atletico Madrid",
        "Sevilla",
        "Valencia",
        "Villarreal"
    ],

    "Serie A": [
        "Inter Milan",
        "AC Milan",
        "Juventus",
        "Napoli",
        "Roma",
        "Lazio"
    ],

    "Bundesliga": [
        "Bayern Munich",
        "Borussia Dortmund",
        "RB Leipzig",
        "Bayer Leverkusen",
        "Eintracht Frankfurt"
    ]

};


/* =========================================================
   SCREEN SYSTEM
   ========================================================= */

const screens = [
    "homeScreen",
    "teamScreen",
    "onlineScreen",
    "managerScreen",
    "matchScreen"
];


function showScreen(id) {

    screens.forEach(screenId => {

        const element =
            document.getElementById(screenId);

        if (element) {
            element.classList.add("hidden");
        }

    });

    const target =
        document.getElementById(id);

    if (target) {
        target.classList.remove("hidden");
    }

}


/* =========================================================
   MENU
   ========================================================= */

function goHome() {

    exitMatch();

    showScreen("homeScreen");

}


function startOffline() {

    showScreen("teamScreen");

    const area =
        document.getElementById("teamArea");

    area.innerHTML = `

        <div style="
            margin-top:20px;
            padding:20px;
            border-radius:15px;
            background:rgba(255,255,255,.06);
        ">

            <strong>
                ⚽ OFFLINE MATCH
            </strong>

            <p style="
                margin-top:8px;
                opacity:.7;
            ">
                Choose a league and club.
            </p>

        </div>

    `;

}


function showLeague() {

    showScreen("teamScreen");

    document.getElementById(
        "teamArea"
    ).innerHTML = `

        <div style="
            margin-top:20px;
            padding:20px;
            border-radius:15px;
            background:rgba(0,255,136,.08);
        ">

            <strong>
                🏆 KRISH LEAGUE
            </strong>

            <p style="
                margin-top:8px;
                opacity:.7;
            ">
                Choose your competition.
            </p>

        </div>

    `;

}


function selectLeague(league) {

    const area =
        document.getElementById(
            "teamArea"
        );

    const leagueTeams =
        teams[league] || [];

    let html = `

        <h3 style="margin-top:20px;">
            ${league}
        </h3>

        <p style="
            margin-top:6px;
            opacity:.7;
        ">
            Choose your club.
        </p>

        <div class="team-grid">

    `;

    leagueTeams.forEach(team => {

        html += `

            <button
                class="team-button"
                onclick="selectTeam('${team}', '${league}')"
            >
                ⚽ ${team}
            </button>

        `;

    });

    html += `
        </div>
    `;

    area.innerHTML = html;

}


function selectTeam(team, league) {

    const area =
        document.getElementById(
            "teamArea"
        );

    area.innerHTML = `

        <div style="
            margin-top:20px;
            padding:22px;
            border-radius:18px;
            background:rgba(255,255,255,.07);
            text-align:center;
        ">

            <div style="
                font-size:55px;
            ">
                ⚽
            </div>

            <h2>
                ${team}
            </h2>

            <p style="
                opacity:.7;
            ">
                ${league}
            </p>

            <button
                style="
                    margin-top:20px;
                    padding:15px 25px;
                    border-radius:12px;
                    background:
                    linear-gradient(
                        135deg,
                        #087f46,
                        #064b2e
                    );
                "
                onclick="launchMatch('${team}')"
            >
                ⚽ PLAY MATCH
            </button>

        </div>

    `;

}


/* =========================================================
   ONLINE
   ========================================================= */

function showOnline() {

    showScreen("onlineScreen");

    document.getElementById(
        "onlineMessage"
    ).innerHTML =
        "🌐 ONLINE SYSTEM READY";

}


function quickMatch() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML =
        "⚔️ QUICK MATCH<br><br>Online matchmaking coming next.";

}


function krishLeague() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML =
        "🏆 KRISH LEAGUE<br><br>League system coming next.";

}


function findOpponent() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML =
        "🔎 FIND OPPONENT<br><br>Opponent search coming next.";

}


/* =========================================================
   MANAGER
   ========================================================= */

function showManager() {

    showScreen("managerScreen");

    loadManager();

}


function loadManager() {

    const data =
        localStorage.getItem(
            "krishManager"
        );

    if (!data) {
        return;
    }

    let manager;

    try {

        manager =
            JSON.parse(data);

    } catch (error) {

        console.error(error);

        return;

    }

    const card =
        document.querySelector(
            ".manager-card"
        );

    if (!card) {
        return;
    }

    card.innerHTML = `

        <div class="manager-photo">
            👔
        </div>

        <h3>
            ${manager.name}
        </h3>

        <p style="margin-top:10px;">
            Club:
            <strong>
                ${manager.team}
            </strong>
        </p>

        <div class="manager-stats">

            <div>
                <strong>
                    ${manager.rating}
                </strong>
                <span>
                    RATING
                </span>
            </div>

            <div>
                <strong>
                    ${manager.trophies}
                </strong>
                <span>
                    TROPHIES
                </span>
            </div>

            <div>
                <strong>
                    ${manager.matches}
                </strong>
                <span>
                    MATCHES
                </span>
            </div>

        </div>

    `;

}


/* =========================================================
   GAME STATE
   ========================================================= */

const game = {

    canvas: null,

    ctx: null,

    width: 0,

    height: 0,

    running: false,

    paused: false,

    animationId: null,

    lastTime: 0,

    elapsed: 0,

    matchDuration: 180,

    homeScore: 0,

    awayScore: 0,

    selectedTeam: "KRISH FC",

    camera: {

        x: 0,

        y: 0,

        zoom: 1

    },

    pitch: {

        x: 0,

        y: 0,

        width: 0,

        height: 0

    },

    player: null,

    teammates: [],

    opponents: [],

    ball: null,

    possessionHome: 0,

    possessionAway: 0,

    switchCooldown: 0

};


/* =========================================================
   PLAYER CREATOR
   ========================================================= */

function createPlayer(
    x,
    y,
    team,
    number,
    role
) {

    return {

        x: x,

        y: y,

        vx: 0,

        vy: 0,

        radius: 14,

        team: team,

        number: number,

        role: role,

        speed:
            role === "GK"
                ? 150
                : 205,

        stamina: 100,

        controlled: false,

        facingX:
            team === "home"
                ? 1
                : -1,

        facingY: 0,

        aiTimer:
            Math.random() * 2,

        hasBall: false,

        kickCooldown: 0,

        skin:
            Math.random(),

        bob:
            Math.random() * Math.PI * 2

    };

}


/* =========================================================
   START MATCH
   ========================================================= */

function launchMatch(team) {

    game.selectedTeam =
        team || "KRISH FC";

    showScreen("matchScreen");

    setupCanvas();

    createMatch();

    game.running = true;

    game.paused = false;

    game.lastTime =
        performance.now();

    showActionMessage(
        "⚽ KICK OFF!"
    );

    startGameLoop();

}


/* =========================================================
   CREATE MATCH
   ========================================================= */

function createMatch() {

    game.elapsed = 0;

    game.homeScore = 0;

    game.awayScore = 0;

    game.possessionHome = 0;

    game.possessionAway = 0;

    updateScoreboard();

    calculatePitch();

    const p =
        game.pitch;


    /* =====================================================
       HOME TEAM
       ===================================================== */

    game.player =
        createPlayer(
            p.x + p.width * .30,
            p.y + p.height * .50,
            "home",
            10,
            "ST"
        );

    game.player.controlled = true;


    game.teammates = [

        createPlayer(
            p.x + p.width * .20,
            p.y + p.height * .28,
            "home",
            7,
            "LW"
        ),

        createPlayer(
            p.x + p.width * .20,
            p.y + p.height * .72,
            "home",
            11,
            "RW"
        ),

        createPlayer(
            p.x + p.width * .14,
            p.y + p.height * .50,
            "home",
            8,
            "CM"
        ),

        createPlayer(
            p.x + p.width * .08,
            p.y + p.height * .30,
            "home",
            3,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .08,
            p.y + p.height * .70,
            "home",
            4,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .04,
            p.y + p.height * .50,
            "home",
            1,
            "GK"
        )

    ];


    /* =====================================================
       AWAY TEAM
       ===================================================== */

    game.opponents = [

        createPlayer(
            p.x + p.width * .70,
            p.y + p.height * .28,
            "away",
            7,
            "LW"
        ),

        createPlayer(
            p.x + p.width * .70,
            p.y + p.height * .72,
            "away",
            11,
            "RW"
        ),

        createPlayer(
            p.x + p.width * .80,
            p.y + p.height * .50,
            "away",
            8,
            "CM"
        ),

        createPlayer(
            p.x + p.width * .90,
            p.y + p.height * .30,
            "away",
            3,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .90,
            p.y + p.height * .70,
            "away",
            4,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .96,
            p.y + p.height * .50,
            "away",
            1,
            "GK"
        )

    ];


    /* =====================================================
       BALL
       ===================================================== */

    game.ball = {

        x:
            game.player.x +
            20,

        y:
            game.player.y,

        vx: 0,

        vy: 0,

        radius: 7,

        owner:
            game.player,

        free: false,

        spin: 0

    };


    game.camera.x =
        game.player.x;

    game.camera.y =
        game.player.y;

    game.camera.zoom = 1;

    updateBallStatus();

}


/* =========================================================
   CANVAS
   ========================================================= */

function setupCanvas() {

    game.canvas =
        document.getElementById(
            "footballCanvas"
        );

    if (!game.canvas) {
        return;
    }

    game.ctx =
        game.canvas.getContext(
            "2d"
        );

    resizeCanvas();

}


function resizeCanvas() {

    if (!game.canvas) {
        return;
    }

    const rect =
        game.canvas.getBoundingClientRect();

    const ratio =
        window.devicePixelRatio || 1;

    game.canvas.width =
        Math.max(
            1,
            Math.floor(
                rect.width * ratio
            )
        );

    game.canvas.height =
        Math.max(
            1,
            Math.floor(
                rect.height * ratio
            )
        );

    game.ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    game.width =
        rect.width;

    game.height =
        rect.height;

    calculatePitch();

    if (game.player) {
        keepPlayersInside();
    }

}


/* =========================================================
   LARGE PITCH
   ========================================================= */

function calculatePitch() {

    const pitchWidth =
        Math.max(
            1400,
            game.width * 1.65
        );

    const pitchHeight =
        Math.max(
            700,
            game.height * 1.45
        );

    game.pitch = {

        x: 0,

        y: 0,

        width: pitchWidth,

        height: pitchHeight

    };

}


/* =========================================================
   GAME LOOP
   ========================================================= */

function startGameLoop() {

    if (game.animationId) {

        cancelAnimationFrame(
            game.animationId
        );

    }

    game.animationId =
        requestAnimationFrame(
            gameLoop
        );

}


function gameLoop(timestamp) {

    if (!game.running) {
        return;
    }

    const delta =
        Math.min(
            .035,
            Math.max(
                0,
                (timestamp -
                    game.lastTime) /
                1000
            )
        );

    game.lastTime =
        timestamp;

    if (!game.paused) {

        game.elapsed += delta;

        updateGame(delta);

    }

    drawGame();

    game.animationId =
        requestAnimationFrame(
            gameLoop
        );

}


/* =========================================================
   UPDATE
   ========================================================= */

function updateGame(delta) {

    if (!game.player) {
        return;
    }

    updateControlledPlayer(
        delta
    );

    updateTeammates(
        delta
    );

    updateOpponents(
        delta
    );

    updateBall(
        delta
    );

    updatePlayerCollisions();

    keepPlayersInside();

    updateCamera(delta);

    updatePossession();

    updateMatchClock();

    updateHUD();

    if (
        game.switchCooldown >
        0
    ) {

        game.switchCooldown -=
            delta;

    }

    if (
        game.elapsed >=
        game.matchDuration
    ) {

        finishMatch();

    }

}


/* =========================================================
   CONTROLLED PLAYER
   ========================================================= */

function updateControlledPlayer(delta) {

    const player =
        game.player;

    if (!player) {
        return;
    }

    const inputX =
        joystick.x;

    const inputY =
        joystick.y;

    const magnitude =
        Math.min(
            1,
            Math.sqrt(
                inputX * inputX +
                inputY * inputY
            )
        );

    const moving =
        magnitude > .05;

    let speed =
        player.speed;

    if (
        matchState.sprint &&
        player.stamina > 0
    ) {

        speed *= 1.55;

        player.stamina =
            Math.max(
                0,
                player.stamina -
                20 * delta
            );

    } else if (
        moving
    ) {

        player.stamina =
            Math.max(
                0,
                player.stamina -
                5 * delta
            );

    } else {

        player.stamina =
            Math.min(
                100,
                player.stamina +
                10 * delta
            );

    }


    if (moving) {

        player.vx =
            inputX *
            speed;

        player.vy =
            inputY *
            speed;

        player.facingX =
            inputX;

        player.facingY =
            inputY;

    } else {

        player.vx *= .75;

        player.vy *= .75;

    }


    player.x +=
        player.vx *
        delta;

    player.y +=
        player.vy *
        delta;


    if (
        game.ball &&
        game.ball.owner !==
            player &&
        distance(
            player,
            game.ball
        ) <
            player.radius +
            game.ball.radius +
            8
    ) {

        takeBall(
            player
        );

    }


    if (
        game.ball &&
        game.ball.owner ===
            player
    ) {

        player.hasBall = true;

    } else {

        player.hasBall = false;

    }

}


/* =========================================================
   AI TEAMMATES
   ========================================================= */

function updateTeammates(delta) {

    const ball =
        game.ball;

    if (!ball) {
        return;
    }

    game.teammates.forEach(
        player => {

            player.aiTimer +=
                delta;

            let targetX =
                player.x;

            let targetY =
                player.y;


            if (
                ball.owner &&
                ball.owner.team ===
                    "home"
            ) {

                const attacking =
                    ball.x >
                    game.pitch.width *
                    .45;

                if (
                    player.role ===
                    "GK"
                ) {

                    targetX =
                        game.pitch.x +
                        55;

                    targetY =
                        ball.y;

                } else {

                    targetX =
                        ball.x -
                        100;

                    targetY =
                        player.y +
                        Math.sin(
                            player.aiTimer
                        ) *
                        30;

                    if (
                        player.role ===
                        "LW"
                    ) {

                        targetY =
                            game.pitch.y +
                            game.pitch.height *
                            .25;

                    }

                    if (
                        player.role ===
                        "RW"
                    ) {

                        targetY =
                            game.pitch.y +
                            game.pitch.height *
                            .75;

                    }

                    if (
                        !attacking
                    ) {

                        targetX =
                            game.pitch.x +
                            game.pitch.width *
                            .22;

                    }

                }

            } else {

                targetX =
                    game.pitch.x +
                    game.pitch.width *
                    .30;

                targetY =
                    game.pitch.y +
                    game.pitch.height *
                    .50;

            }


            aiMove(
                player,
                targetX,
                targetY,
                delta,
                .75
            );


            if (
                ball.free &&
                distance(
                    player,
                    ball
                ) < 30
            ) {

                takeBall(
                    player
                );

            }

        }
    );

}


/* =========================================================
   AI OPPONENTS
   ========================================================= */

function updateOpponents(delta) {

    const ball =
        game.ball;

    if (!ball) {
        return;
    }

    game.opponents.forEach(
        player => {

            let targetX =
                player.x;

            let targetY =
                player.y;


            if (
                player.role ===
                "GK"
            ) {

                targetX =
                    game.pitch.x +
                    game.pitch.width -
                    45;

                targetY =
                    clamp(
                        ball.y,

                        game.pitch.y +
                        game.pitch.height *
                        .35,

                        game.pitch.y +
                        game.pitch.height *
                        .65
                    );

            } else if (
                ball.owner &&
                ball.owner.team ===
                    "home"
            ) {

                targetX =
                    ball.x +
                    30;

                targetY =
                    ball.y;

            } else {

                targetX =
                    game.pitch.x +
                    game.pitch.width *
                    .70;

                if (
                    player.role ===
                    "LW"
                ) {

                    targetY =
                        game.pitch.y +
                        game.pitch.height *
                        .25;

                } else if (
                    player.role ===
                    "RW"
                ) {

                    targetY =
                        game.pitch.y +
                        game.pitch.height *
                        .75;

                } else {

                    targetY =
                        ball.y;

                }

            }


            aiMove(
                player,
                targetX,
                targetY,
                delta,
                player.role ===
                    "GK"
                    ? .65
                    : .80
            );


            if (
                ball.free &&
                distance(
                    player,
                    ball
                ) < 30
            ) {

                takeBall(
                    player
                );

            }


            if (
                ball.owner ===
                    player &&
                player.role !==
                    "GK"
            ) {

                aiOpponentDecision(
                    player
                );

            }

        }
    );

}


/* =========================================================
   AI MOVEMENT
   ========================================================= */

function aiMove(
    player,
    targetX,
    targetY,
    delta,
    multiplier
) {

    const dx =
        targetX -
        player.x;

    const dy =
        targetY -
        player.y;

    const len =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (len < 5) {

        player.vx *= .8;

        player.vy *= .8;

        return;

    }

    const nx =
        dx / len;

    const ny =
        dy / len;

    const speed =
        player.speed *
        multiplier;

    player.vx =
        nx *
        speed;

    player.vy =
        ny *
        speed;

    player.facingX =
        nx;

    player.facingY =
        ny;

    player.x +=
        player.vx *
        delta;

    player.y +=
        player.vy *
        delta;

}


/* =========================================================
   AI DECISION
   ========================================================= */

function aiOpponentDecision(
    player
) {

    const ball =
        game.ball;

    if (!ball) {
        return;
    }

    const goalX =
        game.pitch.x;

    const goalY =
        game.pitch.y +
        game.pitch.height / 2;

    const distanceToGoal =
        Math.abs(
            player.x -
            goalX
        );


    if (
        distanceToGoal <
        game.pitch.width *
        .30
    ) {

        aiKick(
            player,
            goalX,
            goalY,
            780
        );

    }

}


/* =========================================================
   BALL
   ========================================================= */

function updateBall(delta) {

    const ball =
        game.ball;

    if (!ball) {
        return;
    }


    if (ball.owner) {

        const owner =
            ball.owner;

        const facingLength =
            Math.sqrt(
                owner.facingX *
                owner.facingX +
                owner.facingY *
                owner.facingY
            ) || 1;

        const fx =
            owner.facingX /
            facingLength;

        const fy =
            owner.facingY /
            facingLength;

        ball.x =
            owner.x +
            fx *
            18;

        ball.y =
            owner.y +
            fy *
            18;

        ball.vx =
            owner.vx;

        ball.vy =
            owner.vy;

        ball.spin +=
            delta *
            8;

        return;

    }


    ball.x +=
        ball.vx *
        delta;

    ball.y +=
        ball.vy *
        delta;


    ball.vx *=
        Math.pow(
            .035,
            delta
        );

    ball.vy *=
        Math.pow(
            .035,
            delta
        );


    ball.spin +=
        delta *
        15;


    const p =
        game.pitch;


    /* SIDELINE BOUNCE */

    if (
        ball.y -
        ball.radius <
        p.y
    ) {

        ball.y =
            p.y +
            ball.radius;

        ball.vy =
            Math.abs(
                ball.vy
            ) *
            .65;

    }


    if (
        ball.y +
        ball.radius >
        p.y +
        p.height
    ) {

        ball.y =
            p.y +
            p.height -
            ball.radius;

        ball.vy =
            -Math.abs(
                ball.vy
            ) *
            .65;

    }


    checkGoal();

}


/* =========================================================
   TAKE BALL
   ========================================================= */

function takeBall(
    player
) {

    if (!game.ball) {
        return;
    }

    if (
        player.kickCooldown >
        0
    ) {
        return;
    }

    if (
        game.ball.owner ===
        player
    ) {
        return;
    }


    game.ball.owner =
        player;

    game.ball.free =
        false;

    player.hasBall =
        true;

    game.ball.vx = 0;

    game.ball.vy = 0;


    game.ballStatus =
        player.team ===
            "home"
            ? "YOU HAVE BALL"
            : "OPPONENT BALL";

    updateBallStatus();

}


/* =========================================================
   KICK BALL
   ========================================================= */

function kickBall(
    power,
    angle
) {

    const ball =
        game.ball;

    if (!ball) {
        return false;
    }

    if (
        ball.owner !==
        game.player
    ) {

        return false;

    }


    const player =
        game.player;


    if (
        angle ===
        undefined
    ) {

        angle =
            Math.atan2(
                player.facingY,
                player.facingX
            );

    }


    const fx =
        Math.cos(angle);

    const fy =
        Math.sin(angle);


    ball.owner = null;

    ball.free = true;

    ball.x =
        player.x +
        fx *
        25;

    ball.y =
        player.y +
        fy *
        25;

    ball.vx =
        fx *
        power +
        player.vx *
        .35;

    ball.vy =
        fy *
        power +
        player.vy *
        .35;


    player.hasBall =
        false;

    player.kickCooldown =
        .25;


    setTimeout(
        () => {

            if (player) {
                player.kickCooldown =
                    0;
            }

        },
        250
    );


    return true;

}


/* =========================================================
   AI KICK
   ========================================================= */

function aiKick(
    player,
    targetX,
    targetY,
    power
) {

    const ball =
        game.ball;

    if (
        !ball ||
        ball.owner !==
        player
    ) {
        return;
    }


    const dx =
        targetX -
        player.x;

    const dy =
        targetY -
        player.y;

    const angle =
        Math.atan2(
            dy,
            dx
        );


    ball.owner = null;

    ball.free = true;

    ball.x =
        player.x +
        Math.cos(angle) *
        25;

    ball.y =
        player.y +
        Math.sin(angle) *
        25;

    ball.vx =
        Math.cos(angle) *
        power;

    ball.vy =
        Math.sin(angle) *
        power;


    player.hasBall =
        false;

}


/* =========================================================
   PLAYER COLLISIONS
   ========================================================= */

function updatePlayerCollisions() {

    const allPlayers = [

        game.player,

        ...game.teammates,

        ...game.opponents

    ].filter(Boolean);


    for (
        let i = 0;
        i < allPlayers.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < allPlayers.length;
            j++
        ) {

            const a =
                allPlayers[i];

            const b =
                allPlayers[j];

            const dx =
                b.x -
                a.x;

            const dy =
                b.y -
                a.y;

            const d =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            const minDistance =
                a.radius +
                b.radius -
                2;

            if (
                d > 0 &&
                d < minDistance
            ) {

                const push =
                    (
                        minDistance -
                        d
                    ) /
                    2;

                const nx =
                    dx / d;

                const ny =
                    dy / d;

                a.x -=
                    nx *
                    push;

                a.y -=
                    ny *
                    push;

                b.x +=
                    nx *
                    push;

                b.y +=
                    ny *
                    push;

            }

        }

    }

}


/* =========================================================
   GOALS
   ========================================================= */

function checkGoal() {

    const ball =
        game.ball;

    const p =
        game.pitch;

    if (!ball) {
        return;
    }


    const goalHeight =
        p.height *
        .20;

    const goalTop =
        p.y +
        (
            p.height -
            goalHeight
        ) /
        2;


    const insideGoal =
        ball.y >
        goalTop &&
        ball.y <
        goalTop +
        goalHeight;


    if (
        ball.x <
        p.x -
        30 &&
        insideGoal
    ) {

        game.awayScore++;

        updateScoreboard();

        resetAfterGoal(
            "🔴 OPPONENT SCORES!"
        );

        return;

    }


    if (
        ball.x >
        p.x +
        p.width +
        30 &&
        insideGoal
    ) {

        game.homeScore++;

        updateScoreboard();

        resetAfterGoal(
            "🔥🔥 GOAL! KRISH SCORES!"
        );

    }

}


/* =========================================================
   RESET AFTER GOAL
   ========================================================= */

function resetAfterGoal(
    message
) {

    if (!game.running) {
        return;
    }

    showActionMessage(
        message
    );


    game.ball.owner =
        null;

    game.ball.free =
        true;

    game.ball.vx = 0;

    game.ball.vy = 0;


    setTimeout(
        () => {

            if (!game.running) {
                return;
            }

            const p =
                game.pitch;


            game.player.x =
                p.x +
                p.width *
                .30;

            game.player.y =
                p.y +
                p.height *
                .50;


            game.ball.x =
                game.player.x +
                20;

            game.ball.y =
                game.player.y;

            game.ball.vx = 0;

            game.ball.vy = 0;

            game.ball.owner =
                game.player;

            game.ball.free =
                false;

            updateBallStatus();

        },
        1000
    );

}


/* =========================================================
   CAMERA
   ========================================================= */

function updateCamera(delta) {

    const target =
        game.player;

    if (!target) {
        return;
    }


    const targetX =
        target.x;

    const targetY =
        target.y;


    game.camera.x +=
        (
            targetX -
            game.camera.x
        ) *
        Math.min(
            1,
            delta *
            5
        );


    game.camera.y +=
        (
            targetY -
            game.camera.y
        ) *
        Math.min(
            1,
            delta *
            5
        );


    const halfW =
        game.width /
        game.camera.zoom /
        2;

    const halfH =
        game.height /
        game.camera.zoom /
        2;


    game.camera.x =
        clamp(
            game.camera.x,
            halfW,
            game.pitch.width -
            halfW
        );


    game.camera.y =
        clamp(
            game.camera.y,
            halfH,
            game.pitch.height -
            halfH
        );

}


/* =========================================================
   DRAW
   ========================================================= */

function drawGame() {

    const ctx =
        game.ctx;

    if (!ctx) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        game.width,
        game.height
    );


    ctx.save();


    const zoom =
        game.camera.zoom;


    ctx.translate(
        game.width / 2,
        game.height / 2
    );


    ctx.scale(
        zoom,
        zoom
    );


    ctx.translate(
        -game.camera.x,
        -game.camera.y
    );


    drawPitch(
        ctx,
        game.pitch
    );


    drawGoals(
        ctx,
        game.pitch
    );


    game.teammates.forEach(
        player =>
            drawPlayer(
                ctx,
                player
            )
    );


    game.opponents.forEach(
        player =>
            drawPlayer(
                ctx,
                player
            )
    );


    if (game.player) {

        drawPlayer(
            ctx,
            game.player
        );

    }


    drawBall(
        ctx,
        game.ball
    );


    ctx.restore();

}


/* =========================================================
   PITCH DRAWING
   ========================================================= */

function drawPitch(
    ctx,
    p
) {

    ctx.fillStyle =
        "#08752f";

    ctx.fillRect(
        p.x - 500,
        p.y - 500,
        p.width + 1000,
        p.height + 1000
    );


    ctx.fillStyle =
        "#16883b";

    ctx.fillRect(
        p.x,
        p.y,
        p.width,
        p.height
    );


    /* GRASS STRIPES */

    const stripeWidth =
        p.width /
        20;


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        if (
            i % 2 === 0
        ) {

            ctx.fillStyle =
                "rgba(255,255,255,.035)";

            ctx.fillRect(
                p.x +
                stripeWidth *
                i,

                p.y,

                stripeWidth,

                p.height
            );

        }

    }


    /* OUTER LINE */

    ctx.strokeStyle =
        "rgba(255,255,255,.95)";

    ctx.lineWidth = 5;

    ctx.strokeRect(
        p.x,
        p.y,
        p.width,
        p.height
    );


    /* HALF WAY */

    ctx.beginPath();

    ctx.moveTo(
        p.x +
        p.width / 2,
        p.y
    );

    ctx.lineTo(
        p.x +
        p.width / 2,
        p.y +
        p.height
    );

    ctx.stroke();


    /* CENTER CIRCLE */

    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width / 2,

        p.y +
        p.height / 2,

        Math.min(
            p.height * .15,
            p.width * .10
        ),

        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.fillStyle =
        "white";

    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width / 2,

        p.y +
        p.height / 2,

        5,

        0,
        Math.PI * 2
    );

    ctx.fill();


    /* PENALTY BOXES */

    const boxWidth =
        p.width *
        .13;

    const boxHeight =
        p.height *
        .46;


    ctx.strokeRect(
        p.x,

        p.y +
        (
            p.height -
            boxHeight
        ) /
        2,

        boxWidth,
        boxHeight
    );


    ctx.strokeRect(
        p.x +
        p.width -
        boxWidth,

        p.y +
        (
            p.height -
            boxHeight
        ) /
        2,

        boxWidth,
        boxHeight
    );


    /* SIX YARD BOXES */

    const smallWidth =
        p.width *
        .055;

    const smallHeight =
        p.height *
        .25;


    ctx.strokeRect(
        p.x,

        p.y +
        (
            p.height -
            smallHeight
        ) /
        2,

        smallWidth,
        smallHeight
    );


    ctx.strokeRect(
        p.x +
        p.width -
        smallWidth,

        p.y +
        (
            p.height -
            smallHeight
        ) /
        2,

        smallWidth,
        smallHeight
    );


    /* PENALTY SPOTS */

    ctx.beginPath();

    ctx.arc(
        p.x +
        boxWidth *
        .72,

        p.y +
        p.height / 2,

        4,

        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width -
        boxWidth *
        .72,

        p.y +
        p.height / 2,

        4,

        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =========================================================
   GOALS
   ========================================================= */

function drawGoals(
    ctx,
    p
) {

    const goalHeight =
        p.height *
        .20;

    const goalY =
        p.y +
        (
            p.height -
            goalHeight
        ) /
        2;


    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 7;


    /* LEFT GOAL */

    ctx.strokeRect(
        p.x - 35,
        goalY,
        35,
        goalHeight
    );


    /* RIGHT GOAL */

    ctx.strokeRect(
        p.x +
        p.width,

        goalY,

        35,

        goalHeight
    );


    /* NET LINES */

    ctx.lineWidth = 1;

    ctx.strokeStyle =
        "rgba(255,255,255,.30)";


    for (
        let y = goalY;
        y < goalY + goalHeight;
        y += 12
    ) {

        ctx.beginPath();

        ctx.moveTo(
            p.x - 35,
            y
        );

        ctx.lineTo(
            p.x,
            y
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            p.x +
            p.width,

            y
        );

        ctx.lineTo(
            p.x +
            p.width +
            35,

            y
        );

        ctx.stroke();

    }

}


/* =========================================================
   PLAYER DRAWING
   ========================================================= */

function drawPlayer(
    ctx,
    player
) {

    if (!player) {
        return;
    }


    const home =
        player.team ===
        "home";


    const moving =
        Math.abs(
            player.vx
        ) +
        Math.abs(
            player.vy
        ) >
        20;


    const bob =
        moving
            ? Math.sin(
                performance.now() /
                90 +
                player.bob
            ) *
            2
            : 0;


    /* SHADOW */

    ctx.fillStyle =
        "rgba(0,0,0,.30)";

    ctx.beginPath();

    ctx.ellipse(
        player.x,
        player.y + 18,
        16,
        6,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.save();

    ctx.translate(
        player.x,
        player.y + bob
    );


    /* LEGS */

    ctx.strokeStyle =
        "#17202a";

    ctx.lineWidth = 5;

    ctx.lineCap =
        "round";


    ctx.beginPath();

    ctx.moveTo(
        -5,
        8
    );

    ctx.lineTo(
        -8,
        19
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        5,
        8
    );

    ctx.lineTo(
        8,
        19
    );

    ctx.stroke();


    /* BODY */

    ctx.fillStyle =
        home
            ? "#168cff"
            : "#e52f42";


    if (
        player.role ===
        "GK"
    ) {

        ctx.fillStyle =
            home
                ? "#ffd23f"
                : "#9b59ff";

    }


    ctx.beginPath();

    ctx.roundRect(
        -11,
        -6,
        22,
        22,
        6
    );

    ctx.fill();


    /* SHIRT DETAIL */

    ctx.fillStyle =
        "rgba(255,255,255,.20)";

    ctx.fillRect(
        -8,
        -4,
        16,
        4
    );


    /* ARMS */

    ctx.strokeStyle =
        player.role ===
            "GK"
            ? "#f1c6a8"
            : "#d9a987";

    ctx.lineWidth = 4;


    ctx.beginPath();

    ctx.moveTo(
        -10,
        -1
    );

    ctx.lineTo(
        -16,
        7
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        10,
        -1
    );

    ctx.lineTo(
        16,
        7
    );

    ctx.stroke();


    /* HEAD */

    ctx.fillStyle =
        "#d9a987";

    ctx.beginPath();

    ctx.arc(
        0,
        -13,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* HAIR */

    ctx.fillStyle =
        "#17120e";

    ctx.beginPath();

    ctx.arc(
        0,
        -16,
        8,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();


    /* NUMBER */

    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 9px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        player.number,
        0,
        5
    );


    ctx.restore();


    /* CONTROLLED PLAYER RING */

    if (
        player.controlled
    ) {

        ctx.strokeStyle =
            "#ffe600";

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            player.radius +
            9,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        ctx.fillStyle =
            "#ffe600";

        ctx.beginPath();

        ctx.moveTo(
            player.x,
            player.y -
            32
        );

        ctx.lineTo(
            player.x - 6,
            player.y - 23
        );

        ctx.lineTo(
            player.x + 6,
            player.y - 23
        );

        ctx.closePath();

        ctx.fill();

    }


    /* BALL POSSESSION MARKER */

    if (
        player.hasBall
    ) {

        ctx.strokeStyle =
            "rgba(255,255,255,.65)";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            player.radius +
            4,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }

}


/* =========================================================
   BALL DRAWING
   ========================================================= */

function drawBall(
    ctx,
    ball
) {

    if (!ball) {
        return;
    }


    /* SHADOW */

    ctx.fillStyle =
        "rgba(0,0,0,.35)";

    ctx.beginPath();

    ctx.ellipse(
        ball.x,
        ball.y + 7,
        8,
        3,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* BALL */

    ctx.save();

    ctx.translate(
        ball.x,
        ball.y
    );

    ctx.rotate(
        ball.spin
    );


    ctx.fillStyle =
        "white";

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        ball.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.strokeStyle =
        "#222";

    ctx.lineWidth = 1;

    ctx.stroke();


    /* BALL PATTERN */

    ctx.fillStyle =
        "#111";

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        2.3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            5;

        ctx.beginPath();

        ctx.arc(
            Math.cos(angle) *
            4,

            Math.sin(angle) *
            4,

            1.2,

            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    ctx.restore();

}


/* =========================================================
   PLAYER SWITCHING
   ========================================================= */

function switchPlayer() {

    if (
        game.switchCooldown >
        0
    ) {
        return;
    }


    const candidates =
        game.teammates.filter(
            player =>
                player.role !==
                "GK"
        );


    if (
        candidates.length ===
        0
    ) {
        return;
    }


    let closest =
        candidates[0];

    let closestDistance =
        Infinity;


    candidates.forEach(
        player => {

            const d =
                distance(
                    player,
                    game.ball
                );

            if (
                d <
                closestDistance
            ) {

                closest =
                    player;

                closestDistance =
                    d;

            }

        }
    );


    game.player.controlled =
        false;

    game.player.hasBall =
        game.ball.owner ===
        game.player;


    game.player =
        closest;

    game.player.controlled =
        true;


    if (
        game.ball.owner ===
        game.player
    ) {

        game.player.hasBall =
            true;

    }


    game.switchCooldown =
        .5;


    showActionMessage(
        "🔄 PLAYER SWITCH"
    );

}


/* =========================================================
   SKILL
   ========================================================= */

function performSkill() {

    if (
        !game.player ||
        game.paused
    ) {
        return;
    }


    const player =
        game.player;


    let fx =
        player.facingX;

    let fy =
        player.facingY;


    const len =
        Math.sqrt(
            fx * fx +
            fy * fy
        ) || 1;


    fx /= len;

    fy /= len;


    player.x +=
        fx *
        55;

    player.y +=
        fy *
        55;


    player.stamina =
        Math.max(
            0,
            player.stamina -
            4
        );


    keepPlayersInside();


    showActionMessage(
        "C — SKILL!"
    );

}


/* =========================================================
   SPRINT
   ========================================================= */

function performSprint() {

    if (
        !game.player
    ) {
        return;
    }


    if (
        game.player.stamina <
        8
    ) {

        showActionMessage(
            "LOW STAMINA"
        );

        return;

    }


    matchState.sprint =
        true;


    showActionMessage(
        "C — SPRINT!"
    );


    clearTimeout(
        sprintTimer
    );


    sprintTimer =
        setTimeout(
            () => {

                matchState.sprint =
                    false;

            },
            800
        );

}


/* =========================================================
   PASS
   ========================================================= */

function performPass() {

    if (!game.running) {
        return;
    }


    if (
        game.ball.owner !==
        game.player
    ) {

        showActionMessage(
            "NO BALL"
        );

        return;

    }


    const teammate =
        findBestTeammate();


    if (teammate) {

        const angle =
            Math.atan2(
                teammate.y -
                game.player.y,

                teammate.x -
                game.player.x
            );


        game.player.facingX =
            Math.cos(angle);

        game.player.facingY =
            Math.sin(angle);


        kickBall(
            460,
            angle
        );


        showActionMessage(
            "A — PASS"
        );

    } else {

        kickBall(
            460,
            getMovementAngle()
        );

        showActionMessage(
            "A — PASS"
        );

    }

}


/* =========================================================
   THROUGH PASS
   ========================================================= */

function performThroughPass() {

    if (
        game.ball.owner !==
        game.player
    ) {

        showActionMessage(
            "NO BALL"
        );

        return;

    }


    const teammate =
        findBestTeammate();


    let angle =
        getMovementAngle();


    if (teammate) {

        angle =
            Math.atan2(
                teammate.y -
                game.player.y,

                teammate.x -
                game.player.x
            );

    }


    kickBall(
        700,
        angle
    );


    showActionMessage(
        "A — THROUGH PASS!"
    );

}


/* =========================================================
   FIND TEAMMATE
   ========================================================= */

function findBestTeammate() {

    if (
        !game.player
    ) {
        return null;
    }


    let best = null;

    let bestScore =
        -Infinity;


    game.teammates.forEach(
        teammate => {

            const d =
                distance(
                    game.player,
                    teammate
                );


            if (
                d <
                80 ||
                d >
                500
            ) {
                return;
            }


            let score =
                600 -
                d;


            if (
                teammate.x >
                game.player.x
            ) {

                score +=
                    120;

            }


            if (
                score >
                bestScore
            ) {

                bestScore =
                    score;

                best =
                    teammate;

            }

        }
    );


    return best;

}


/* =========================================================
   SHOOT
   ========================================================= */

function performShoot() {

    if (
        game.ball.owner !==
        game.player
    ) {

        showActionMessage(
            "NO BALL"
        );

        return;

    }


    const p =
        game.pitch;


    const goalX =
        p.x +
        p.width;


    const goalY =
        p.y +
        p.height / 2;


    const angle =
        Math.atan2(
            goalY -
            game.player.y,

            goalX -
            game.player.x
        );


    game.player.facingX =
        Math.cos(angle);

    game.player.facingY =
        Math.sin(angle);


    kickBall(
        850,
        angle
    );


    showActionMessage(
        "🔥 B — SHOOT!"
    );

}


/* =========================================================
   POWER SHOT
   ========================================================= */

function performPowerShot() {

    if (
        game.ball.owner !==
        game.player
    ) {

        showActionMessage(
            "NO BALL"
        );

        return;

    }


    const p =
        game.pitch;


    const goalX =
        p.x +
        p.width;


    const goalY =
        p.y +
        p.height / 2;


    const angle =
        Math.atan2(
            goalY -
            game.player.y,

            goalX -
            game.player.x
        );


    kickBall(
        1200,
        angle
    );


    game.player.stamina =
        Math.max(
            0,
            game.player.stamina -
            8
        );


    showActionMessage(
        "💥 B — POWER SHOT!"
    );

}


/* =========================================================
   MOVEMENT ANGLE
   ========================================================= */

function getMovementAngle() {

    if (
        Math.abs(
            joystick.x
        ) > .1 ||
        Math.abs(
            joystick.y
        ) > .1
    ) {

        return Math.atan2(
            joystick.y,
            joystick.x
        );

    }


    if (
        game.player
    ) {

        return Math.atan2(
            game.player.facingY,
            game.player.facingX
        );

    }


    return 0;

}


/* =========================================================
   KEEP PLAYERS INSIDE
   ========================================================= */

function keepPlayersInside() {

    const p =
        game.pitch;


    const allPlayers = [

        game.player,

        ...game.teammates,

        ...game.opponents

    ].filter(Boolean);


    allPlayers.forEach(
        player => {

            player.x =
                clamp(
                    player.x,
                    p.x + 10,
                    p.x +
                    p.width -
                    10
                );


            player.y =
                clamp(
                    player.y,
                    p.y + 10,
                    p.y +
                    p.height -
                    10
                );

        }
    );

}


/* =========================================================
   POSSESSION
   ========================================================= */

function updatePossession() {

    const allPlayers = [

        game.player,

        ...game.teammates,

        ...game.opponents

    ].filter(Boolean);


    let home =
        0;

    let away =
        0;


    if (
        game.ball &&
        game.ball.owner
    ) {

        if (
            game.ball.owner.team ===
            "home"
        ) {

            home = 1;

        } else {

            away = 1;

        }

    }


    game.possessionHome =
        game.possessionHome *
        .98 +
        home *
        .02;


    game.possessionAway =
        game.possessionAway *
        .98 +
        away *
        .02;


    /* Keep values readable */

    if (
        allPlayers.length ===
        0
    ) {
        return;
    }

}


/* =========================================================
   HUD
   ========================================================= */

function updateHUD() {

    if (
        game.player
    ) {

        const speed =
            Math.round(
                Math.sqrt(
                    game.player.vx *
                    game.player.vx +
                    game.player.vy *
                    game.player.vy
                )
            );


        const speedElement =
            document.getElementById(
                "playerSpeedDisplay"
            );


        const staminaElement =
            document.getElementById(
                "staminaDisplay"
            );


        const possessionElement =
            document.getElementById(
                "possessionDisplay"
            );


        if (speedElement) {

            speedElement.textContent =
                speed;

        }


        if (staminaElement) {

            staminaElement.textContent =
                Math.round(
                    game.player.stamina
                );

        }


        if (possessionElement) {

            possessionElement.textContent =
                Math.round(
                    game.possessionHome *
                    100
                ) +
                "%";

        }

    }


    updateBallStatus();

}


/* =========================================================
   BALL STATUS
   ========================================================= */

function updateBallStatus() {

    const element =
        document.getElementById(
            "ballStatus"
        );

    if (!element) {
        return;
    }


    if (
        game.ball &&
        game.ball.owner
    ) {

        if (
            game.ball.owner ===
            game.player
        ) {

            element.textContent =
                "⚽ YOUR BALL";

        } else if (
            game.ball.owner.team ===
            "home"
        ) {

            element.textContent =
                "⚽ TEAM BALL";

        } else {

            element.textContent =
                "🔴 OPPONENT BALL";

        }

    } else {

        element.textContent =
            "⚽ FREE BALL";

    }

}


/* =========================================================
   SCOREBOARD
   ========================================================= */

function updateScoreboard() {

    const home =
        document.getElementById(
            "homeScore"
        );

    const away =
        document.getElementById(
            "awayScore"
        );

    const homeName =
        document.getElementById(
            "homeTeamName"
        );


    if (home) {

        home.textContent =
            game.homeScore;

    }


    if (away) {

        away.textContent =
            game.awayScore;

    }


    if (homeName) {

        homeName.textContent =
            game.selectedTeam;

    }

}


/* =========================================================
   MATCH CLOCK
   ========================================================= */

function updateMatchClock() {

    const element =
        document.getElementById(
            "matchTime"
        );

    if (!element) {
        return;
    }


    const seconds =
        Math.floor(
            game.elapsed
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds %
        60;


    element.textContent =

        String(minutes)
            .padStart(2, "0")

        +

        ":" +

        String(remaining)
            .padStart(2, "0");

}


/* =========================================================
   FULL TIME
   ========================================================= */

function finishMatch() {

    if (
        !game.running
    ) {
        return;
    }


    game.running =
        false;


    if (
        game.animationId
    ) {

        cancelAnimationFrame(
            game.animationId
        );

        game.animationId =
            null;

    }


    const finalHome =
        document.getElementById(
            "finalHomeScore"
        );


    const finalAway =
        document.getElementById(
            "finalAwayScore"
        );


    const result =
        document.getElementById(
            "matchResult"
        );


    if (finalHome) {

        finalHome.textContent =
            game.homeScore;

    }


    if (finalAway) {

        finalAway.textContent =
            game.awayScore;

    }


    if (result) {

        if (
            game.homeScore >
            game.awayScore
        ) {

            result.textContent =
                "🔥 KRISH WINS!";

        } else if (
            game.homeScore <
            game.awayScore
        ) {

            result.textContent =
                "🔴 DEFEAT";

        } else {

            result.textContent =
                "🤝 DRAW";

        }

    }


    const overlay =
        document.getElementById(
            "gameOverOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "hidden"
        );

    }


    showActionMessage(
        "FULL TIME"
    );

}


/* =========================================================
   MESSAGE
   ========================================================= */

let messageTimer =
    null;


function showActionMessage(
    message
) {

    const element =
        document.getElementById(
            "actionMessage"
        );


    if (!element) {
        return;
    }


    element.textContent =
        message;


    clearTimeout(
        messageTimer
    );


    messageTimer =
        setTimeout(
            () => {

                element.textContent =
                    "READY";

            },
            1200
        );

}


/* =========================================================
   PAUSE
   ========================================================= */

function togglePause() {

    if (!game.running) {
        return;
    }


    game.paused =
        !game.paused;


    const panel =
        document.getElementById(
            "pausePanel"
        );


    if (
        game.paused
    ) {

        panel.classList.remove(
            "hidden"
        );

    } else {

        panel.classList.add(
            "hidden"
        );

        game.lastTime =
            performance.now();

    }

}


/* =========================================================
   RESTART
   ========================================================= */

function restartMatch() {

    const overlay =
        document.getElementById(
            "gameOverOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "hidden"
        );

    }


    createMatch();


    game.running =
        true;

    game.paused =
        false;

    game.lastTime =
        performance.now();


    const pausePanel =
        document.getElementById(
            "pausePanel"
        );


    if (pausePanel) {

        pausePanel.classList.add(
            "hidden"
        );

    }


    showActionMessage(
        "🔄 MATCH RESTARTED"
    );


    startGameLoop();

}


/* =========================================================
   EXIT
   ========================================================= */

function exitMatch() {

    game.running =
        false;

    game.paused =
        false;


    if (
        game.animationId
    ) {

        cancelAnimationFrame(
            game.animationId
        );

        game.animationId =
            null;

    }


    const pausePanel =
        document.getElementById(
            "pausePanel"
        );


    if (pausePanel) {

        pausePanel.classList.add(
            "hidden"
        );

    }


    const gameOver =
        document.getElementById(
            "gameOverOverlay"
        );


    if (gameOver) {

        gameOver.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   JOYSTICK
   ========================================================= */

const joystick = {

    x: 0,

    y: 0,

    active: false,

    pointerId: null

};


function setupJoystick() {

    const base =
        document.getElementById(
            "joystickBase"
        );


    const knob =
        document.getElementById(
            "joystickKnob"
        );


    if (
        !base ||
        !knob
    ) {
        return;
    }


    base.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            joystick.active =
                true;


            joystick.pointerId =
                event.pointerId;


            try {

                base.setPointerCapture(
                    event.pointerId
                );

            } catch (error) {}


            updateJoystick(
                event,
                base,
                knob
            );

        }
    );


    base.addEventListener(
        "pointermove",
        event => {

            if (
                !joystick.active
            ) {
                return;
            }


            if (
                event.pointerId !==
                joystick.pointerId
            ) {
                return;
            }


            updateJoystick(
                event,
                base,
                knob
            );

        }
    );


    const end =
        event => {

            if (
                joystick.pointerId !==
                    null &&
                event.pointerId !==
                    joystick.pointerId
            ) {
                return;
            }


            joystick.active =
                false;


            joystick.pointerId =
                null;


            joystick.x = 0;

            joystick.y = 0;


            knob.style.transform =
                "translate(-50%, -50%)";

        };


    base.addEventListener(
        "pointerup",
        end
    );


    base.addEventListener(
        "pointercancel",
        end
    );

}


function updateJoystick(
    event,
    base,
    knob
) {

    const rect =
        base.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    let x =
        event.clientX -
        centerX;


    let y =
        event.clientY -
        centerY;


    const radius =
        rect.width / 2 -
        knob.offsetWidth / 2;


    const length =
        Math.sqrt(
            x * x +
            y * y
        );


    if (
        length >
        radius
    ) {

        x =
            x /
            length *
            radius;

        y =
            y /
            length *
            radius;

    }


    joystick.x =
        x / radius;


    joystick.y =
        y / radius;


    knob.style.transform =

        `translate(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px)
        )`;

}


/* =========================================================
   ACTION STATE
   ========================================================= */

const matchState = {

    sprint: false,

    actionA: false,

    actionB: false,

    actionC: false

};


let sprintTimer =
    null;


/* =========================================================
   ACTION BUTTONS
   ========================================================= */

function setupActionButton(
    id,
    action
) {

    const button =
        document.getElementById(
            id
        );


    if (!button) {
        return;
    }


    let timer =
        null;

    let longTriggered =
        false;


    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            longTriggered =
                false;


            setAction(
                action,
                true
            );


            timer =
                setTimeout(
                    () => {

                        longTriggered =
                            true;

                        longAction(
                            action
                        );

                    },
                    450
                );

        }
    );


    button.addEventListener(
        "pointerup",
        event => {

            event.preventDefault();


            if (timer) {

                clearTimeout(
                    timer
                );

                timer =
                    null;

            }


            setAction(
                action,
                false
            );


            if (
                !longTriggered
            ) {

                tapAction(
                    action
                );

            }

        }
    );


    button.addEventListener(
        "pointercancel",
        () => {

            if (timer) {

                clearTimeout(
                    timer
                );

                timer =
                    null;

            }


            setAction(
                action,
                false
            );

        }
    );

}


/* =========================================================
   SET ACTION
   ========================================================= */

function setAction(
    action,
    value
) {

    if (
        action ===
        "A"
    ) {

        matchState.actionA =
            value;

    }


    if (
        action ===
        "B"
    ) {

        matchState.actionB =
            value;

    }


    if (
        action ===
        "C"
    ) {

        matchState.actionC =
            value;

    }

}


/* =========================================================
   TAP
   ========================================================= */

function tapAction(
    action
) {

    if (
        !game.running ||
        game.paused
    ) {
        return;
    }


    if (
        action ===
        "A"
    ) {

        performPass();

    }


    if (
        action ===
        "B"
    ) {

        performShoot();

    }


    if (
        action ===
        "C"
    ) {

        performSkill();

    }

}


/* =========================================================
   LONG PRESS
   ========================================================= */

function longAction(
    action
) {

    if (
        !game.running ||
        game.paused
    ) {
        return;
    }


    if (
        action ===
        "A"
    ) {

        performThroughPass();

    }


    if (
        action ===
        "B"
    ) {

        performPowerShot();

    }


    if (
        action ===
        "C"
    ) {

        performSprint();

    }

}


/* =========================================================
   DOUBLE TAP / PLAYER SWITCH
   ========================================================= */

let lastSwitchTap =
    0;


function setupSwitchGesture() {

    const canvas =
        document.getElementById(
            "footballCanvas"
        );


    if (!canvas) {
        return;
    }


    canvas.addEventListener(
        "pointerdown",
        event => {

            if (
                !game.running ||
                game.paused
            ) {
                return;
            }


            const now =
                Date.now();


            if (
                now -
                lastSwitchTap <
                350
            ) {

                switchPlayer();

            }


            lastSwitchTap =
                now;

        }
    );

}


/* =========================================================
   UTILITIES
   ========================================================= */

function distance(
    a,
    b
) {

    if (!a || !b) {
        return Infinity;
    }


    return Math.sqrt(

        Math.pow(
            a.x -
            b.x,
            2
        )

        +

        Math.pow(
            a.y -
            b.y,
            2
        )

    );

}


function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            game.canvas
        ) {

            resizeCanvas();

        }

    }
);


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showScreen(
            "homeScreen"
        );


        loadManager();


        setupJoystick();


        setupActionButton(
            "buttonA",
            "A"
        );


        setupActionButton(
            "buttonB",
            "B"
        );


        setupActionButton(
            "buttonC",
            "C"
        );


        setupSwitchGesture();


        console.log(
            "🔥 KRISH SOCCER V0.4 BEAST ENGINE ONLINE"
        );

    }
);