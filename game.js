/* =========================================================
   KRISH SOCCER V0.3
   PLAYABLE 2D FOOTBALL ENGINE
   ========================================================= */


/* =========================================================
   TEAM DATABASE
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
   HOME
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


/* =========================================================
   LEAGUE
   ========================================================= */

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


/* =========================================================
   TEAM SELECTION
   ========================================================= */

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

        <p>
            Club:
            <strong>
                ${manager.team}
            </strong>
        </p>

        <p>
            Manager Rating:
            <strong>
                ${manager.rating}
            </strong>
        </p>

        <p>
            Trophies:
            <strong>
                ${manager.trophies}
            </strong>
        </p>

        <p>
            Matches:
            <strong>
                ${manager.matches}
            </strong>
        </p>

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
        "🌐 Online multiplayer will be connected in a later version.";

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
   MATCH ENGINE
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

    homeScore: 0,

    awayScore: 0,

    selectedTeam: "KRISH FC",

    pitch: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    player: null,

    teammates: [],

    opponents: [],

    ball: null

};


/* =========================================================
   PLAYER CREATION
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

        radius: 13,

        team: team,

        number: number,

        role: role,

        speed: 210,

        controlled: false

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

    showActionMessage(
        "MATCH START!"
    );

    game.running = true;

    game.paused = false;

    game.lastTime =
        performance.now();

    startGameLoop();

}


/* =========================================================
   CREATE MATCH
   ========================================================= */

function createMatch() {

    game.elapsed = 0;

    game.homeScore = 0;

    game.awayScore = 0;


    updateScoreboard();


    calculatePitch();


    const p =
        game.pitch;


    /* MAIN CONTROLLED PLAYER */

    game.player =
        createPlayer(
            p.x + p.width * .30,
            p.y + p.height * .50,
            "home",
            10,
            "ST"
        );


    game.player.controlled =
        true;


    /* HOME TEAMMATES */

    game.teammates = [

        createPlayer(
            p.x + p.width * .20,
            p.y + p.height * .25,
            "home",
            7,
            "LW"
        ),

        createPlayer(
            p.x + p.width * .20,
            p.y + p.height * .75,
            "home",
            11,
            "RW"
        ),

        createPlayer(
            p.x + p.width * .10,
            p.y + p.height * .50,
            "home",
            6,
            "CM"
        ),

        createPlayer(
            p.x + p.width * .08,
            p.y + p.height * .25,
            "home",
            3,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .08,
            p.y + p.height * .75,
            "home",
            4,
            "DF"
        )

    ];


    /* OPPONENTS */

    game.opponents = [

        createPlayer(
            p.x + p.width * .70,
            p.y + p.height * .25,
            "away",
            7,
            "LW"
        ),

        createPlayer(
            p.x + p.width * .70,
            p.y + p.height * .75,
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
            p.y + p.height * .25,
            "away",
            3,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .90,
            p.y + p.height * .75,
            "away",
            4,
            "DF"
        ),

        createPlayer(
            p.x + p.width * .95,
            p.y + p.height * .50,
            "away",
            1,
            "GK"
        )

    ];


    /* BALL */

    game.ball = {

        x:
            game.player.x + 22,

        y:
            game.player.y,

        vx: 0,

        vy: 0,

        radius: 7,

        owner: game.player,

        free: false

    };

}


/* =========================================================
   CANVAS
   ========================================================= */

function setupCanvas() {

    game.canvas =
        document.getElementById(
            "footballCanvas"
        );

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
        rect.width * ratio;

    game.canvas.height =
        rect.height * ratio;


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


    if (
        game.player &&
        game.ball
    ) {

        keepPlayersInside();

    }

}


function calculatePitch() {

    const marginX =
        Math.max(
            25,
            game.width * .04
        );

    const marginY =
        Math.max(
            25,
            game.height * .05
        );


    game.pitch = {

        x: marginX,

        y: marginY,

        width:
            game.width -
            marginX * 2,

        height:
            game.height -
            marginY * 2

    };

}


/* =========================================================
   GAME LOOP
   ========================================================= */

function startGameLoop() {

    if (
        game.animationId
    ) {

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
            (timestamp -
                game.lastTime) /
            1000
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

    keepPlayersInside();

    updateMatchClock();

}


/* =========================================================
   CONTROLLED PLAYER
   ========================================================= */

function updateControlledPlayer(delta) {

    if (!game.player) {
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


    const sprintMultiplier =
        matchState.sprint
            ? 1.65
            : 1;


    game.player.vx =
        inputX *
        game.player.speed *
        sprintMultiplier *
        magnitude;


    game.player.vy =
        inputY *
        game.player.speed *
        sprintMultiplier *
        magnitude;


    game.player.x +=
        game.player.vx *
        delta;


    game.player.y +=
        game.player.vy *
        delta;


    if (
        game.ball &&
        distance(
            game.player,
            game.ball
        ) < 35
    ) {

        game.ball.owner =
            game.player;

        game.ball.free =
            false;

    }

}


/* =========================================================
   TEAMMATES AI
   ========================================================= */

function updateTeammates(delta) {

    if (!game.ball) {
        return;
    }


    game.teammates.forEach(
        player => {

            const targetX =
                game.ball.x -
                70;

            const targetY =
                player.y;


            moveToward(
                player,
                targetX,
                targetY,
                player.speed * .35,
                delta
            );

        }
    );

}


/* =========================================================
   OPPONENT AI
   ========================================================= */

function updateOpponents(delta) {

    if (!game.ball) {
        return;
    }


    game.opponents.forEach(
        player => {

            let targetX =
                game.ball.x;

            let targetY =
                game.ball.y;


            if (
                player.role === "GK"
            ) {

                targetX =
                    game.pitch.x +
                    game.pitch.width -
                    45;

                targetY =
                    game.ball.y;

            }


            moveToward(
                player,
                targetX,
                targetY,
                player.speed * .25,
                delta
            );


            /* Simple opponent ball steal */

            if (
                distance(
                    player,
                    game.ball
                ) < 20
            ) {

                if (
                    Math.random() <
                    .008
                ) {

                    game.ball.owner =
                        player;

                    game.ball.free =
                        false;

                }

            }

        }
    );

}


/* =========================================================
   MOVE AI
   ========================================================= */

function moveToward(
    player,
    targetX,
    targetY,
    speed,
    delta
) {

    const dx =
        targetX -
        player.x;

    const dy =
        targetY -
        player.y;


    const length =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (length < 3) {
        return;
    }


    player.x +=
        (dx / length) *
        speed *
        delta;


    player.y +=
        (dy / length) *
        speed *
        delta;

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


    if (
        ball.owner
    ) {

        const owner =
            ball.owner;


        ball.x =
            owner.x + 18;

        ball.y =
            owner.y;

        ball.vx = 0;

        ball.vy = 0;

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
            .12,
            delta
        );

    ball.vy *=
        Math.pow(
            .12,
            delta
        );


    checkGoal();


}


/* =========================================================
   GOAL DETECTION
   ========================================================= */

function checkGoal() {

    const ball =
        game.ball;

    const p =
        game.pitch;


    if (
        ball.x <
        p.x - 20
    ) {

        game.awayScore++;

        updateScoreboard();

        resetAfterGoal(
            "⚽ OPPONENT SCORES!"
        );

        return;

    }


    if (
        ball.x >
        p.x +
        p.width +
        20
    ) {

        game.homeScore++;

        updateScoreboard();

        resetAfterGoal(
            "🔥 GOAL! KRISH SCORES!"
        );

    }

}


/* =========================================================
   RESET AFTER GOAL
   ========================================================= */

function resetAfterGoal(
    message
) {

    showActionMessage(
        message
    );


    setTimeout(
        () => {

            if (!game.running) {
                return;
            }


            const p =
                game.pitch;


            game.player.x =
                p.x +
                p.width * .30;

            game.player.y =
                p.y +
                p.height * .50;


            game.ball.owner =
                game.player;

            game.ball.free =
                false;


            game.ball.vx = 0;

            game.ball.vy = 0;

        },
        900
    );

}


/* =========================================================
   DRAW GAME
   ========================================================= */

function drawGame() {

    const ctx =
        game.ctx;


    if (!ctx) {
        return;
    }


    const p =
        game.pitch;


    ctx.clearRect(
        0,
        0,
        game.width,
        game.height
    );


    drawPitch(
        ctx,
        p
    );


    drawGoals(
        ctx,
        p
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

}


/* =========================================================
   PITCH
   ========================================================= */

function drawPitch(
    ctx,
    p
) {

    /* Grass */

    ctx.fillStyle =
        "#08752f";

    ctx.fillRect(
        0,
        0,
        game.width,
        game.height
    );


    /* Pitch */

    ctx.fillStyle =
        "#16883b";

    ctx.fillRect(
        p.x,
        p.y,
        p.width,
        p.height
    );


    /* Grass stripes */

    const stripeWidth =
        p.width / 10;


    for (
        let i = 0;
        i < 10;
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


    /* Outer line */

    ctx.strokeStyle =
        "rgba(255,255,255,.9)";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        p.x,
        p.y,
        p.width,
        p.height
    );


    /* Centre line */

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


    /* Centre circle */

    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width / 2,

        p.y +
        p.height / 2,

        Math.min(
            p.height * .16,
            p.width * .10
        ),

        0,
        Math.PI * 2
    );

    ctx.stroke();


    /* Centre spot */

    ctx.fillStyle =
        "white";

    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width / 2,

        p.y +
        p.height / 2,

        4,

        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Penalty areas */

    const boxWidth =
        p.width * .14;

    const boxHeight =
        p.height * .48;


    ctx.strokeRect(
        p.x,
        p.y +
        (p.height -
            boxHeight) / 2,

        boxWidth,
        boxHeight
    );


    ctx.strokeRect(
        p.x +
        p.width -
        boxWidth,

        p.y +
        (p.height -
            boxHeight) / 2,

        boxWidth,
        boxHeight
    );


    /* Six-yard boxes */

    const smallWidth =
        p.width * .055;

    const smallHeight =
        p.height * .25;


    ctx.strokeRect(
        p.x,
        p.y +
        (p.height -
            smallHeight) / 2,

        smallWidth,
        smallHeight
    );


    ctx.strokeRect(
        p.x +
        p.width -
        smallWidth,

        p.y +
        (p.height -
            smallHeight) / 2,

        smallWidth,
        smallHeight
    );


    /* Penalty spots */

    ctx.fillStyle =
        "white";


    ctx.beginPath();

    ctx.arc(
        p.x +
        boxWidth * .72,

        p.y +
        p.height / 2,

        3,

        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        p.x +
        p.width -
        boxWidth * .72,

        p.y +
        p.height / 2,

        3,

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
        p.height * .18;


    const goalY =
        p.y +
        (p.height -
            goalHeight) / 2;


    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 5;


    /* Left goal */

    ctx.strokeRect(
        p.x - 22,
        goalY,
        22,
        goalHeight
    );


    /* Right goal */

    ctx.strokeRect(
        p.x +
        p.width,

        goalY,

        22,

        goalHeight
    );

}


/* =========================================================
   DRAW PLAYER
   ========================================================= */

function drawPlayer(
    ctx,
    player
) {

    const home =
        player.team === "home";


    /* Shadow */

    ctx.fillStyle =
        "rgba(0,0,0,.25)";

    ctx.beginPath();

    ctx.ellipse(
        player.x,
        player.y + 13,
        13,
        5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Body */

    ctx.fillStyle =
        home
            ? "#168cff"
            : "#ef3340";


    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        player.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Controlled ring */

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
            player.radius + 6,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }


    /* Player number */

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
        player.x,
        player.y
    );

}


/* =========================================================
   BALL DRAW
   ========================================================= */

function drawBall(
    ctx,
    ball
) {

    if (!ball) {
        return;
    }


    ctx.fillStyle =
        "rgba(0,0,0,.3)";


    ctx.beginPath();

    ctx.ellipse(
        ball.x,
        ball.y + 6,
        7,
        3,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "white";


    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        ball.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.strokeStyle =
        "#222";

    ctx.lineWidth = 1;

    ctx.stroke();


    /* Black centre */

    ctx.fillStyle =
        "#111";

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =========================================================
   BALL KICK
   ========================================================= */

function kickBall(
    power,
    direction
) {

    const ball =
        game.ball;


    if (!ball) {
        return;
    }


    if (
        ball.owner !==
        game.player
    ) {

        return;

    }


    const angle =
        direction !== undefined
            ? direction
            : 0;


    ball.owner = null;

    ball.free = true;


    ball.vx =
        Math.cos(angle) *
        power;


    ball.vy =
        Math.sin(angle) *
        power;

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


    const angle =
        getMovementAngle();


    kickBall(
        470,
        angle
    );


    showActionMessage(
        "A — PASS"
    );

}


/* =========================================================
   THROUGH PASS
   ========================================================= */

function performThroughPass() {

    if (
        game.ball.owner !==
        game.player
    ) {
        return;
    }


    const angle =
        getMovementAngle();


    kickBall(
        650,
        angle
    );


    showActionMessage(
        "A — THROUGH PASS"
    );

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


    const angle =
        getMovementAngle();


    kickBall(
        850,
        angle
    );


    showActionMessage(
        "B — SHOOT!"
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
        return;
    }


    const angle =
        getMovementAngle();


    kickBall(
        1150,
        angle
    );


    showActionMessage(
        "B — POWER SHOT!"
    );

}


/* =========================================================
   SKILL
   ========================================================= */

function performSkill() {

    if (!game.player) {
        return;
    }


    const angle =
        getMovementAngle();


    game.player.x +=
        Math.cos(angle) *
        45;


    game.player.y +=
        Math.sin(angle) *
        45;


    keepPlayersInside();


    showActionMessage(
        "C — SKILL"
    );

}


/* =========================================================
   SPRINT
   ========================================================= */

function performSprint() {

    matchState.sprint =
        true;


    showActionMessage(
        "C — SPRINT"
    );


    setTimeout(
        () => {

            matchState.sprint =
                false;

        },
        700
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
                Math.max(
                    p.x + 8,
                    Math.min(
                        p.x +
                        p.width -
                        8,

                        player.x
                    )
                );


            player.y =
                Math.max(
                    p.y + 8,
                    Math.min(
                        p.y +
                        p.height -
                        8,

                        player.y
                    )
                );

        }
    );

}


/* =========================================================
   DISTANCE
   ========================================================= */

function distance(a, b) {

    return Math.sqrt(

        Math.pow(
            a.x - b.x,
            2
        )

        +

        Math.pow(
            a.y - b.y,
            2
        )

    );

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


    if (!base || !knob) {
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
   ACTION BUTTONS
   ========================================================= */

const matchState = {

    sprint: false,

    actionA: false,

    actionB: false,

    actionC: false

};


function setupActionButton(
    id,
    action
) {

    const button =
        document.getElementById(id);


    if (!button) {
        return;
    }


    let timer = null;


    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            setAction(
                action,
                true
            );


            timer =
                setTimeout(
                    () => {

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

                timer = null;

            }


            setAction(
                action,
                false
            );


            tapAction(
                action
            );

        }
    );


    button.addEventListener(
        "pointercancel",
        () => {

            if (timer) {

                clearTimeout(
                    timer
                );

                timer = null;

            }


            setAction(
                action,
                false
            );

        }
    );

}


function setAction(
    action,
    value
) {

    if (
        action === "A"
    ) {
        matchState.actionA =
            value;
    }


    if (
        action === "B"
    ) {
        matchState.actionB =
            value;
    }


    if (
        action === "C"
    ) {

        matchState.actionC =
            value;

    }

}


function tapAction(
    action
) {

    if (!game.running) {
        return;
    }


    if (
        game.paused
    ) {
        return;
    }


    if (
        action === "A"
    ) {

        performPass();

    }


    if (
        action === "B"
    ) {

        performShoot();

    }


    if (
        action === "C"
    ) {

        performSkill();

    }

}


function longAction(
    action
) {

    if (!game.running) {
        return;
    }


    if (
        game.paused
    ) {
        return;
    }


    if (
        action === "A"
    ) {

        performThroughPass();

    }


    if (
        action === "B"
    ) {

        performPowerShot();

    }


    if (
        action === "C"
    ) {

        performSprint();

    }

}


/* =========================================================
   SCOREBOARD
   ========================================================= */

function updateScoreboard() {

    document.getElementById(
        "homeScore"
    ).textContent =
        game.homeScore;


    document.getElementById(
        "awayScore"
    ).textContent =
        game.awayScore;


    document.getElementById(
        "homeTeamName"
    ).textContent =
        game.selectedTeam;


}


/* =========================================================
   MATCH CLOCK
   ========================================================= */

function updateMatchClock() {

    const seconds =
        Math.floor(
            game.elapsed
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    document.getElementById(
        "matchTime"
    ).textContent =

        String(minutes)
            .padStart(2, "0")

        +

        ":" +

        String(remaining)
            .padStart(2, "0");

}


/* =========================================================
   ACTION MESSAGE
   ========================================================= */

let messageTimer = null;


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
            1000
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

    const team =
        game.selectedTeam;


    createMatch();


    game.elapsed = 0;

    game.running = true;

    game.paused = false;


    document.getElementById(
        "pausePanel"
    ).classList.add(
        "hidden"
    );


    showActionMessage(
        "MATCH RESTARTED"
    );

}


/* =========================================================
   EXIT MATCH
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


    const panel =
        document.getElementById(
            "pausePanel"
        );


    if (panel) {

        panel.classList.add(
            "hidden"
        );

    }

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
   INITIALIZE
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


        console.log(
            "⚡ KRISH SOCCER V0.3 ENGINE ONLINE"
        );

    }
);