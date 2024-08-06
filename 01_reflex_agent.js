//MIT License

function reflexAgent(location, state) {
    if (state === "DIRTY") return "CLEAN";
    if (location === "A") return "RIGHT";
    return "LEFT";
}

function simulate(states) {
    // Randomly dirty a room with a 30% probability
    if (Math.random() < 0.3) {
        const dirtyLocation = Math.random() < 0.5 ? 1 : 2;  // 50% A, 50% B
        states[dirtyLocation] = "DIRTY";
        logMessage(`Room ${dirtyLocation === 1 ? "A" : "B"} got dirty!`);
        updateRoomState(dirtyLocation, "dirty");
    }

    const [location, stateA, stateB, visitedStates] = states;
    const currentState = location === "A" ? stateA : stateB;
    const action = reflexAgent(location, currentState);

    const stateDescription = `A: ${stateA} - B: ${stateB} - Location: ${location} - Action: ${action}`;
    if (!visitedStates.includes(stateDescription)) {
        visitedStates.push(stateDescription);
    }

    logMessage(`A: ${stateA} | B: ${stateB} | Location: ${location} | Action: ${action}`);

    if (action === "CLEAN") {
        if (location === "A") {
            states[1] = "CLEAN";
            updateRoomState(1, "clean");
        } else {
            states[2] = "CLEAN";
            updateRoomState(2, "clean");
        }
    } else if (action === "RIGHT") {
        states[0] = "B";
    } else if (action === "LEFT") {
        states[0] = "A";
    }

    if (visitedStates.length === 8) {
        logMessage("All states have been visited!");
        updateSummary(visitedStates);
        return;
    }

    setTimeout(() => simulate(states), 250);
}

function logMessage(message) {
    const log = document.getElementById("log");
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerHTML = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight; // Scroll to the bottom
}

function updateRoomState(room, state) {
    const log = document.getElementById("log");
    const entries = log.getElementsByClassName("log-entry");
    const lastEntry = entries[entries.length - 1];
    if (state === "dirty") {
        lastEntry.classList.add("dirty");
    } else if (state === "clean") {
        lastEntry.classList.add("clean");
    }
}

function updateSummary(states) {
    const summary = document.getElementById("summary");
    summary.innerHTML = "Visited states:";
    states.forEach(state => {
        const entry = document.createElement("div");
        entry.className = "summary-entry";
        entry.innerHTML = state;
        summary.appendChild(entry);
    });
}

const initialStates = ["A", "DIRTY", "DIRTY", []];
simulate(initialStates);
