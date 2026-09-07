/* =========================================================
   KRISH SOCCER V0.2
   BEAST FOOTBALL FOUNDATION
   TOUCH CONTROL ENGINE
   ========================================================= */


/* =========================================================
   SCREEN SYSTEM
   ========================================================= */

const screens = [
    "homeScreen",
    "teamScreen",
    "onlineScreen",
    "managerScreen"
];


function showScreen(screenId) {

    screens.forEach(id => {

        const screen =
            document.getElementById(id);

        if (screen) {
            screen.classList.add("hidden");
        }

    });


    const target =
        document.getElementById(screenId);

    if (target) {
        target.classList.remove("hidden");
    }
}


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
   HOME
   ========================================================= */

function goHome() {

    hideMatchControls();

    showScreen("homeScreen");
}


/* =========================================================
   OFFLINE
   ========================================================= */

function startOffline() {

    showScreen("teamScreen");

    const teamArea =
        document.getElementById("teamArea");

    teamArea.innerHTML = `

        <div style="
            margin-top:25px;
            padding:18px;
            border-radius:15px;
            background:rgba(255,255,255,0.06);
        ">

            <strong>
                OFFLINE MODE
            </strong>

            <p style="
                margin-top:8px;
                opacity:.7;
            ">
                Select your league first.
            </p>

        </div>

    `;
}


/* =========================================================
   LEAGUE
   ========================================================= */

function showLeague() {

    showScreen("teamScreen");

    const teamArea =
        document.getElementById("teamArea");

    teamArea.innerHTML = `

        <div style="
            margin-top:25px;
            padding:18px;
            border-radius:15px;
            background:rgba(0,255,136,.08);
        ">

            <strong>
                KRISH LEAGUE
            </strong>

            <p style="
                margin-top:8px;
                opacity:.7;
            ">
                Choose your competition above.
            </p>

        </div>

    `;
}


function selectLeague(league) {

    const teamArea =
        document.getElementById("teamArea");

    const leagueTeams =
        teams[league] || [];

    let html = `

        <h3 style="margin-top:20px;">
            ${league}
        </h3>

        <p style="
            opacity:.7;
            margin-top:6px;
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


    html += `</div>`;


    teamArea.innerHTML = html;
}


/* =========================================================
   TEAM SELECTION
   ========================================================= */

function selectTeam(team, league) {

    const teamArea =
        document.getElementById("teamArea");


    teamArea.innerHTML = `

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

            <p style="
                margin-top:15px;
            ">
                👔 You are now the manager.
            </p>

            <button
                style="margin-top:18px;"
                onclick="createManager('${team}')"
            >
                👔 CREATE MANAGER
            </button>

            <button
                style="
                    margin-top:10px;
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

function createManager(team) {

    const name =
        prompt("Enter your manager name:");


    if (!name) {
        return;
    }


    localStorage.setItem(
        "krishManager",

        JSON.stringify({

            name: name,

            team: team,

            rating: 1,

            trophies: 0,

            matches: 0

        })
    );


    alert(
        "🔥 Welcome " +
        name +
        "! You are now manager of " +
        team +
        "."
    );


    showScreen("managerScreen");

    loadManager();
}


/* =========================================================
   SHOW MANAGER
   ========================================================= */

function showManager() {

    hideMatchControls();

    showScreen("managerScreen");

    loadManager();
}


/* =========================================================
   LOAD MANAGER
   ========================================================= */

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

        console.error(
            "Manager data error:",
            error
        );

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

        "🌐 Online systems are coming in the next KRISH SOCCER build.";
}


function quickMatch() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML = `

        ⚔️ QUICK MATCH

        <br><br>

        🔎 Searching for opponent...

    `;
}


function krishLeague() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML = `

        🏆 KRISH LEAGUE

        <br><br>

        Season system loading...

    `;
}


function findOpponent() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML = `

        🔎 FIND OPPONENT

        <br><br>

        Searching for another manager...

    `;
}


/* =========================================================
   MATCH CONTROL STATE
   ========================================================= */

const matchState = {

    running: false,

    joystickX: 0,

    joystickY: 0,

    joystickActive: false,

    sprint: false,

    actionA: false,

    actionB: false,

    actionC: false

};


/* =========================================================
   SHOW MATCH CONTROLS
   ========================================================= */

function showMatchControls() {

    const controls =
        document.getElementById(
            "matchControls"
        );


    if (!controls) {
        return;
    }


    controls.classList.remove(
        "hidden"
    );
}


/* =========================================================
   HIDE MATCH CONTROLS
   ========================================================= */

function hideMatchControls() {

    const controls =
        document.getElementById(
            "matchControls"
        );


    if (!controls) {
        return;
    }


    controls.classList.add(
        "hidden"
    );


    matchState.running = false;

    resetJoystick();
}


/* =========================================================
   LAUNCH MATCH
   ========================================================= */

function launchMatch(team) {

    matchState.running = true;

    showMatchControls();


    console.log(
        "⚽ Match launched for:",
        team
    );


    alert(
        "⚽ KRISH SOCCER MATCH\n\n" +
        team +
        " is entering the pitch!"
    );
}


/* =========================================================
   JOYSTICK ENGINE
   ========================================================= */

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


    let pointerId = null;


    function moveJoystick(event) {

        if (
            pointerId !== null &&
            event.pointerId !== pointerId
        ) {
            return;
        }


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


        const maxDistance =
            rect.width / 2 -
            knob.offsetWidth / 2;


        const distance =
            Math.sqrt(
                x * x +
                y * y
            );


        if (
            distance >
            maxDistance
        ) {

            x =
                x /
                distance *
                maxDistance;

            y =
                y /
                distance *
                maxDistance;
        }


        matchState.joystickX =
            x / maxDistance;


        matchState.joystickY =
            y / maxDistance;


        knob.style.transform =
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;


        updatePlayerMovement();
    }


    function startJoystick(event) {

        event.preventDefault();

        pointerId =
            event.pointerId;

        matchState.joystickActive =
            true;


        try {

            base.setPointerCapture(
                pointerId
            );

        } catch (error) {}


        moveJoystick(event);
    }


    function endJoystick(event) {

        if (
            pointerId !== null &&
            event.pointerId !== pointerId
        ) {
            return;
        }


        pointerId = null;

        matchState.joystickActive =
            false;

        resetJoystick();
    }


    base.addEventListener(
        "pointerdown",
        startJoystick
    );


    base.addEventListener(
        "pointermove",
        moveJoystick
    );


    base.addEventListener(
        "pointerup",
        endJoystick
    );


    base.addEventListener(
        "pointercancel",
        endJoystick
    );

}


/* =========================================================
   RESET JOYSTICK
   ========================================================= */

function resetJoystick() {

    const knob =
        document.getElementById(
            "joystickKnob"
        );


    if (!knob) {
        return;
    }


    matchState.joystickX = 0;

    matchState.joystickY = 0;


    knob.style.transform =
        "translate(-50%, -50%)";


    updatePlayerMovement();
}


/* =========================================================
   PLAYER MOVEMENT
   ========================================================= */

function updatePlayerMovement() {

    const x =
        matchState.joystickX;


    const y =
        matchState.joystickY;


    if (
        Math.abs(x) < 0.05 &&
        Math.abs(y) < 0.05
    ) {
        return;
    }


    console.log(
        "PLAYER MOVE:",
        {
            x: x.toFixed(2),
            y: y.toFixed(2),
            sprint: matchState.sprint
        }
    );

}


/* =========================================================
   ACTION BUTTON SYSTEM
   ========================================================= */

function setupActionButton(
    id,
    actionName
) {

    const button =
        document.getElementById(id);


    if (!button) {
        return;
    }


    let pressTimer = null;


    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            button.setPointerCapture(
                event.pointerId
            );


            setAction(
                actionName,
                true
            );


            pressTimer =
                setTimeout(
                    () => {

                        longAction(
                            actionName
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


            if (pressTimer) {

                clearTimeout(
                    pressTimer
                );

                pressTimer = null;
            }


            setAction(
                actionName,
                false
            );


            actionReleased(
                actionName
            );

        }
    );


    button.addEventListener(
        "pointercancel",
        () => {

            if (pressTimer) {

                clearTimeout(
                    pressTimer
                );

                pressTimer = null;
            }


            setAction(
                actionName,
                false
            );

        }
    );

}


/* =========================================================
   ACTION STATE
   ========================================================= */

function setAction(
    actionName,
    state
) {

    if (
        actionName === "A"
    ) {

        matchState.actionA =
            state;
    }


    if (
        actionName === "B"
    ) {

        matchState.actionB =
            state;
    }


    if (
        actionName === "C"
    ) {

        matchState.actionC =
            state;

        matchState.sprint =
            state;
    }

}


/* =========================================================
   TAP ACTION
   ========================================================= */

function actionReleased(
    actionName
) {

    if (!matchState.running) {
        return;
    }


    if (
        actionName === "A"
    ) {

        performPass();

    }


    if (
        actionName === "B"
    ) {

        performShoot();

    }


    if (
        actionName === "C"
    ) {

        performSkill();

    }

}


/* =========================================================
   LONG PRESS ACTION
   ========================================================= */

function longAction(
    actionName
) {

    if (!matchState.running) {
        return;
    }


    if (
        actionName === "A"
    ) {

        performThroughPass();

    }


    if (
        actionName === "B"
    ) {

        performPowerShot();

    }


    if (
        actionName === "C"
    ) {

        performSprint();

    }

}


/* =========================================================
   A FUNCTIONS
   ========================================================= */

function performPass() {

    console.log(
        "A → PASS"
    );
}


function performThroughPass() {

    console.log(
        "A HOLD → THROUGH PASS"
    );
}


/* =========================================================
   B FUNCTIONS
   ========================================================= */

function performShoot() {

    console.log(
        "B → SHOOT"
    );
}


function performPowerShot() {

    console.log(
        "B HOLD → POWER SHOT"
    );
}


/* =========================================================
   C FUNCTIONS
   ========================================================= */

function performSkill() {

    console.log(
        "C → SKILL / DRIBBLE"
    );
}


function performSprint() {

    console.log(
        "C HOLD → SPRINT"
    );
}


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
            "⚡ KRISH SOCCER V0.2 ENGINE ONLINE"
        );

    }
);