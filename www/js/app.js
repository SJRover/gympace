// GymPace Core JavaScript Application Engine

const state = {
  activeWorkout: null,
  history: [],
  exercises: [],
  routines: [],
  personalRecords: {},
  profile: {
    weight: "",
    height: "",
    gender: "male",
    goal: "build_muscle"
  },
  nutritionLog: {},
  activityLog: {},
  settings: {
    unit: "lbs",
    barWeight: 45
  },
  restTimer: {
    duration: 0,
    remaining: 0,
    intervalId: null
  }
};

// ==================== DOM ELEMENTS ====================
// Tab elements
const tabPanes = document.querySelectorAll(".tab-pane");
const navItems = document.querySelectorAll(".nav-item");

// Workouts DOM
const routinesList = document.getElementById("routines-list");
const startEmptyBtn = document.getElementById("start-empty-workout-btn");
const createRoutineTriggerBtn = document.getElementById("create-routine-trigger-btn");

// Library DOM
const exercisesList = document.getElementById("exercises-list");
const exerciseSearch = document.getElementById("exercise-search");
const muscleChips = document.querySelectorAll("#muscle-chips .chip");
const addCustomExerciseBtn = document.getElementById("add-custom-exercise-btn");

// History DOM
const historyList = document.getElementById("history-list");
const historyEmptyState = document.getElementById("history-empty-state");

// Stats DOM
const statsEmptyState = document.getElementById("stats-empty-state");
const statsChartsContainer = document.getElementById("stats-charts-container");
const oneRepMaxSelect = document.getElementById("1rm-exercise-select");
const prChecklistContainer = document.getElementById("pr-checklist-container");
const statsDateRangeSelect = document.getElementById("stats-date-range");

// Profile DOM
const profileWeightInput = document.getElementById("profile-weight");
const profileHeightInput = document.getElementById("profile-height");
const profileGenderSelect = document.getElementById("profile-gender");
const profileGoalSelect = document.getElementById("profile-goal");
const profileUnitSelect = document.getElementById("profile-unit");
const saveProfileBtn = document.getElementById("save-profile-btn");

// Activity DOM
const actStepsInput = document.getElementById("act-steps");
const actOtherCalInput = document.getElementById("act-other-cal");
const saveActivityBtn = document.getElementById("save-activity-btn");

// Nutrition DOM
const nutriCaloriesInput = document.getElementById("nutri-calories");
const nutriProteinInput = document.getElementById("nutri-protein");
const nutriCarbsInput = document.getElementById("nutri-carbs");
const nutriFatsInput = document.getElementById("nutri-fats");
const saveNutritionBtn = document.getElementById("save-nutrition-btn");

const progressCalLabel = document.getElementById("progress-cal-label");
const progressCalBar = document.getElementById("progress-cal-bar");
const progressProteinLabel = document.getElementById("progress-protein-label");
const progressProteinBar = document.getElementById("progress-protein-bar");
const progressCarbsLabel = document.getElementById("progress-carbs-label");
const progressCarbsBar = document.getElementById("progress-carbs-bar");
const progressFatsLabel = document.getElementById("progress-fats-label");
const progressFatsBar = document.getElementById("progress-fats-bar");

// Active Workout Sheet DOM
const activeWorkoutSheet = document.getElementById("active-workout-sheet");
const activeWorkoutTitle = document.getElementById("active-workout-title");
const activeWorkoutTimer = document.getElementById("active-workout-timer");
const activeWorkoutExercisesList = document.getElementById("active-workout-exercises-list");
const finishWorkoutBtn = document.getElementById("finish-workout-btn");
const discardWorkoutBtn = document.getElementById("discard-workout-btn");
const sheetAddExerciseBtn = document.getElementById("sheet-add-exercise-btn");

// Rest Timer Widget DOM
const headerRestTimer = document.getElementById("header-rest-timer");
const timerCountdown = document.getElementById("timer-countdown");
const timerProgress = document.getElementById("timer-progress");
const timerSkipBtn = document.getElementById("timer-skip-btn");

// Modals
const plateModal = document.getElementById("plate-modal");
const closePlateModal = document.getElementById("close-plate-modal");
const plateTargetWeight = document.getElementById("plate-target-weight");
const barbellWeightSelect = document.getElementById("barbell-weight-select");
const platesVisualStack = document.getElementById("plates-visual-stack");
const platesBreakdownList = document.getElementById("plates-breakdown-list");
const applyPlateWeightBtn = document.getElementById("apply-plate-weight-btn");

const customExerciseModal = document.getElementById("custom-exercise-modal");
const closeCustomExerciseModal = document.getElementById("close-custom-exercise-modal");
const saveCustomExerciseBtn = document.getElementById("save-custom-exercise-btn");
const cancelCustomExerciseBtn = document.getElementById("cancel-custom-exercise-btn");

const customRoutineModal = document.getElementById("custom-routine-modal");
const closeCustomRoutineModal = document.getElementById("close-custom-routine-modal");
const saveCustomRoutineBtn = document.getElementById("save-custom-routine-btn");
const cancelCustomRoutineBtn = document.getElementById("cancel-custom-routine-btn");
const routineBuilderExercisesPool = document.getElementById("routine-builder-exercises-pool");

const exerciseSelectorDrawer = document.getElementById("exercise-selector-drawer");
const closeSelectorDrawer = document.getElementById("close-selector-drawer");
const drawerExerciseSearch = document.getElementById("drawer-exercise-search");
const drawerExercisesList = document.getElementById("drawer-exercises-list");

const posterModal = document.getElementById("poster-modal");
const closePosterModal = document.getElementById("close-poster-modal");
const downloadPosterBtn = document.getElementById("download-poster-btn");
const copyPosterBtn = document.getElementById("copy-poster-btn");

const exerciseDetailModal = document.getElementById("exercise-detail-modal");
const closeExerciseDetailModal = document.getElementById("close-exercise-detail-modal");
const closeExerciseDetailBtn = document.getElementById("close-exercise-detail-btn");

// Audio Context for timer chime
let audioCtx = null;

// Chart references
let oneRepMaxChart = null;
let volumeChart = null;
let muscleDonutChart = null;


// ==================== APP INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromLocalStorage();
  setupTabNavigation();
  setupEventListeners();
  renderRoutines();
  renderExercises();
  renderHistory();
  updateStatsDashboard();
  checkActiveWorkoutOnResume();
  initializeProfileInputs();
  updateUnitLabels();
  populateBarbellWeightOptions();
  updateNutritionProgress();
});

// Load state from localStorage
function loadStateFromLocalStorage() {
  const localHistory = localStorage.getItem("gympace_history");
  const localExercises = localStorage.getItem("gympace_custom_exercises");
  const localRoutines = localStorage.getItem("gympace_custom_routines");
  const localSettings = localStorage.getItem("gympace_settings");
  const localPRs = localStorage.getItem("gympace_personal_records");
  const localProfile = localStorage.getItem("gympace_profile");
  const localNutrition = localStorage.getItem("gympace_nutrition_log");
  const localActivity = localStorage.getItem("gympace_activity_log");

  state.history = localHistory ? JSON.parse(localHistory) : [];
  state.settings = localSettings ? JSON.parse(localSettings) : { unit: "lbs", barWeight: 45 };
  state.personalRecords = localPRs ? JSON.parse(localPRs) : {};
  state.profile = localProfile ? JSON.parse(localProfile) : { weight: "", height: "", gender: "male", goal: "build_muscle" };
  state.nutritionLog = localNutrition ? JSON.parse(localNutrition) : {};
  state.activityLog = localActivity ? JSON.parse(localActivity) : {};

  // Setup exercises (Merge presets with custom)
  const customExercises = localExercises ? JSON.parse(localExercises) : [];
  state.exercises = [...window.PRESET_EXERCISES, ...customExercises];

  // Setup routines (Merge presets with custom)
  const customRoutines = localRoutines ? JSON.parse(localRoutines) : [];
  state.routines = [...window.PRESET_ROUTINES, ...customRoutines];
}

// Check if a workout was left active
function checkActiveWorkoutOnResume() {
  const savedActiveWorkout = localStorage.getItem("gympace_active_workout");
  if (savedActiveWorkout) {
    state.activeWorkout = JSON.parse(savedActiveWorkout);
    const elapsedSeconds = Math.floor((Date.now() - state.activeWorkout.startTime) / 1000);
    state.activeWorkout.duration = elapsedSeconds;
    
    // Open sheet
    activeWorkoutSheet.classList.add("open");
    activeWorkoutTitle.textContent = state.activeWorkout.name;
    renderActiveWorkoutExercises();
    
    state.activeWorkout.timerInterval = setInterval(() => {
      state.activeWorkout.duration++;
      activeWorkoutTimer.textContent = formatDuration(state.activeWorkout.duration);
    }, 1000);
  }
}

// Save active state to localStorage
function saveActiveWorkoutToLocal() {
  if (state.activeWorkout) {
    const rawWorkout = { ...state.activeWorkout };
    delete rawWorkout.timerInterval;
    localStorage.setItem("gympace_active_workout", JSON.stringify(rawWorkout));
  } else {
    localStorage.removeItem("gympace_active_workout");
  }
}


// ==================== NAVIGATION & TABS ====================
function setupTabNavigation() {
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      
      navItems.forEach(n => n.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));
      
      item.classList.add("active");
      document.getElementById(targetTab).classList.add("active");

      // Refresh logic
      if (targetTab === "tab-history") {
        renderHistory();
      } else if (targetTab === "tab-exercises") {
        renderExercises();
      } else if (targetTab === "tab-stats") {
        updateStatsDashboard();
      } else if (targetTab === "tab-profile") {
        updateNutritionProgress();
      }
    });
  });
}


// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Start workouts
  startEmptyBtn.addEventListener("click", () => startWorkout("Empty Workout"));
  createRoutineTriggerBtn.addEventListener("click", openCreateRoutineModal);
  
  // Sheet actions
  finishWorkoutBtn.addEventListener("click", finishWorkout);
  discardWorkoutBtn.addEventListener("click", discardWorkout);
  sheetAddExerciseBtn.addEventListener("click", openExerciseSelectorDrawer);

  // Library searches & chips
  exerciseSearch.addEventListener("input", renderExercises);
  muscleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      muscleChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderExercises();
    });
  });

  // Custom Exercise
  addCustomExerciseBtn.addEventListener("click", () => customExerciseModal.classList.add("open"));
  closeCustomExerciseModal.addEventListener("click", () => customExerciseModal.classList.remove("open"));
  cancelCustomExerciseBtn.addEventListener("click", () => customExerciseModal.classList.remove("open"));
  saveCustomExerciseBtn.addEventListener("click", saveCustomExercise);

  // Custom Routine
  closeCustomRoutineModal.addEventListener("click", () => customRoutineModal.classList.remove("open"));
  cancelCustomRoutineBtn.addEventListener("click", () => customRoutineModal.classList.remove("open"));
  saveCustomRoutineBtn.addEventListener("click", saveCustomRoutine);

  // Exercise selector drawer
  closeSelectorDrawer.addEventListener("click", () => exerciseSelectorDrawer.classList.remove("open"));
  drawerExerciseSearch.addEventListener("input", renderDrawerExercises);

  // Plate Calculator
  closePlateModal.addEventListener("click", () => plateModal.classList.remove("open"));
  applyPlateWeightBtn.addEventListener("click", () => plateModal.classList.remove("open"));
  barbellWeightSelect.addEventListener("change", reCalculatePlates);

  // Rest Timer skip
  timerSkipBtn.addEventListener("click", skipRestTimer);

  // Poster Close
  closePosterModal.addEventListener("click", () => posterModal.classList.remove("open"));

  // Detail Modal Close
  closeExerciseDetailModal.addEventListener("click", () => exerciseDetailModal.classList.remove("open"));
  closeExerciseDetailBtn.addEventListener("click", () => exerciseDetailModal.classList.remove("open"));

  // 1RM select change
  oneRepMaxSelect.addEventListener("change", updateOneRepMaxChart);

  // Stats date range filter change
  statsDateRangeSelect.addEventListener("change", updateStatsDashboard);

  // Profile Save
  saveProfileBtn.addEventListener("click", saveProfileDetails);

  // Activity Save
  saveActivityBtn.addEventListener("click", logDailyActivity);
  
  // Nutrition Log Save
  saveNutritionBtn.addEventListener("click", logNutritionIntake);

  // Profile unit system toggle
  profileUnitSelect.addEventListener("change", (e) => {
    const newUnit = e.target.value;
    const oldUnit = state.settings.unit;
    if (newUnit === oldUnit) return;

    const currentWeight = parseFloat(profileWeightInput.value) || 0;
    const currentHeight = parseFloat(profileHeightInput.value) || 0;

    if (newUnit === "kg") {
      if (currentWeight) profileWeightInput.value = Math.round(currentWeight / 2.20462);
      if (currentHeight) profileHeightInput.value = Math.round(currentHeight * 2.54);
    } else {
      if (currentWeight) profileWeightInput.value = Math.round(currentWeight * 2.20462);
      if (currentHeight) profileHeightInput.value = Math.round(currentHeight / 2.54);
    }

    state.settings.unit = newUnit;
    localStorage.setItem("gympace_settings", JSON.stringify(state.settings));

    updateUnitLabels();
    populateBarbellWeightOptions();
    updateNutritionProgress();
    updateStatsDashboard();
  });
}


// ==================== ROUTINES & WORKOUT CONTROLLER ====================
function renderRoutines() {
  routinesList.innerHTML = "";
  
  state.routines.forEach(routine => {
    const card = document.createElement("div");
    card.className = "card routine-card";
    
    const exCount = routine.exercises.length;
    const exNames = routine.exercises.map(e => {
      const details = state.exercises.find(ex => ex.id === e.exerciseId);
      return details ? details.name : "Exercise";
    }).join(", ");

    card.innerHTML = `
      <div class="card-head">
        <h3>${routine.name}</h3>
      </div>
      <p>${routine.description || "Custom training routine."}</p>
      <p style="font-size: 11px; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${exNames}</p>
      <div class="routine-meta">
        <span>⏱️ Avg. Rest: 90s</span>
        <span>🔥 ${exCount} Exercises</span>
      </div>
      <div class="routine-actions">
        <button class="btn btn-sm btn-primary-glow start-btn" style="height: 32px; padding: 0 12px; margin-top: 8px;">Start</button>
        ${!window.PRESET_ROUTINES.some(r => r.id === routine.id) ? `<button class="btn-delete-routine" title="Delete Routine">🗑️</button>` : ""}
      </div>
    `;

    card.querySelector(".start-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      startWorkout(routine.name, routine.id);
    });

    const deleteBtn = card.querySelector(".btn-delete-routine");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteRoutine(routine.id);
      });
    }

    routinesList.appendChild(card);
  });
}

function deleteRoutine(id) {
  state.routines = state.routines.filter(r => r.id !== id);
  const customRoutines = state.routines.filter(r => !window.PRESET_ROUTINES.some(pr => pr.id === r.id));
  localStorage.setItem("gympace_custom_routines", JSON.stringify(customRoutines));
  renderRoutines();
}

function startWorkout(name, routineId = null) {
  if (state.activeWorkout) {
    if (!confirm("A workout session is already active. Cancel it and start a new one?")) return;
    clearInterval(state.activeWorkout.timerInterval);
  }

  state.activeWorkout = {
    name: name,
    routineId: routineId,
    startTime: Date.now(),
    duration: 0,
    exercises: []
  };

  if (routineId) {
    const routine = state.routines.find(r => r.id === routineId);
    if (routine) {
      routine.exercises.forEach(rEx => {
        const details = state.exercises.find(ex => ex.id === rEx.exerciseId);
        if (details) {
          const lastPerform = getLastExercisePerformance(rEx.exerciseId);
          const sets = rEx.sets.map((s, idx) => {
            const lastSet = lastPerform && lastPerform.sets[idx] ? lastPerform.sets[idx] : null;
            return {
              weight: lastSet ? lastSet.weight : s.weight,
              reps: lastSet ? lastSet.reps : s.reps,
              completed: false,
              prevStats: lastSet ? `${lastSet.weight} × ${lastSet.reps}` : "-"
            };
          });

          const advice = getProgressiveOverloadAdvice(rEx.exerciseId, sets);

          state.activeWorkout.exercises.push({
            exerciseId: rEx.exerciseId,
            name: details.name,
            category: details.category,
            equipment: details.equipment,
            sets: sets,
            rest: rEx.rest || 90,
            advisor: advice
          });
        }
      });
    }
  }

  activeWorkoutSheet.classList.add("open");
  activeWorkoutTitle.textContent = name;
  activeWorkoutTimer.textContent = "00:00";
  renderActiveWorkoutExercises();
  saveActiveWorkoutToLocal();

  state.activeWorkout.timerInterval = setInterval(() => {
    state.activeWorkout.duration++;
    activeWorkoutTimer.textContent = formatDuration(state.activeWorkout.duration);
  }, 1000);
}

function discardWorkout() {
  if (!confirm("Discard this workout session? Your progress will be lost.")) return;
  
  clearInterval(state.activeWorkout.timerInterval);
  state.activeWorkout = null;
  saveActiveWorkoutToLocal();
  activeWorkoutSheet.classList.remove("open");
  skipRestTimer();
}

function finishWorkout() {
  if (state.activeWorkout.exercises.length === 0) {
    alert("Please add at least one exercise to complete your workout.");
    return;
  }

  let hasCompletedSet = false;
  state.activeWorkout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      if (set.completed) hasCompletedSet = true;
    });
  });

  if (!hasCompletedSet) {
    alert("Please log at least one completed set before finishing.");
    return;
  }

  clearInterval(state.activeWorkout.timerInterval);
  
  const completedWorkout = {
    id: "log_" + Date.now(),
    name: state.activeWorkout.name,
    timestamp: Date.now(),
    duration: state.activeWorkout.duration,
    exercises: state.activeWorkout.exercises.map(ex => {
      const prMax = getPersonalRecord(ex.exerciseId);
      let prHit = false;
      
      const sessionMax = ex.sets.reduce((max, s) => {
        if (s.completed && s.weight > max) return s.weight;
        return max;
      }, 0);

      if (sessionMax > 0 && (!prMax || sessionMax > prMax)) {
        prHit = true;
        state.personalRecords[ex.exerciseId] = sessionMax;
      }

      return {
        exerciseId: ex.exerciseId,
        name: ex.name,
        category: ex.category,
        prHit: prHit,
        sets: ex.sets.map(s => ({
          weight: parseFloat(s.weight) || 0,
          reps: parseInt(s.reps) || 0,
          completed: s.completed
        }))
      };
    })
  };

  state.history.unshift(completedWorkout);
  localStorage.setItem("gympace_history", JSON.stringify(state.history));
  localStorage.setItem("gympace_personal_records", JSON.stringify(state.personalRecords));
  
  state.activeWorkout = null;
  saveActiveWorkoutToLocal();
  activeWorkoutSheet.classList.remove("open");
  skipRestTimer();

  openSharePoster(completedWorkout);
  
  renderHistory();
  updateStatsDashboard();
  updateNutritionProgress();
}

function renderActiveWorkoutExercises() {
  activeWorkoutExercisesList.innerHTML = "";
  
  if (state.activeWorkout.exercises.length === 0) {
    activeWorkoutExercisesList.innerHTML = `
      <div class="empty-state" style="padding: 20px 0;">
        <div class="empty-state-icon" style="font-size: 32px;">📝</div>
        <h3>No exercises added</h3>
        <p>Tap below to add exercises to this workout.</p>
      </div>
    `;
    return;
  }

  state.activeWorkout.exercises.forEach((ex, exIdx) => {
    const card = document.createElement("div");
    card.className = "active-exercise-card";

    const advisorHtml = ex.advisor ? `<span class="badge-advisor">${ex.advisor}</span>` : "";

    card.innerHTML = `
      <div class="exercise-info">
        <div>
          <h4 class="ex-detail-trigger" style="cursor: pointer; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.2);">${ex.name} ℹ️</h4>
          <div class="badge-group" style="margin-top: 4px;">
            <span class="badge-category">${ex.category}</span>
            ${advisorHtml}
          </div>
        </div>
        <button class="btn-text danger remove-ex-btn">Remove</button>
      </div>
      
      <div class="set-logger-table">
        <div class="set-table-header">
          <span>Set</span>
          <span>Previous</span>
          <span class="unit-th">${state.settings.unit}</span>
          <span>Reps</span>
          <span>✓</span>
        </div>
        <div class="set-rows-container">
          <!-- Set rows rendered dynamically -->
        </div>
        
        <div class="set-row-actions">
          <button class="btn-text add-set-btn">+ Add Set</button>
          <button class="btn-text danger delete-set-btn">- Delete Set</button>
        </div>
      </div>
    `;

    card.querySelector(".ex-detail-trigger").addEventListener("click", () => {
      showExerciseDetails(ex.exerciseId);
    });

    card.querySelector(".remove-ex-btn").addEventListener("click", () => {
      state.activeWorkout.exercises.splice(exIdx, 1);
      renderActiveWorkoutExercises();
      saveActiveWorkoutToLocal();
    });

    card.querySelector(".add-set-btn").addEventListener("click", () => {
      const sets = ex.sets;
      const defWeight = state.settings.unit === "kg" ? 60 : 135;
      const lastSet = sets.length > 0 ? sets[sets.length - 1] : { weight: defaultWeight, reps: 8 };
      sets.push({
        weight: lastSet.weight,
        reps: lastSet.reps,
        completed: false,
        prevStats: lastSet.prevStats || "-"
      });
      renderActiveWorkoutExercises();
      saveActiveWorkoutToLocal();
    });

    card.querySelector(".delete-set-btn").addEventListener("click", () => {
      if (ex.sets.length > 1) {
        ex.sets.pop();
        renderActiveWorkoutExercises();
        saveActiveWorkoutToLocal();
      }
    });

    const container = card.querySelector(".set-rows-container");
    ex.sets.forEach((set, setIdx) => {
      const row = document.createElement("div");
      row.className = `set-row ${set.completed ? "completed" : ""}`;
      
      const barbellCalcButton = (ex.equipment === "barbell") 
        ? `<button type="button" class="barbell-calc-trigger" title="Barbell Plate Calculator">⚖️</button>` 
        : "";

      row.innerHTML = `
        <span class="set-num-label">${setIdx + 1}</span>
        <span class="set-prev-label">${set.prevStats || "-"}</span>
        
        <div class="input-spinner-group ${ex.equipment === "barbell" ? "has-calc" : ""}">
          ${barbellCalcButton}
          <button type="button" class="spinner-btn weight-minus">-</button>
          <input type="number" class="spinner-input weight-val-input" value="${set.weight}" step="${state.settings.unit === 'kg' ? 2.5 : 5}" min="0">
          <button type="button" class="spinner-btn weight-plus">+</button>
        </div>

        <div class="input-spinner-group">
          <button type="button" class="spinner-btn reps-minus">-</button>
          <input type="number" class="spinner-input reps-val-input" value="${set.reps}" step="1" min="0">
          <button type="button" class="spinner-btn reps-plus">+</button>
        </div>

        <button class="btn-log-checkmark ${set.completed ? "completed" : ""}">✓</button>
      `;

      const weightInput = row.querySelector(".weight-val-input");
      const repsInput = row.querySelector(".reps-val-input");

      weightInput.addEventListener("change", () => {
        set.weight = parseFloat(weightInput.value) || 0;
        saveActiveWorkoutToLocal();
      });
      repsInput.addEventListener("change", () => {
        set.reps = parseInt(repsInput.value) || 0;
        saveActiveWorkoutToLocal();
      });

      // Weight Spinners
      row.querySelector(".weight-minus").addEventListener("click", () => {
        let val = parseFloat(weightInput.value) || 0;
        const step = state.settings.unit === 'kg' ? 2.5 : 5;
        val = Math.max(0, val - step);
        weightInput.value = val;
        set.weight = val;
        saveActiveWorkoutToLocal();
      });
      row.querySelector(".weight-plus").addEventListener("click", () => {
        let val = parseFloat(weightInput.value) || 0;
        const step = state.settings.unit === 'kg' ? 2.5 : 5;
        val = val + step;
        weightInput.value = val;
        set.weight = val;
        saveActiveWorkoutToLocal();
      });

      // Reps Spinners
      row.querySelector(".reps-minus").addEventListener("click", () => {
        let val = parseInt(repsInput.value) || 0;
        val = Math.max(0, val - 1);
        repsInput.value = val;
        set.reps = val;
        saveActiveWorkoutToLocal();
      });
      row.querySelector(".reps-plus").addEventListener("click", () => {
        let val = parseInt(repsInput.value) || 0;
        val = val + 1;
        repsInput.value = val;
        set.reps = val;
        saveActiveWorkoutToLocal();
      });

      const calcTrigger = row.querySelector(".barbell-calc-trigger");
      if (calcTrigger) {
        calcTrigger.addEventListener("click", () => {
          openPlateCalculator(parseFloat(weightInput.value) || 0);
        });
      }

      const checkBtn = row.querySelector(".btn-log-checkmark");
      checkBtn.addEventListener("click", () => {
        const wasCompleted = set.completed;
        set.completed = !set.completed;
        
        if (set.completed) {
          row.classList.add("completed");
          checkBtn.classList.add("completed");
          if (!wasCompleted) {
            triggerRestTimer(ex.rest || 90);
          }
        } else {
          row.classList.remove("completed");
          checkBtn.classList.remove("completed");
        }
        
        saveActiveWorkoutToLocal();
      });

      container.appendChild(row);
    });

    activeWorkoutExercisesList.appendChild(card);
  });
}

function getLastExercisePerformance(exerciseId) {
  for (let i = 0; i < state.history.length; i++) {
    const pastWorkout = state.history[i];
    const ex = pastWorkout.exercises.find(e => e.exerciseId === exerciseId);
    if (ex) {
      return ex;
    }
  }
  return null;
}

function getPersonalRecord(exerciseId) {
  if (state.personalRecords[exerciseId]) {
    return state.personalRecords[exerciseId];
  }
  
  let maxWeight = 0;
  state.history.forEach(log => {
    log.exercises.forEach(ex => {
      if (ex.exerciseId === exerciseId) {
        ex.sets.forEach(s => {
          if (s.completed && s.weight > maxWeight) {
            maxWeight = s.weight;
          }
        });
      }
    });
  });

  if (maxWeight > 0) {
    state.personalRecords[exerciseId] = maxWeight;
  }
  return maxWeight > 0 ? maxWeight : null;
}


// ==================== PROGRESSIVE OVERLOAD ADVISOR ====================
function getProgressiveOverloadAdvice(exerciseId, targetSets) {
  const lastPerform = getLastExercisePerformance(exerciseId);
  if (!lastPerform) return null;

  let lastSessionPerfect = true;
  lastPerform.sets.forEach(set => {
    if (!set.completed) lastSessionPerfect = false;
  });

  if (!lastSessionPerfect || lastPerform.sets.length === 0) return null;

  const avgReps = lastPerform.sets.reduce((sum, s) => sum + s.reps, 0) / lastPerform.sets.length;
  const lastMaxWeight = lastPerform.sets.reduce((max, s) => s.weight > max ? s.weight : max, 0);

  const isBarbell = state.exercises.find(e => e.id === exerciseId)?.equipment === "barbell";
  const isLegs = ["squat", "leg_press", "romanian_deadlift"].includes(exerciseId);

  const step = state.settings.unit === "kg" ? 2.5 : 5;

  if (isBarbell) {
    if (isLegs) {
      return `Target: ${lastMaxWeight + (step * 2)} ${state.settings.unit} (+${step * 2})`;
    } else {
      return `Target: ${lastMaxWeight + step} ${state.settings.unit} (+${step})`;
    }
  } else {
    if (avgReps >= 12) {
      return `Increase Weight (+${step} ${state.settings.unit})`;
    } else {
      return `Target: +1 Rep`;
    }
  }
}


// ==================== REST TIMER & CHIME SYNTHESIS ====================
function triggerRestTimer(seconds) {
  if (state.restTimer.intervalId) {
    clearInterval(state.restTimer.intervalId);
  }

  state.restTimer.duration = seconds;
  state.restTimer.remaining = seconds;
  
  headerRestTimer.style.display = "flex";
  timerCountdown.textContent = seconds;
  timerProgress.style.strokeDashoffset = "0";

  triggerVibration([50]);

  state.restTimer.intervalId = setInterval(() => {
    state.restTimer.remaining--;
    timerCountdown.textContent = state.restTimer.remaining;

    const pct = ((state.restTimer.duration - state.restTimer.remaining) / state.restTimer.duration) * 100;
    timerProgress.style.strokeDashoffset = pct;

    if (state.restTimer.remaining <= 0) {
      clearInterval(state.restTimer.intervalId);
      state.restTimer.intervalId = null;
      headerRestTimer.style.display = "none";
      
      triggerTimerFinishedNotification();
    }
  }, 1000);
}

function skipRestTimer() {
  if (state.restTimer.intervalId) {
    clearInterval(state.restTimer.intervalId);
    state.restTimer.intervalId = null;
  }
  headerRestTimer.style.display = "none";
}

function playTimerChime() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1109, audioCtx.currentTime + 0.15); // C#6
    
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    console.error("Failed to play synthesized chime:", e);
  }
}

function triggerTimerFinishedNotification() {
  playTimerChime();
  triggerVibration([100, 50, 100]);
}

function triggerVibration(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}


// ==================== BARBELL PLATE CALCULATOR ====================
let currentPlateTargetInput = 0;

function openPlateCalculator(weight) {
  currentPlateTargetInput = weight;
  plateTargetWeight.textContent = weight;
  plateModal.classList.add("open");
  reCalculatePlates();
}

function populateBarbellWeightOptions() {
  const select = document.getElementById("barbell-weight-select");
  select.innerHTML = "";
  if (state.settings.unit === "kg") {
    select.innerHTML = `
      <option value="20">20 kg (Standard Olympic Bar)</option>
      <option value="15">15 kg (Women's Bar)</option>
      <option value="10">10 kg (Technique Bar)</option>
    `;
  } else {
    select.innerHTML = `
      <option value="45">45 lbs (Standard Bar)</option>
      <option value="35">35 lbs (Women's Bar)</option>
      <option value="15">15 lbs (Technique Bar)</option>
    `;
  }
}

function reCalculatePlates() {
  const target = currentPlateTargetInput;
  const barWeight = parseInt(barbellWeightSelect.value) || (state.settings.unit === "kg" ? 20 : 45);
  
  platesVisualStack.innerHTML = "";
  platesBreakdownList.innerHTML = "";

  const remainder = target - barWeight;
  if (remainder <= 0) {
    platesBreakdownList.innerHTML = `<span style="font-size: 12px; color: var(--text-muted);">No plates required. Barbell matches target weight.</span>`;
    return;
  }

  const weightPerSide = remainder / 2;
  
  let availablePlates = [];
  if (state.settings.unit === "kg") {
    availablePlates = [
      { weight: 25, class: "plate-25-kg", name: "25 kg" },
      { weight: 20, class: "plate-20-kg", name: "20 kg" },
      { weight: 15, class: "plate-15-kg", name: "15 kg" },
      { weight: 10, class: "plate-10-kg", name: "10 kg" },
      { weight: 5,  class: "plate-5-kg",  name: "5 kg" },
      { weight: 2.5,class: "plate-2_5-kg",name: "2.5 kg" },
      { weight: 1.25,class: "plate-1_25-kg",name: "1.25 kg" }
    ];
  } else {
    availablePlates = [
      { weight: 45, class: "plate-45", name: "45 lb" },
      { weight: 35, class: "plate-35", name: "35 lb" },
      { weight: 25, class: "plate-25", name: "25 lb" },
      { weight: 10, class: "plate-10", name: "10 lb" },
      { weight: 5,  class: "plate-5",  name: "5 lb" },
      { weight: 2.5,class: "plate-2_5",name: "2.5 lb" }
    ];
  }

  let remainingWeight = weightPerSide;
  const loadedPlates = [];

  availablePlates.forEach(plate => {
    const qty = Math.floor(remainingWeight / plate.weight);
    if (qty > 0) {
      loadedPlates.push({ ...plate, qty: qty });
      remainingWeight -= qty * plate.weight;
    }
  });

  loadedPlates.forEach(plate => {
    for (let i = 0; i < plate.qty; i++) {
      const plateDiv = document.createElement("div");
      plateDiv.className = `barbell-plate ${plate.class}`;
      platesVisualStack.appendChild(plateDiv);
    }
  });

  loadedPlates.forEach(plate => {
    const badge = document.createElement("div");
    const safeBadgeName = plate.weight.toString().replace('.', '_');
    const metricSuffix = state.settings.unit === "kg" ? "_kg" : "";
    badge.className = `plate-badge color-${safeBadgeName}${metricSuffix}`;
    badge.textContent = `${plate.qty} x ${plate.weight} ${state.settings.unit}`;
    platesBreakdownList.appendChild(badge);
  });

  if (remainingWeight > 0) {
    const leftoverBadge = document.createElement("div");
    leftoverBadge.className = "plate-badge";
    leftoverBadge.style.borderColor = "var(--accent-red)";
    leftoverBadge.textContent = `+${(remainingWeight * 2).toFixed(1)} ${state.settings.unit} gap`;
    platesBreakdownList.appendChild(leftoverBadge);
  }
}


// ==================== EXERCISES LIBRARY ====================
function renderExercises() {
  exercisesList.innerHTML = "";
  
  const searchVal = exerciseSearch.value.toLowerCase().trim();
  const selectedChip = document.querySelector("#muscle-chips .chip.active").getAttribute("data-muscle");

  const filtered = state.exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchVal);
    const matchesCategory = (selectedChip === "All" || ex.category === selectedChip);
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    exercisesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No exercises found</h3>
        <p>Try searching for a different name or create a custom one.</p>
      </div>
    `;
    return;
  }

  filtered.sort((a, b) => a.name.localeCompare(b.name));

  filtered.forEach(ex => {
    const item = document.createElement("div");
    item.className = "card exercise-item";
    
    const prVal = getPersonalRecord(ex.id);
    const prHtml = prVal ? `<span class="pr-display">PR: ${prVal} ${state.settings.unit}</span>` : "";

    item.innerHTML = `
      <div class="exercise-item-left">
        <h4>${ex.name} ℹ️</h4>
        <div class="exercise-category-row">
          <span class="badge-category">${ex.category}</span>
          <span class="badge-category" style="opacity: 0.6;">${ex.equipment}</span>
        </div>
      </div>
      <div class="exercise-item-right">
        ${prHtml}
      </div>
    `;

    item.addEventListener("click", () => {
      showExerciseDetails(ex.id);
    });

    exercisesList.appendChild(item);
  });
}

// Save Custom Exercise with specific muscle resolution to search categories
function saveCustomExercise() {
  const nameInput = document.getElementById("custom-exercise-name");
  const catSelect = document.getElementById("custom-exercise-category");
  const equipSelect = document.getElementById("custom-exercise-equipment");

  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter a valid exercise name.");
    return;
  }

  const muscle = catSelect.value;
  let category = "Core";
  if (["Chest"].includes(muscle)) category = "Chest";
  else if (["Lats", "Upper Back", "Lower Back"].includes(muscle)) category = "Back";
  else if (["Quads", "Hamstrings", "Glutes", "Calves"].includes(muscle)) category = "Legs";
  else if (["Shoulders"].includes(muscle)) category = "Shoulders";
  else if (["Biceps", "Triceps"].includes(muscle)) category = "Arms";

  const id = "custom_" + Date.now();
  const newEx = {
    id: id,
    name: name,
    category: category,
    equipment: equipSelect.options[equipSelect.selectedIndex].text,
    muscles: { 
      primary: [muscle.toLowerCase().replace(" ", "_")], 
      secondary: [] 
    },
    instructions: ["Perform repetitions under control.", "Maintain correct posture.", "Squeeze target muscles at the peak."]
  };

  state.exercises.push(newEx);
  
  const customOnly = state.exercises.filter(e => !window.PRESET_EXERCISES.some(pe => pe.id === e.id));
  localStorage.setItem("gympace_custom_exercises", JSON.stringify(customOnly));

  nameInput.value = "";
  customExerciseModal.classList.remove("open");
  
  renderExercises();
}


// ==================== INTERACTIVE EXERCISE DETAIL VIEW & MUSCLE MAP ====================
function showExerciseDetails(exerciseId) {
  const ex = state.exercises.find(e => e.id === exerciseId);
  if (!ex) return;

  document.getElementById("detail-exercise-name").textContent = ex.name;
  document.getElementById("detail-exercise-category").textContent = ex.category;
  document.getElementById("detail-exercise-equipment").textContent = ex.equipment;

  const bodySvg = document.querySelector(".human-body-svg");
  bodySvg.querySelectorAll(".muscle-group").forEach(el => {
    el.classList.remove("active-primary", "active-secondary");
  });

  if (ex.muscles) {
    if (ex.muscles.primary) {
      ex.muscles.primary.forEach(m => {
        bodySvg.querySelectorAll(`.front-${m}, .back-${m}`).forEach(el => {
          el.classList.add("active-primary");
        });
      });
    }
    if (ex.muscles.secondary) {
      ex.muscles.secondary.forEach(m => {
        bodySvg.querySelectorAll(`.front-${m}, .back-${m}`).forEach(el => {
          el.classList.add("active-secondary");
        });
      });
    }
  }

  const list = document.getElementById("detail-exercise-instructions-list");
  list.innerHTML = "";
  if (ex.instructions) {
    ex.instructions.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = "<li>Perform repetitions with strict form.</li>";
  }

  exerciseDetailModal.classList.add("open");
}


// ==================== ADVANCED CUSTOM ROUTINE BUILDER ====================
function openCreateRoutineModal() {
  customRoutineModal.classList.add("open");
  routineBuilderExercisesPool.innerHTML = "";

  const sortedEx = [...state.exercises].sort((a, b) => a.name.localeCompare(b.name));

  sortedEx.forEach(ex => {
    const row = document.createElement("div");
    row.className = "routine-builder-row";
    
    let defWeight = ex.equipment === "barbell" ? 135 : (ex.equipment === "dumbbell" ? 25 : 50);
    if (state.settings.unit === "kg") {
      defWeight = ex.equipment === "barbell" ? 60 : (ex.equipment === "dumbbell" ? 12 : 20);
    }

    row.innerHTML = `
      <div class="routine-builder-top-row">
        <input type="checkbox" id="chk_bld_${ex.id}" value="${ex.id}">
        <label for="chk_bld_${ex.id}">${ex.name} <span style="font-size: 10px; color: var(--text-muted);">(${ex.category})</span></label>
      </div>
      
      <div class="routine-builder-set-row" id="inputs_bld_${ex.id}" style="display: none; justify-content: space-between; gap: 8px;">
        <div style="flex: 1;">
          <span class="form-label" style="font-size: 9px; margin-bottom: 2px;">Sets</span>
          <input type="number" class="form-input builder-sets" value="3" min="1" max="10" style="padding: 4px 8px; font-size: 11px; height: 28px;">
        </div>
        <div style="flex: 1;">
          <span class="form-label" style="font-size: 9px; margin-bottom: 2px;">Reps</span>
          <input type="number" class="form-input builder-reps" value="8" min="1" max="50" style="padding: 4px 8px; font-size: 11px; height: 28px;">
        </div>
        <div style="flex: 1.5;">
          <span class="form-label" style="font-size: 9px; margin-bottom: 2px;">${state.settings.unit}</span>
          <input type="number" class="form-input builder-weight" value="${defWeight}" min="0" step="${state.settings.unit === 'kg' ? 2.5 : 5}" style="padding: 4px 8px; font-size: 11px; height: 28px;">
        </div>
      </div>
    `;

    const chk = row.querySelector("input[type='checkbox']");
    const inputRow = row.querySelector(".routine-builder-set-row");
    chk.addEventListener("change", () => {
      inputRow.style.display = chk.checked ? "flex" : "none";
    });

    routineBuilderExercisesPool.appendChild(row);
  });
}

function saveCustomRoutine() {
  const nameInput = document.getElementById("custom-routine-name");
  const descInput = document.getElementById("custom-routine-desc");
  const checkedBoxes = routineBuilderExercisesPool.querySelectorAll("input[type='checkbox']:checked");

  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter a routine name.");
    return;
  }

  if (checkedBoxes.length === 0) {
    alert("Please select at least one exercise for the routine.");
    return;
  }

  const routineId = "custom_routine_" + Date.now();
  
  const selectedExs = Array.from(checkedBoxes).map(box => {
    const exId = box.value;
    const parentRow = box.closest(".routine-builder-row");
    
    const setsVal = parseInt(parentRow.querySelector(".builder-sets").value) || 3;
    const repsVal = parseInt(parentRow.querySelector(".builder-reps").value) || 8;
    const weightVal = parseFloat(parentRow.querySelector(".builder-weight").value) || 135;

    const setsArray = [];
    for (let i = 0; i < setsVal; i++) {
      setsArray.push({ weight: weightVal, reps: repsVal });
    }

    return {
      exerciseId: exId,
      sets: setsArray,
      rest: 90
    };
  });

  const newRoutine = {
    id: routineId,
    name: name,
    description: descInput.value.trim() || "Custom program routine.",
    exercises: selectedExs
  };

  state.routines.push(newRoutine);

  const customOnly = state.routines.filter(r => !window.PRESET_ROUTINES.some(pr => pr.id === r.id));
  localStorage.setItem("gympace_custom_routines", JSON.stringify(customOnly));

  nameInput.value = "";
  descInput.value = "";
  customRoutineModal.classList.remove("open");

  renderRoutines();
}


// ==================== ACTIVE WORKOUT ADD EXERCISE DRAWER ====================
function openExerciseSelectorDrawer() {
  exerciseSelectorDrawer.classList.add("open");
  renderDrawerExercises();
}

function renderDrawerExercises() {
  drawerExercisesList.innerHTML = "";
  const query = drawerExerciseSearch.value.toLowerCase().trim();

  const sorted = [...state.exercises].sort((a, b) => a.name.localeCompare(b.name));
  const filtered = sorted.filter(ex => ex.name.toLowerCase().includes(query));

  filtered.forEach(ex => {
    const item = document.createElement("div");
    item.className = "drawer-exercise-item";
    item.innerHTML = `
      <h4>${ex.name}</h4>
      <span>${ex.category} • ${ex.equipment}</span>
    `;

    item.addEventListener("click", () => {
      const lastPerform = getLastExercisePerformance(ex.id);
      
      const defaultWeight = state.settings.unit === "kg" ? 60 : 135;
      const defaultSets = [
        { weight: defaultWeight, reps: 8, completed: false, prevStats: "-" },
        { weight: defaultWeight, reps: 8, completed: false, prevStats: "-" },
        { weight: defaultWeight, reps: 8, completed: false, prevStats: "-" }
      ];

      const sets = lastPerform ? lastPerform.sets.map(s => ({
        weight: s.weight,
        reps: s.reps,
        completed: false,
        prevStats: `${s.weight} × ${s.reps}`
      })) : defaultSets;

      const advice = getProgressiveOverloadAdvice(ex.id, sets);

      state.activeWorkout.exercises.push({
        exerciseId: ex.id,
        name: ex.name,
        category: ex.category,
        equipment: ex.equipment,
        sets: sets,
        rest: 90,
        advisor: advice
      });

      exerciseSelectorDrawer.classList.remove("open");
      renderActiveWorkoutExercises();
      saveActiveWorkoutToLocal();
    });

    drawerExercisesList.appendChild(item);
  });
}


// ==================== WORKOUT HISTORY TAB ====================
function renderHistory() {
  historyList.innerHTML = "";
  
  if (state.history.length === 0) {
    historyList.style.display = "none";
    historyEmptyState.style.display = "flex";
    return;
  }

  historyList.style.display = "block";
  historyEmptyState.style.display = "none";

  state.history.forEach(log => {
    const card = document.createElement("div");
    card.className = "card history-item";

    const stats = window.GymPacePoster.calculateSummaryStats(log);
    const dateFormatted = new Date(log.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    card.innerHTML = `
      <div class="history-item-header">
        <div>
          <h3>${log.name}</h3>
          <span class="log-date">${dateFormatted}</span>
        </div>
        <div style="text-align: right;">
          <span class="log-summary">${stats.volume} ${state.settings.unit}</span>
          <div class="log-duration">⏱️ ${stats.duration}</div>
        </div>
      </div>
      
      <div class="history-item-details" style="display: none;">
        <div class="history-exercises-rows-container">
          <!-- Exercise sets rendered here -->
        </div>
        <div class="history-item-actions">
          <button class="btn btn-sm btn-primary-glow btn-share-workout">📸 Share Poster</button>
          <button class="btn btn-sm btn-danger btn-delete-history">🗑️ Delete</button>
        </div>
      </div>
    `;

    const detailContainer = card.querySelector(".history-exercises-rows-container");
    log.exercises.forEach(ex => {
      const exRow = document.createElement("div");
      exRow.className = "history-exercise-row";
      
      const setStrings = ex.sets.map(s => `${s.weight} ${state.settings.unit} x ${s.reps}`).join(", ");
      const prIcon = ex.prHit ? `<span style="color: var(--primary);" title="Personal Record!">🏆 </span>` : "";

      exRow.innerHTML = `
        <h4 class="ex-detail-trigger" style="cursor: pointer; display: inline-block;">${prIcon}${ex.name}</h4>
        <div class="history-sets-inline">${setStrings}</div>
      `;

      exRow.querySelector("h4").addEventListener("click", () => {
        showExerciseDetails(ex.exerciseId);
      });

      detailContainer.appendChild(exRow);
    });

    const header = card.querySelector(".history-item-header");
    const details = card.querySelector(".history-item-details");
    header.addEventListener("click", () => {
      const isOpen = details.style.display === "block";
      details.style.display = isOpen ? "none" : "block";
    });

    card.querySelector(".btn-share-workout").addEventListener("click", (e) => {
      e.stopPropagation();
      openSharePoster(log);
    });

    card.querySelector(".btn-delete-history").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Delete this workout log permanently?")) {
        deleteWorkoutLog(log.id);
      }
    });

    historyList.appendChild(card);
  });
}

function deleteWorkoutLog(logId) {
  state.history = state.history.filter(h => h.id !== logId);
  localStorage.setItem("gympace_history", JSON.stringify(state.history));
  renderHistory();
  updateStatsDashboard();
}


// ==================== STATS DASHBOARD & GRAPH GENERATION ====================
function getFilteredHistory() {
  const rangeVal = statsDateRangeSelect.value;
  if (rangeVal === "all") return state.history;

  const days = parseInt(rangeVal) || 30;
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  return state.history.filter(log => log.timestamp >= cutoff);
}

function updateStatsDashboard() {
  const filteredHistory = getFilteredHistory();

  if (filteredHistory.length === 0) {
    statsEmptyState.style.display = "flex";
    statsChartsContainer.style.display = "none";
    return;
  }

  statsEmptyState.style.display = "none";
  statsChartsContainer.style.display = "grid";

  const totalWorkouts = filteredHistory.length;
  let totalVolume = 0;
  
  filteredHistory.forEach(log => {
    log.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && s.weight && s.reps) {
          totalVolume += s.weight * s.reps;
        }
      });
    });
  });

  document.getElementById("summary-total-workouts").textContent = totalWorkouts;
  document.getElementById("summary-total-volume").textContent = totalVolume.toLocaleString();
  document.getElementById("summary-volume-unit").textContent = state.settings.unit;

  prChecklistContainer.innerHTML = "";
  const exercisesWithPRs = Object.keys(state.personalRecords);
  
  if (exercisesWithPRs.length === 0) {
    prChecklistContainer.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); grid-column: span 2;">Complete sets with high weights to register Personal Records!</span>`;
  } else {
    exercisesWithPRs.forEach(exId => {
      const details = state.exercises.find(e => e.id === exId);
      if (details) {
        const prItem = document.createElement("div");
        prItem.className = "pr-item-card";
        prItem.innerHTML = `
          <span class="pr-item-name">${details.name}</span>
          <span class="pr-item-val">🏆 ${state.personalRecords[exId]} ${state.settings.unit}</span>
        `;
        prChecklistContainer.appendChild(prItem);
      }
    });
  }

  const exercisesWithLogs = new Set();
  filteredHistory.forEach(log => {
    log.exercises.forEach(ex => {
      if (ex.sets.some(s => s.completed && s.weight > 0 && s.reps > 0)) {
        exercisesWithLogs.add(ex.exerciseId);
      }
    });
  });

  const prevSelectVal = oneRepMaxSelect.value;
  oneRepMaxSelect.innerHTML = "";

  Array.from(exercisesWithLogs).forEach(exId => {
    const details = state.exercises.find(e => e.id === exId);
    if (details) {
      const opt = document.createElement("option");
      opt.value = exId;
      opt.textContent = details.name;
      oneRepMaxSelect.appendChild(opt);
    }
  });

  if (prevSelectVal && Array.from(exercisesWithLogs).includes(prevSelectVal)) {
    oneRepMaxSelect.value = prevSelectVal;
  }

  updateOneRepMaxChart();
  updateVolumeChart();
  updateMuscleDonutChart();
}

function updateOneRepMaxChart() {
  const exId = oneRepMaxSelect.value;
  if (!exId) return;

  const dataPoints = [];
  const filteredHistory = getFilteredHistory();
  const chronoHistory = [...filteredHistory].reverse();

  chronoHistory.forEach(log => {
    const exLog = log.exercises.find(e => e.exerciseId === exId);
    if (exLog) {
      let max1RM = 0;
      exLog.sets.forEach(s => {
        if (s.completed && s.weight > 0 && s.reps > 0) {
          const oneRepMax = s.weight * (1 + s.reps / 30);
          if (oneRepMax > max1RM) {
            max1RM = oneRepMax;
          }
        }
      });

      if (max1RM > 0) {
        dataPoints.push({
          date: new Date(log.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          oneRepMax: Math.round(max1RM)
        });
      }
    }
  });

  const labels = dataPoints.map(d => d.date);
  const values = dataPoints.map(d => d.oneRepMax);

  if (oneRepMaxChart) {
    oneRepMaxChart.destroy();
  }

  const ctx = document.getElementById("1rm-chart").getContext("2d");
  oneRepMaxChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: `Estimated 1RM (${state.settings.unit})`,
        data: values,
        borderColor: "#d4ff00",
        backgroundColor: "rgba(212, 255, 0, 0.05)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#d4ff00",
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { color: "rgba(255, 255, 255, 0.04)" }, ticks: { color: "#94a3b8" } },
        y: { grid: { color: "rgba(255, 255, 255, 0.04)" }, ticks: { color: "#94a3b8" } }
      }
    }
  });
}

function updateVolumeChart() {
  const filteredHistory = getFilteredHistory();
  const chronoHistory = [...filteredHistory].reverse();

  const labels = chronoHistory.map(log => {
    return new Date(log.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  const values = chronoHistory.map(log => {
    let vol = 0;
    log.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && s.weight && s.reps) {
          vol += s.weight * s.reps;
        }
      });
    });
    return vol;
  });

  if (volumeChart) {
    volumeChart.destroy();
  }

  const ctx = document.getElementById("volume-chart").getContext("2d");
  volumeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: `Volume (${state.settings.unit})`,
        data: values,
        backgroundColor: "rgba(56, 189, 248, 0.65)",
        borderColor: "#38bdf8",
        borderWidth: 1.5,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { color: "rgba(255, 255, 255, 0.04)" }, ticks: { color: "#94a3b8" } },
        y: { grid: { color: "rgba(255, 255, 255, 0.04)" }, ticks: { color: "#94a3b8" } }
      }
    }
  });
}

function updateMuscleDonutChart() {
  const distribution = {
    Chest: 0,
    Back: 0,
    Legs: 0,
    Shoulders: 0,
    Arms: 0,
    Core: 0
  };

  const filteredHistory = getFilteredHistory();

  filteredHistory.forEach(log => {
    log.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) {
          if (distribution[ex.category] !== undefined) {
            distribution[ex.category]++;
          }
        }
      });
    });
  });

  const labels = Object.keys(distribution);
  const values = Object.values(distribution);

  const hasSets = values.some(v => v > 0);

  if (muscleDonutChart) {
    muscleDonutChart.destroy();
  }

  const ctx = document.getElementById("muscle-donut-chart").getContext("2d");
  
  muscleDonutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: hasSets ? values : [1, 1, 1, 1, 1, 1],
        backgroundColor: hasSets ? [
          "#d4ff00", // Chest: Volt Green
          "#38bdf8", // Back: Electric Blue
          "#34d399", // Legs: Emerald Green
          "#a855f7", // Shoulders: Purple
          "#ec4899", // Arms: Pink
          "#f97316"  // Core: Orange
        ] : [
          "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)",
          "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)"
        ],
        borderWidth: 2,
        borderColor: "#0f131a"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "#94a3b8",
            font: { family: "Outfit", weight: 600, size: 11 }
          }
        }
      },
      cutout: "70%"
    }
  });
}


// ==================== PERSONAL HEALTH PROFILE LOGIC ====================
function initializeProfileInputs() {
  if (state.profile) {
    profileWeightInput.value = state.profile.weight || "";
    profileHeightInput.value = state.profile.height || "";
    profileGenderSelect.value = state.profile.gender || "male";
    profileGoalSelect.value = state.profile.goal || "build_muscle";
    profileUnitSelect.value = state.settings.unit || "lbs";
  }
}

function updateUnitLabels() {
  const u = state.settings.unit;
  document.getElementById("lbl-profile-weight").textContent = `Weight (${u})`;
  document.getElementById("lbl-profile-height").textContent = `Height (${u === "kg" ? "cm" : "in"})`;
  document.getElementById("summary-volume-unit").textContent = u;
  document.getElementById("plate-weight-unit").textContent = u;
}

function saveProfileDetails() {
  state.profile.weight = parseFloat(profileWeightInput.value) || "";
  state.profile.height = parseFloat(profileHeightInput.value) || "";
  state.profile.gender = profileGenderSelect.value;
  state.profile.goal = profileGoalSelect.value;

  localStorage.setItem("gympace_profile", JSON.stringify(state.profile));
  updateNutritionProgress();
  alert("Profile saved successfully! Daily nutrition targets have been updated.");
}

// Calculate calorie & macro targets dynamically, factoring steps + workouts active burns
function calculateNutritionTargets() {
  let weight = parseFloat(state.profile.weight) || 150;
  const unit = state.settings.unit;
  const gender = state.profile.gender || "male";

  // Convert kg weight to lbs for calorie target formula
  let weightInLbs = weight;
  if (unit === "kg") {
    weightInLbs = weight * 2.20462;
  }

  const goal = state.profile.goal || "build_muscle";

  // Base Maintenance Calories: Weight (lbs) * 15
  let baseCalories = Math.round(weightInLbs * 15);
  
  // Adjust based on goal
  if (goal === "build_muscle") {
    baseCalories += 300;
  } else if (goal === "lose_weight") {
    baseCalories -= 500;
  } else if (goal === "gain_strength") {
    baseCalories += 150;
  }

  // Calculate active burns today
  const todayKey = new Date().toISOString().split("T")[0];
  const activity = state.activityLog[todayKey] || { steps: 0, otherCalories: 0 };
  
  // 1. Steps Burn (Weight, sex, height adjusted stride estimation)
  const sexFactor = gender === "male" ? 1.1 : (gender === "female" ? 0.9 : 1.0);
  const stepBurn = Math.round(activity.steps * (weightInLbs * 0.000265) * sexFactor);

  // 2. Logged Workout Burn (Calculates from completed workouts logged today)
  let workoutBurn = 0;
  state.history.forEach(log => {
    const logDate = new Date(log.timestamp).toISOString().split("T")[0];
    if (logDate === todayKey) {
      const durationMins = log.duration / 60;
      workoutBurn += Math.round(durationMins * 0.0358 * weightInLbs);
    }
  });

  // 3. Other logged activities burn
  const otherBurn = activity.otherCalories || 0;

  const totalActiveBurn = stepBurn + otherBurn + workoutBurn;
  const adjustedCalories = baseCalories + totalActiveBurn;

  // Protein target: 1g per lb of body weight
  const protein = Math.round(weightInLbs);

  // Fat target: 0.35g per lb of body weight
  const fats = Math.round(weightInLbs * 0.35);

  // Carbs target: Remaining calories allocated to carbohydrates
  const carbCalories = adjustedCalories - (protein * 4) - (fats * 9);
  const carbs = Math.max(50, Math.round(carbCalories / 4));

  return { 
    baseCalories, 
    adjustedCalories, 
    protein, 
    carbs, 
    fats,
    stepBurn,
    workoutBurn,
    otherBurn,
    totalActiveBurn
  };
}

// Update nutrition progress bars
function updateNutritionProgress() {
  const targets = calculateNutritionTargets();
  const todayKey = new Date().toISOString().split("T")[0];

  if (!state.nutritionLog[todayKey]) {
    state.nutritionLog[todayKey] = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  }
  const logged = state.nutritionLog[todayKey];

  // Refresh active burn labels
  const stepBurnLabel = document.getElementById("act-burn-steps");
  const workoutBurnLabel = document.getElementById("act-burn-workout");
  const otherBurnLabel = document.getElementById("act-burn-other");
  const totalBurnLabel = document.getElementById("act-burn-total");

  if (stepBurnLabel) stepBurnLabel.textContent = `${targets.stepBurn} kcal`;
  if (workoutBurnLabel) workoutBurnLabel.textContent = `${targets.workoutBurn} kcal`;
  if (otherBurnLabel) otherBurnLabel.textContent = `${targets.otherBurn} kcal`;
  if (totalBurnLabel) totalBurnLabel.textContent = `${targets.totalActiveBurn} kcal`;

  // Update progress bars & text
  progressCalLabel.textContent = `${logged.calories} / ${targets.adjustedCalories} kcal`;
  progressProteinLabel.textContent = `${logged.protein} / ${targets.protein} g`;
  progressCarbsLabel.textContent = `${logged.carbs} / ${targets.carbs} g`;
  progressFatsLabel.textContent = `${logged.fats} / ${targets.fats} g`;

  progressCalBar.style.width = `${Math.min(100, (logged.calories / targets.adjustedCalories) * 100)}%`;
  progressProteinBar.style.width = `${Math.min(100, (logged.protein / targets.protein) * 100)}%`;
  progressCarbsBar.style.width = `${Math.min(100, (logged.carbs / targets.carbs) * 100)}%`;
  progressFatsBar.style.width = `${Math.min(100, (logged.fats / targets.fats) * 100)}%`;
}

// Log steps and other activities
function logDailyActivity() {
  const todayKey = new Date().toISOString().split("T")[0];
  const stepsVal = parseInt(actStepsInput.value) || 0;
  const otherVal = parseInt(actOtherCalInput.value) || 0;

  if (stepsVal === 0 && otherVal === 0) {
    alert("Please enter steps or other calorie values to log activity.");
    return;
  }

  if (!state.activityLog[todayKey]) {
    state.activityLog[todayKey] = { steps: 0, otherCalories: 0 };
  }

  state.activityLog[todayKey].steps += stepsVal;
  state.activityLog[todayKey].otherCalories += otherVal;

  localStorage.setItem("gympace_activity_log", JSON.stringify(state.activityLog));

  // Clear inputs
  actStepsInput.value = "";
  actOtherCalInput.value = "";

  updateNutritionProgress();
  alert("Activity logged! Daily nutrition targets have been adjusted.");
}

function logNutritionIntake() {
  const todayKey = new Date().toISOString().split("T")[0];

  const calVal = parseInt(nutriCaloriesInput.value) || 0;
  const proVal = parseInt(nutriProteinInput.value) || 0;
  const carbVal = parseInt(nutriCarbsInput.value) || 0;
  const fatVal = parseInt(nutriFatsInput.value) || 0;

  if (calVal === 0 && proVal === 0 && carbVal === 0 && fatVal === 0) {
    alert("Please enter values to log nutrition.");
    return;
  }

  if (!state.nutritionLog[todayKey]) {
    state.nutritionLog[todayKey] = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  }

  state.nutritionLog[todayKey].calories += calVal;
  state.nutritionLog[todayKey].protein += proVal;
  state.nutritionLog[todayKey].carbs += carbVal;
  state.nutritionLog[todayKey].fats += fatVal;

  localStorage.setItem("gympace_nutrition_log", JSON.stringify(state.nutritionLog));
  updateNutritionProgress();

  nutriCaloriesInput.value = "";
  nutriProteinInput.value = "";
  nutriCarbsInput.value = "";
  nutriFatsInput.value = "";

  alert("Nutrition intake logged successfully!");
}


// ==================== SHARE POSTER INTERFACE ====================
let currentSelectedWorkoutForPoster = null;

function openSharePoster(workout) {
  currentSelectedWorkoutForPoster = workout;
  
  const canvas = document.getElementById("poster-canvas");
  window.GymPacePoster.drawWorkoutPoster(canvas, workout);
  
  posterModal.classList.add("open");

  downloadPosterBtn.onclick = downloadPosterImage;
  copyPosterBtn.onclick = copyPosterToClipboard;
}

function downloadPosterImage() {
  const canvas = document.getElementById("poster-canvas");
  const link = document.createElement("a");
  
  const cleanName = currentSelectedWorkoutForPoster.name.replace(/\s+/g, "_").toLowerCase();
  link.download = `gympace_${cleanName}_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function copyPosterToClipboard() {
  const canvas = document.getElementById("poster-canvas");
  
  window.GymPacePoster.copyPosterToClipboard(canvas).then(() => {
    alert("Workout poster image copied to clipboard! You can paste it directly into Instagram, Strava, or messages.");
  }).catch(err => {
    console.error("Clipboard copy failed:", err);
    alert("Frictionless clipboard copy not supported by your browser. Try downloading the image instead!");
  });
}


// ==================== OTHER HELPERS ====================
function formatDuration(sec) {
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  
  const minPad = mins.toString().padStart(2, "0");
  const secPad = secs.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${hrs}:${minPad}:${secPad}`;
  }
  return `${minPad}:${secPad}`;
}
