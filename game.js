// ============================================================
// KRISH SOCCER V0.1
// BEAST FOOTBALL FOUNDATION
// ============================================================

const screens = [
    "homeScreen",
    "teamScreen",
    "onlineScreen",
    "managerScreen"
];

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


// ------------------------------------------------------------
// SCREEN SYSTEM
// ------------------------------------------------------------

function showScreen(screenId) {

    screens.forEach(id => {

        const screen = document.getElementById(id);

        if (screen) {
            screen.classList.add("hidden");
        }

    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.remove("hidden");
    }
}


// ------------------------------------------------------------
// HOME
// ------------------------------------------------------------

function goHome() {
    showScreen("homeScreen");
}


// ------------------------------------------------------------
// OFFLINE MODE
// ------------------------------------------------------------

function startOffline() {

    showScreen("teamScreen");

    const teamArea = document.getElementById("teamArea");

    teamArea.innerHTML = `
        <div style="
            margin-top:25px;
            padding:18px;
            border-radius:15px;
            background:rgba(255,255,255,0.06);
        ">
            <strong>OFFLINE MODE</strong>
            <p style="margin-top:8px;opacity:.7;">
                Select your league first.
            </p>
        </div>
    `;
}


// ------------------------------------------------------------
// LEAGUE SELECTION
// ------------------------------------------------------------

function showLeague() {

    showScreen("teamScreen");

    const teamArea = document.getElementById("teamArea");

    teamArea.innerHTML = `
        <div style="
            margin-top:25px;
            padding:18px;
            border-radius:15px;
            background:rgba(0,255,136,.08);
        ">
            <strong>KRISH LEAGUE</strong>
            <p style="margin-top:8px;opacity:.7;">
                Choose your competition above.
            </p>
        </div>
    `;
}


function selectLeague(league) {

    const teamArea = document.getElementById("teamArea");

    const leagueTeams = teams[league] || [];

    let html = `
        <h3 style="margin-top:20px;">
            ${league}
        </h3>

        <p style="opacity:.7;margin-top:6px;">
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


// ------------------------------------------------------------
// TEAM SELECTION
// ------------------------------------------------------------

function selectTeam(team, league) {

    const teamArea = document.getElementById("teamArea");

    teamArea.innerHTML = `
        <div style="
            margin-top:20px;
            padding:22px;
            border-radius:18px;
            background:rgba(255,255,255,.07);
            text-align:center;
        ">

            <div style="font-size:55px;">⚽</div>

            <h2>${team}</h2>

            <p style="opacity:.7;">
                ${league}
            </p>

            <p style="margin-top:15px;">
                👔 You are now the manager.
            </p>

            <button
                style="margin-top:18px;"
                onclick="createManager('${team}')"
            >
                👔 CREATE MANAGER
            </button>

        </div>
    `;
}


// ------------------------------------------------------------
// MANAGER CREATION
// ------------------------------------------------------------

function createManager(team) {

    const name = prompt(
        "Enter your manager name:"
    );

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


// ------------------------------------------------------------
// MANAGER PROFILE
// ------------------------------------------------------------

function loadManager() {

    const data = localStorage.getItem(
        "krishManager"
    );

    if (!data) {
        return;
    }

    const manager = JSON.parse(data);

    const card = document.querySelector(
        ".manager-card"
    );

    if (!card) {
        return;
    }

    card.innerHTML = `

        <div class="manager-photo">
            👔
        </div>

        <h3>${manager.name}</h3>

        <p>
            Club:
            <strong>${manager.team}</strong>
        </p>

        <p>
            Manager Rating:
            <strong>${manager.rating}</strong>
        </p>

        <p>
            Trophies:
            <strong>${manager.trophies}</strong>
        </p>

        <p>
            Matches:
            <strong>${manager.matches}</strong>
        </p>

    `;
}


// ------------------------------------------------------------
// ONLINE MODE
// ------------------------------------------------------------

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
        ⚔️ QUICK MATCH<br><br>
        🔎 Searching for opponent...
    `;

}


function krishLeague() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML = `
        🏆 KRISH LEAGUE<br><br>
        Season system loading...
    `;

}


function findOpponent() {

    document.getElementById(
        "onlineMessage"
    ).innerHTML = `
        🔎 FIND OPPONENT<br><br>
        Searching for another manager...
    `;

}


// ------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showScreen("homeScreen");

        loadManager();

        console.log(
            "⚡ KRISH SOCCER V0.1 ENGINE ONLINE"
        );

    }
);