/* =========================================
   KHAANA PEENA — Health Engine
   Personalized meal scoring & suggestions
   ========================================= */

const HealthEngine = {

  // ─── SCORE A FOOD ITEM ────────────────────
  scoreFood(food, profile) {
    if (!profile) return food.healthScore || 70;
    let score = food.healthScore || 70;
    const conditions = profile.conditions || [];
    const warnings = [];
    const positives = [];

    // Check contraindications
    if (food.contraindications?.length) {
      if (conditions.includes('lactoseIntolerant') && food.contraindications.includes('lactose')) {
        score -= 30;
        warnings.push({ type:'danger', msg:'Contains lactose — not suitable for you' });
      }
      if (conditions.includes('glutenFree') && food.contraindications.includes('gluten')) {
        score -= 30;
        warnings.push({ type:'danger', msg:'Contains gluten — not suitable for you' });
      }
      if (profile.eggAllergy && food.contraindications.includes('egg-allergy')) {
        score -= 30;
        warnings.push({ type:'danger', msg:'Contains egg — you have an egg allergy' });
      }
    }

    // Vegan check
    if (conditions.includes('vegan') && !food.isVegan) {
      score -= 25;
      warnings.push({ type:'danger', msg:'Not vegan' });
    }

    // Vegetarian check
    if ((profile.dietType === 'vegetarian') && !food.isVeg) {
      score -= 20;
      warnings.push({ type:'warn', msg:'Not vegetarian' });
    }

    // Diabetes handling
    if (conditions.includes('diabetes')) {
      if (food.glycemicIndex === 'high') {
        score -= 20;
        warnings.push({ type:'warn', msg:'High glycemic index — may spike blood sugar' });
      } else if (food.glycemicIndex === 'low') {
        score += 8;
        positives.push('Low glycemic index — great for diabetes management');
      }
      if (food.healthTags?.includes('diabetic-friendly')) {
        score += 10;
        positives.push('Diabetic-friendly food');
      }
    }

    // Hypertension
    if (conditions.includes('hypertension')) {
      if (food.sodium === 'high') {
        score -= 18;
        warnings.push({ type:'warn', msg:'High sodium — monitor portion with hypertension' });
      } else if (food.sodium === 'low') {
        score += 8;
        positives.push('Low sodium — heart-friendly choice');
      }
    }

    // Weight loss
    if (conditions.includes('weight-loss') && food.calories > 450) {
      score -= 12;
      warnings.push({ type:'warn', msg:'Higher calorie meal — consider smaller portions' });
    }
    if (conditions.includes('weight-loss') && food.healthTags?.includes('low-calorie')) {
      score += 10;
      positives.push('Low calorie — supports weight management');
    }

    // Gym / High protein
    if (conditions.includes('gym')) {
      if ((food.protein || 0) >= 20) {
        score += 10;
        positives.push(`High protein (${food.protein}g) — great for muscle recovery`);
      } else if ((food.protein || 0) < 10) {
        score -= 5;
      }
    }

    // Spice level
    if (profile.spiceTolerance === 'mild' && (food.spice || 0) >= 3) {
      score -= 10;
      warnings.push({ type:'warn', msg:'Spicy — reduce chili to suit your preference' });
    }

    // Pregnancy
    if (conditions.includes('pregnancy')) {
      if (food.healthTags?.includes('iron-rich') || food.healthTags?.includes('calcium-rich')) {
        score += 10;
        positives.push('Rich in nutrients important during pregnancy');
      }
      if ((food.spice || 0) >= 3) {
        score -= 8;
        warnings.push({ type:'warn', msg:'Very spicy — may cause heartburn during pregnancy' });
      }
    }

    score = Math.max(5, Math.min(100, Math.round(score)));
    return { score, warnings, positives };
  },

  // ─── GET SUGGESTIONS ──────────────────────
  getSuggestions(mealType, profile, count = 6) {
    const pool = MEAL_DATA[mealType] || [];
    const scored = pool.map(food => {
      const result = this.scoreFood(food, profile);
      return {
        ...food,
        score: typeof result === 'object' ? result.score : result,
        warnings: typeof result === 'object' ? result.warnings : [],
        positives: typeof result === 'object' ? result.positives : []
      };
    });
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  },

  // ─── DAILY MEAL PLAN ──────────────────────
  getDailyPlan(profile) {
    const breakfast = this.getSuggestions('breakfast', profile, 3)[0];
    const lunch     = this.getSuggestions('lunch', profile, 3)[0];
    const dinner    = this.getSuggestions('dinner', profile, 3)[0];
    const snack     = this.getSuggestions('snacks', profile, 3)[0];
    const beverage  = this.getSuggestions('beverages', profile, 3)[0];

    return { breakfast, lunch, dinner, snack, beverage };
  },

  // ─── MACRO TARGETS ────────────────────────
  getMacroTargets(profile) {
    if (!profile) return { calories:2000, protein:50, carbs:250, fat:65, fiber:28 };

    const weight = parseFloat(profile.weight) || 70;
    const height = parseFloat(profile.height) || 170;
    const age    = parseInt(profile.age) || 30;
    const gender = profile.gender || 'male';
    const activity = profile.activityLevel || 'moderate';
    const conditions = profile.conditions || [];

    // Harris-Benedict BMR
    let bmr;
    if (gender === 'female') {
      bmr = 447.6 + 9.25*weight + 3.10*height - 4.33*age;
    } else {
      bmr = 88.4 + 13.4*weight + 4.8*height - 5.68*age;
    }

    const activityMult = {sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9};
    let tdee = bmr * (activityMult[activity] || 1.55);

    // Adjustments
    if (conditions.includes('weight-loss')) tdee -= 400;
    if (conditions.includes('gym'))         tdee += 200;

    let protein = weight * (conditions.includes('gym') ? 2.0 : 1.2);
    let fat     = (tdee * 0.28) / 9;
    let carbs   = (tdee - protein*4 - fat*9) / 4;
    let fiber   = 28;

    if (conditions.includes('diabetes')) {
      carbs  = Math.min(carbs, 200);
      fiber  = 35;
    }
    if (conditions.includes('hypertension')) {
      // sodium goal handled separately
    }

    return {
      calories: Math.round(tdee),
      protein:  Math.round(protein),
      carbs:    Math.round(carbs),
      fat:      Math.round(fat),
      fiber
    };
  },

  // ─── TODAY'S CONSUMED ─────────────────────
  getTodayConsumed() {
    const today = new Date().toDateString();
    const log   = KP.load('food_log', {});
    return log[today] || { calories:0, protein:0, carbs:0, fat:0, fiber:0, items:[] };
  },

  logFood(food, mealType) {
    const today = new Date().toDateString();
    const log   = KP.load('food_log', {});
    if (!log[today]) log[today] = { calories:0, protein:0, carbs:0, fat:0, fiber:0, items:[] };

    log[today].calories += food.calories || 0;
    log[today].protein  += food.protein  || 0;
    log[today].carbs    += food.carbs    || 0;
    log[today].fat      += food.fat      || 0;
    log[today].fiber    += food.fiber    || 0;
    log[today].items.push({ id: food.id, name: food.name, mealType, time: new Date().toISOString(), calories: food.calories });

    KP.save('food_log', log);
  },

  // ─── HEALTH BADGE ─────────────────────────
  getScoreBadge(score) {
    if (score >= 85) return { label:'Excellent', cls:'badge-green',  color:'var(--accent)', ring:'excellent' };
    if (score >= 70) return { label:'Good',      cls:'badge-yellow', color:'var(--warning)', ring:'good' };
    return              { label:'Caution',   cls:'badge-red',    color:'var(--danger)',  ring:'poor' };
  },

  // ─── HEALTH RING SVG ──────────────────────
  renderHealthRing(score, size = 56) {
    const badge  = this.getScoreBadge(score);
    const r      = (size - 8) / 2;
    const circ   = 2 * Math.PI * r;
    const fill   = circ - (score / 100) * circ;
    return `
      <div class="health-score-wrap">
        <svg width="${size}" height="${size}" class="health-ring-svg">
          <circle class="health-ring-track" cx="${size/2}" cy="${size/2}" r="${r}"/>
          <circle class="health-ring-fill ${badge.ring}"
            cx="${size/2}" cy="${size/2}" r="${r}"
            stroke-dasharray="${circ}"
            stroke-dashoffset="${fill}"/>
        </svg>
        <span class="health-score-num" style="color:${badge.color}">${score}</span>
      </div>`;
  },

  // ─── CUSTOMIZATION HEALTH CHECK ──────────────────
  checkCustomization(food, adjustments, profile) {
    const warnings = [];
    const conditions = profile?.conditions || [];

    adjustments.forEach(adj => {
      if (adj.type === 'sweet' && adj.increased && conditions.includes('diabetes')) {
        warnings.push({ type:'warn', msg:`Extra ${adj.name} — watch sugar intake with diabetes` });
      }
      if (adj.type === 'fat' && adj.increased && conditions.includes('weight-loss')) {
        warnings.push({ type:'warn', msg:`More ${adj.name} adds calories` });
      }
      if (adj.type === 'mineral' && adj.name.toLowerCase().includes('salt') && adj.increased && conditions.includes('hypertension')) {
        warnings.push({ type:'warn', msg:'Extra salt — avoid with hypertension' });
      }
      if (adj.type === 'spice' && adj.increased && profile?.spiceTolerance === 'mild') {
        warnings.push({ type:'warn', msg:'More spice than your preference' });
      }
    });

    return warnings;
  }
};
