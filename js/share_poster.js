// GymPace Share Poster Generator

window.GymPacePoster = {
  // Render completed workout summary to HTML Canvas
  drawWorkoutPoster: function(canvas, workout) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw Background
    // Deep slate background
    ctx.fillStyle = '#090b11';
    ctx.fillRect(0, 0, w, h);

    // Glowing radial gradient in top-right corner
    const grad = ctx.createRadialGradient(w - 50, 100, 20, w - 50, 100, 350);
    grad.addColorStop(0, 'rgba(212, 255, 0, 0.15)'); // Volt glow
    grad.addColorStop(1, 'rgba(9, 11, 17, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Accent lines / borders
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    ctx.strokeStyle = '#d4ff00';
    ctx.lineWidth = 2;
    // Tiny Volt corner indicators
    // Top-Left
    ctx.beginPath(); ctx.moveTo(25, 25); ctx.lineTo(45, 25); ctx.moveTo(25, 25); ctx.lineTo(25, 45); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(w - 25, h - 25); ctx.lineTo(w - 45, h - 25); ctx.moveTo(w - 25, h - 25); ctx.lineTo(w - 25, h - 45); ctx.stroke();

    // 2. Header
    // Logo
    ctx.fillStyle = '#d4ff00';
    ctx.font = '800 24px "Outfit", sans-serif';
    ctx.fillText('⚡ GymPace', 40, 65);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 11px "Outfit", sans-serif';
    ctx.fillText('OFFICIAL WORKOUT SUMMARY', w - 210, 60);

    // Header divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 85);
    ctx.lineTo(w - 40, 85);
    ctx.stroke();

    // 3. Workout Info
    // Workout Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 38px "Outfit", sans-serif';
    const title = workout.name.toUpperCase();
    ctx.fillText(title, 40, 140);

    // Workout Date
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    const dateStr = new Date(workout.timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillText(dateStr, 40, 175);

    // 4. Metrics Dashboard (Grid Layout)
    const stats = this.calculateSummaryStats(workout);
    
    this.drawMetricBox(ctx, 40, 205, 150, 95, 'DURATION', stats.duration, '⏱️');
    this.drawMetricBox(ctx, 210, 205, 180, 95, 'TOTAL VOLUME', stats.volume + ' lbs', '🏋️');
    this.drawMetricBox(ctx, 410, 205, 150, 95, 'PRs AVOIDED', stats.prs + ' PRs', '🏆');

    // 5. Exercises List
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 12px "Outfit", sans-serif';
    ctx.fillText('EXERCISES COMPLETED', 40, 345);

    let startY = 380;
    const maxVisibleExercises = 6;
    const exercisesToShow = workout.exercises.slice(0, maxVisibleExercises);

    exercisesToShow.forEach((exercise, idx) => {
      // Background row tint
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(40, startY - 24, w - 80, 48);
      
      // Exercise Name
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
      const exName = exercise.name.length > 30 ? exercise.name.substring(0, 27) + '...' : exercise.name;
      ctx.fillText(exName, 55, startY + 5);

      // Exercise Category Badge text
      ctx.fillStyle = '#d4ff00';
      ctx.font = '700 10px "Outfit", sans-serif';
      ctx.fillText(exercise.category.toUpperCase(), w - 160, startY + 3);

      // Set/Rep String
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
      const setsSummary = this.formatSetsSummary(exercise.sets);
      ctx.fillText(setsSummary, 55, startY + 24);

      startY += 62;
    });

    // Check if there are remaining exercises
    if (workout.exercises.length > maxVisibleExercises) {
      ctx.fillStyle = 'rgba(212, 255, 0, 0.1)';
      ctx.fillRect(40, startY - 24, w - 80, 36);
      
      ctx.fillStyle = '#d4ff00';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.fillText(`+ ${workout.exercises.length - maxVisibleExercises} MORE EXERCISES COMPLETED`, 60, startY - 1);
    }

    // 6. Footer branding
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, h - 85);
    ctx.lineTo(w - 40, h - 85);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Accelerate your progress. Track with precision.', 40, h - 50);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '700 13px "Outfit", sans-serif';
    ctx.fillText('GYMPACE APP', w - 140, h - 50);
  },

  // Helper to draw clean metric card boxes inside the canvas
  drawMetricBox: function(ctx, x, y, width, height, label, value, icon) {
    // Fill Card Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(x, y, width, height);
    
    // Draw fine border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);

    // Draw Icon in Corner
    ctx.font = '16px "Segoe UI Symbol"';
    ctx.fillText(icon, x + width - 30, y + 25);

    // Draw Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 10px "Outfit", sans-serif';
    ctx.fillText(label, x + 15, y + 26);

    // Draw Value
    ctx.fillStyle = '#d4ff00';
    ctx.font = '800 22px "Outfit", sans-serif';
    ctx.fillText(value, x + 15, y + 66);
  },

  // Compute total volume, duration, and PRs
  calculateSummaryStats: function(workout) {
    let volume = 0;
    workout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          volume += parseFloat(set.weight) * parseInt(set.reps);
        }
      });
    });

    const mins = Math.round(workout.duration / 60) || 1;
    
    // Count personal records
    let prs = 0;
    workout.exercises.forEach(ex => {
      if (ex.prHit) prs++;
    });

    return {
      duration: mins + ' min',
      volume: volume.toLocaleString(),
      prs: prs
    };
  },

  // Combine sets into a readable string format (e.g. 3 sets: 135x8, 135x8, 135x8)
  formatSetsSummary: function(sets) {
    const activeSets = sets.filter(s => s.completed);
    if (activeSets.length === 0) return 'No logged sets';
    
    // Compact formatting
    const groups = [];
    let currentWeight = activeSets[0].weight;
    let currentReps = activeSets[0].reps;
    let count = 0;

    activeSets.forEach((set, i) => {
      if (set.weight === currentWeight && set.reps === currentReps) {
        count++;
      } else {
        groups.push(`${count} x ${currentWeight} lbs × ${currentReps}`);
        currentWeight = set.weight;
        currentReps = set.reps;
        count = 1;
      }
    });
    groups.push(`${count} x ${currentWeight} lbs × ${currentReps}`);

    return groups.join(', ');
  },

  // Copy Canvas image directly to Clipboard
  copyPosterToClipboard: function(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas blob generation failed'));
          return;
        }
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]).then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          reject(err);
        }
      }, 'image/png');
    });
  }
};
