// GymPace Exercise and Routine Presets (with instructions and muscle mapping)

window.PRESET_EXERCISES = [
  // Chest
  {
    id: "bench_press",
    name: "Bench Press (Barbell)",
    category: "Chest",
    equipment: "barbell",
    muscles: { primary: ["chest"], secondary: ["triceps", "shoulders"] },
    instructions: [
      "Lie flat on the bench with your feet flat on the floor.",
      "Grip the barbell slightly wider than shoulder width.",
      "Unrack the bar and lower it slowly under control to your mid-chest.",
      "Push the bar back up powerfully until your arms are fully extended."
    ]
  },
  {
    id: "incline_db_press",
    name: "Incline Press (Dumbbell)",
    category: "Chest",
    equipment: "dumbbell",
    muscles: { primary: ["chest"], secondary: ["shoulders", "triceps"] },
    instructions: [
      "Set the incline bench to a 30-45 degree angle.",
      "Sit back with dumbbells at shoulder height, elbows bent at 90 degrees.",
      "Press dumbbells straight up, keeping them aligned over your upper chest.",
      "Lower them slowly back to starting position without bouncing."
    ]
  },
  {
    id: "chest_fly_db",
    name: "Chest Fly (Dumbbell)",
    category: "Chest",
    equipment: "dumbbell",
    muscles: { primary: ["chest"], secondary: ["shoulders"] },
    instructions: [
      "Lie flat on a bench holding dumbbells straight up over your chest.",
      "Slightly bend your elbows, and lower your arms out in a wide arc.",
      "Stop when you feel a comfortable stretch in your chest muscles.",
      "Reverse the movement in a hugging motion to return to the top."
    ]
  },
  {
    id: "cable_crossover",
    name: "Cable Crossover",
    category: "Chest",
    equipment: "cable",
    muscles: { primary: ["chest"], secondary: ["shoulders"] },
    instructions: [
      "Set cable pulleys to high position and hold handles with arms extended.",
      "Step forward slightly, leaning your torso forward under control.",
      "Bring handles down and forward in a wide arc, crossing hands at the bottom.",
      "Return handles back slowly to starting position, maintaining a soft bend in elbows."
    ]
  },

  // Back
  {
    id: "deadlift",
    name: "Deadlift (Barbell)",
    category: "Back",
    equipment: "barbell",
    muscles: { primary: ["lower_back", "hamstrings", "glutes"], secondary: ["upper_back", "core"] },
    instructions: [
      "Stand with feet hip-width apart, shins about an inch from the bar.",
      "Bend at hips and knees, grabbing the barbell with a shoulder-width grip.",
      "Flatten your back, lift your chest, and engage your core.",
      "Drive through your heels to stand up, pulling the bar close to your body."
    ]
  },
  {
    id: "pull_ups",
    name: "Pull Ups",
    category: "Back",
    equipment: "bodyweight",
    muscles: { primary: ["lats", "upper_back"], secondary: ["biceps", "core"] },
    instructions: [
      "Hang from pull-up bar with an overhand grip, wider than shoulder-width.",
      "Squeeze your shoulder blades down and back to engage your lats.",
      "Pull your chest up toward the bar, leading with your elbows.",
      "Lower yourself slowly back to a dead hang under control."
    ]
  },
  {
    id: "lat_pulldown",
    name: "Lat Pulldown",
    category: "Back",
    equipment: "machine",
    muscles: { primary: ["lats"], secondary: ["upper_back", "biceps"] },
    instructions: [
      "Sit on the machine, adjust thigh pad, and grip wide bar with palms out.",
      "Lean back slightly, pull the bar down toward your upper chest.",
      "Focus on driving your elbows down toward your back pockets.",
      "Extend your arms slowly back to starting position for a full stretch."
    ]
  },
  {
    id: "barbell_row",
    name: "Bent Over Row (Barbell)",
    category: "Back",
    equipment: "barbell",
    muscles: { primary: ["upper_back", "lats"], secondary: ["biceps", "core", "lower_back"] },
    instructions: [
      "Stand holding a bar, feet shoulder-width, bend knees slightly.",
      "Hinge forward at hips until torso is nearly parallel to the floor.",
      "Keep back straight, pull bar to your lower ribs, squeezing shoulder blades.",
      "Lower the bar slowly back to the starting position."
    ]
  },
  {
    id: "seated_cable_row",
    name: "Seated Cable Row",
    category: "Back",
    equipment: "cable",
    muscles: { primary: ["upper_back", "lats"], secondary: ["biceps", "core"] },
    instructions: [
      "Sit on platform, place feet on pads, and hold attachment with arms straight.",
      "Keep your back straight, pull attachment to your waist.",
      "Squeeze your shoulder blades together at the peak of the movement.",
      "Extend arms forward under control, stretching your back."
    ]
  },

  // Legs
  {
    id: "squat",
    name: "Squat (Barbell)",
    category: "Legs",
    equipment: "barbell",
    muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings", "core"] },
    instructions: [
      "Rest the bar on your upper traps, feet shoulder-width apart.",
      "Send hips back and squat down, keeping knees aligned over toes.",
      "Go down until your thighs are parallel to the floor or deeper.",
      "Drive back up to standing by pushing through your heels."
    ]
  },
  {
    id: "leg_press",
    name: "Leg Press",
    category: "Legs",
    equipment: "machine",
    muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings"] },
    instructions: [
      "Sit on leg press machine, place feet shoulder-width apart on sled.",
      "Release safety locks, lower sled slowly toward chest until knees bend 90 degrees.",
      "Press sled back up powerfully, ensuring you do not lock out your knees.",
      "Maintain a flat lower back pressed against the seat padding."
    ]
  },
  {
    id: "leg_curl",
    name: "Lying Leg Curl",
    category: "Legs",
    equipment: "machine",
    muscles: { primary: ["hamstrings"], secondary: ["glutes"] },
    instructions: [
      "Lie face down, positioning the roller pad just below your calf muscles.",
      "Hold handles, curl the pad up toward your glutes under control.",
      "Squeeze your hamstrings at the top of the contraction.",
      "Slowly return pad back to starting position."
    ]
  },
  {
    id: "romanian_deadlift",
    name: "Romanian Deadlift (Barbell)",
    category: "Legs",
    equipment: "barbell",
    muscles: { primary: ["hamstrings", "glutes"], secondary: ["lower_back", "core"] },
    instructions: [
      "Stand tall holding barbell, feet shoulder-width apart.",
      "Push hips straight back, sliding the bar down along your thighs.",
      "Keep knees soft (slightly bent) and maintain a flat, neutral spine.",
      "Hinge back up when you feel a deep stretch in your hamstrings."
    ]
  },
  {
    id: "calf_raise",
    name: "Calf Raise",
    category: "Legs",
    equipment: "machine",
    muscles: { primary: ["calves"], secondary: [] },
    instructions: [
      "Place balls of feet on platform edge, shoulders locked under pads.",
      "Lower heels below platform level to get a deep calf stretch.",
      "Push up through your toes as high as possible, contracting calves.",
      "Lower down slowly back to the stretched position."
    ]
  },

  // Shoulders
  {
    id: "overhead_press",
    name: "Overhead Press (Barbell)",
    category: "Shoulders",
    equipment: "barbell",
    muscles: { primary: ["shoulders"], secondary: ["triceps", "core"] },
    instructions: [
      "Hold barbell at collarbone level with a clean, shoulder-width grip.",
      "Squeeze glutes and brace core, pressing bar straight up over head.",
      "Pull head back slightly as bar passes your face, then push head forward at lock.",
      "Lower bar slowly back to chest level."
    ]
  },
  {
    id: "lateral_raise",
    name: "Lateral Raise (Dumbbell)",
    category: "Shoulders",
    equipment: "dumbbell",
    muscles: { primary: ["shoulders"], secondary: [] },
    instructions: [
      "Stand holding dumbbells at your sides, torso slightly forward.",
      "Raise arms out to sides in a wide arc, leading with your elbows.",
      "Stop when arms are parallel to the floor, palms facing down.",
      "Lower weights back to sides under control."
    ]
  },
  {
    id: "face_pulls",
    name: "Face Pulls",
    category: "Shoulders",
    equipment: "cable",
    muscles: { primary: ["shoulders", "upper_back"], secondary: [] },
    instructions: [
      "Stand facing pulley set at upper-chest height, holding rope attachment.",
      "Step back to lift weight stack, pulling rope toward your nose.",
      "Flare your elbows out and pull hands back past ears to rotate shoulders.",
      "Extend arms slowly back to starting position."
    ]
  },

  // Arms
  {
    id: "bicep_curl_db",
    name: "Bicep Curl (Dumbbell)",
    category: "Arms",
    equipment: "dumbbell",
    muscles: { primary: ["biceps"], secondary: [] },
    instructions: [
      "Stand holding dumbbells at your sides, palms facing in.",
      "Curl weights up, rotating wrists so palms face up at the top.",
      "Keep your elbows pinned close to your torso; do not swing weights.",
      "Lower weights slowly back to starting position."
    ]
  },
  {
    id: "hammer_curl",
    name: "Hammer Curl (Dumbbell)",
    category: "Arms",
    equipment: "dumbbell",
    muscles: { primary: ["biceps"], secondary: [] },
    instructions: [
      "Stand holding dumbbells at sides with a neutral grip (palms facing in).",
      "Curl weights up while maintaining neutral grip.",
      "Keep elbows tucked, contracting biceps at top.",
      "Lower dumbbells slowly back to sides."
    ]
  },
  {
    id: "tricep_pushdown",
    name: "Tricep Pushdown (Cable)",
    category: "Arms",
    equipment: "cable",
    muscles: { primary: ["triceps"], secondary: [] },
    instructions: [
      "Stand facing pulley, grab bar or rope with elbows tucked at 90 degrees.",
      "Push attachment down toward thighs, fully extending elbows.",
      "Squeeze triceps at bottom of contraction.",
      "Allow attachment to rise slowly back to elbow height."
    ]
  },
  {
    id: "skullcrusher",
    name: "Skullcrusher (Barbell)",
    category: "Arms",
    equipment: "barbell",
    muscles: { primary: ["triceps"], secondary: [] },
    instructions: [
      "Lie on flat bench, holding barbell straight up over chest.",
      "Bend at elbows to lower bar slowly down toward your forehead.",
      "Keep your upper arms stationary (vertical) throughout the movement.",
      "Use your triceps to press bar back up to start position."
    ]
  },

  // Core
  {
    id: "plank",
    name: "Plank",
    category: "Core",
    equipment: "bodyweight",
    muscles: { primary: ["core"], secondary: ["glutes", "shoulders"] },
    instructions: [
      "Lie face down, support body on forearms and toes.",
      "Align elbows directly under shoulders, back flat.",
      "Brace core, squeeze glutes, and hold straight body line.",
      "Breathe steadily, keeping hips from sagging or rising."
    ]
  },
  {
    id: "hanging_leg_raise",
    name: "Hanging Leg Raise",
    category: "Core",
    equipment: "bodyweight",
    muscles: { primary: ["core"], secondary: [] },
    instructions: [
      "Hang from pull-up bar, arms straight, legs fully extended.",
      "Brace core and raise legs straight up until parallel to floor.",
      "Control the descent slowly to prevent swinging.",
      "If too difficult, perform with bent knees instead."
    ]
  }
];

window.PRESET_ROUTINES = [
  {
    id: "push_day",
    name: "Push Day",
    description: "Focus on chest, shoulders, and triceps",
    exercises: [
      { exerciseId: "bench_press", sets: [ { weight: 135, reps: 8 }, { weight: 135, reps: 8 }, { weight: 135, reps: 8 } ], rest: 120 },
      { exerciseId: "overhead_press", sets: [ { weight: 95, reps: 8 }, { weight: 95, reps: 8 }, { weight: 95, reps: 8 } ], rest: 90 },
      { exerciseId: "incline_db_press", sets: [ { weight: 45, reps: 10 }, { weight: 45, reps: 10 }, { weight: 45, reps: 10 } ], rest: 90 },
      { exerciseId: "lateral_raise", sets: [ { weight: 15, reps: 12 }, { weight: 15, reps: 12 }, { weight: 15, reps: 12 } ], rest: 60 },
      { exerciseId: "tricep_pushdown", sets: [ { weight: 50, reps: 10 }, { weight: 50, reps: 10 }, { weight: 50, reps: 10 } ], rest: 60 }
    ]
  },
  {
    id: "pull_day",
    name: "Pull Day",
    description: "Focus on back, traps, and biceps",
    exercises: [
      { exerciseId: "deadlift", sets: [ { weight: 225, reps: 5 }, { weight: 225, reps: 5 }, { weight: 225, reps: 5 } ], rest: 180 },
      { exerciseId: "pull_ups", sets: [ { weight: 0, reps: 8 }, { weight: 0, reps: 8 }, { weight: 0, reps: 8 } ], rest: 90 },
      { exerciseId: "seated_cable_row", sets: [ { weight: 100, reps: 10 }, { weight: 100, reps: 10 }, { weight: 100, reps: 10 } ], rest: 90 },
      { exerciseId: "face_pulls", sets: [ { weight: 40, reps: 12 }, { weight: 40, reps: 12 }, { weight: 40, reps: 12 } ], rest: 60 },
      { exerciseId: "bicep_curl_db", sets: [ { weight: 25, reps: 10 }, { weight: 25, reps: 10 }, { weight: 25, reps: 10 } ], rest: 60 }
    ]
  },
  {
    id: "leg_day",
    name: "Leg Day",
    description: "Focus on quads, hamstrings, and calves",
    exercises: [
      { exerciseId: "squat", sets: [ { weight: 185, reps: 8 }, { weight: 185, reps: 8 }, { weight: 185, reps: 8 } ], rest: 120 },
      { exerciseId: "romanian_deadlift", sets: [ { weight: 135, reps: 10 }, { weight: 135, reps: 10 }, { weight: 135, reps: 10 } ], rest: 90 },
      { exerciseId: "leg_press", sets: [ { weight: 270, reps: 10 }, { weight: 270, reps: 10 }, { weight: 270, reps: 10 } ], rest: 90 },
      { exerciseId: "calf_raise", sets: [ { weight: 100, reps: 15 }, { weight: 100, reps: 15 }, { weight: 100, reps: 15 } ], rest: 60 },
      { exerciseId: "plank", sets: [ { weight: 0, reps: 60 }, { weight: 0, reps: 60 }, { weight: 0, reps: 60 } ], rest: 60 }
    ]
  }
];
