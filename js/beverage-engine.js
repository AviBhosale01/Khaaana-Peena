/* =========================================
   KHAANA PEENA — Beverage Engine
   Chai Studio customization logic
   ========================================= */

const BeverageEngine = {

  // ─── DEFAULTS ─────────────────────────────
  defaults: {
    'masala-chai': {
      sugar: 2,
      chaiPatti: 'medium',
      milk: 'regular',
      milkType: 'regular milk',
      ginger: 'light',
      addons: []
    },
    'green-tea': {
      sweetener: 'none',
      type: 'plain',
      strength: 'medium',
      addons: []
    },
    'buttermilk': {
      salt: 'light',
      type: 'spiced',
      addons: []
    },
    'golden-milk': {
      turmeric: 0.5,
      sweetener: 'honey',
      milkType: 'regular',
      addons: []
    }
  },

  // ─── CALCULATE NUTRITION ──────────────────
  calcChaiNutrition(settings) {
    let cal = 0, protein = 0, carbs = 0, fat = 0, sugar = 0;

    // Base tea
    cal += 5; carbs += 1;

    // Milk
    const milkCals = { 'no milk':0, 'light':25, 'regular':50, 'extra':80 };
    const milkFat  = { 'no milk':0, 'light':1.2,'regular':2.5,'extra':4 };
    cal     += (milkCals[settings.milk]||50);
    fat     += (milkFat[settings.milk]||2.5);
    protein += (settings.milk==='no milk' ? 0 : 2.5);

    if (settings.milkType === 'skim milk')   { cal -= 12; fat -= 1.5; }
    if (settings.milkType === 'oat milk')    { cal += 5; carbs += 2; }
    if (settings.milkType === 'almond milk') { cal -= 20; fat -= 1; }

    // Sugar
    const s = parseFloat(settings.sugar)||0;
    cal   += s * 16;
    sugar += s * 4;
    carbs += s * 4;

    // Addons
    const addonCals = { cardamom:2, cinnamon:4, tulsi:1, 'black pepper':2, fennel:3, masala:8 };
    (settings.addons||[]).forEach(a => { cal += (addonCals[a]||2); });

    return { calories:Math.round(cal), protein:Math.round(protein*10)/10, carbs:Math.round(carbs*10)/10, fat:Math.round(fat*10)/10, sugar:Math.round(sugar*10)/10 };
  },

  calcGreenTeaNutrition(settings) {
    let cal = 5, sugar = 0;
    if (settings.sweetener === 'honey')   { cal += 22; sugar += 5; }
    if (settings.sweetener === 'jaggery') { cal += 18; sugar += 4; }
    if (settings.sweetener === 'stevia')  { cal += 0; }
    return { calories:cal, protein:0, carbs:sugar, fat:0, sugar };
  },

  calcGoldenMilkNutrition(settings) {
    let cal = 90, protein = 5, fat = 4, sugar = 0;
    if (settings.sweetener === 'honey')   { cal += 22; sugar += 6; }
    if (settings.sweetener === 'jaggery') { cal += 18; sugar += 5; }
    if (settings.milkType === 'skim milk') { cal -= 15; fat -= 1.5; }
    if (settings.milkType === 'oat milk')  { cal += 5; }
    (settings.addons||[]).forEach(a => {
      if (a === 'ashwagandha') cal += 3;
    });
    return { calories:Math.round(cal), protein, carbs:Math.round(sugar+10), fat, sugar };
  },

  getNutrition(beverageId, settings) {
    switch(beverageId) {
      case 'masala-chai':   return this.calcChaiNutrition(settings);
      case 'green-tea':     return this.calcGreenTeaNutrition(settings);
      case 'golden-milk':   return this.calcGoldenMilkNutrition(settings);
      case 'buttermilk':    return { calories:60, protein:4, carbs:8, fat:2, sugar:4 };
      default: return { calories:50, protein:1, carbs:10, fat:0, sugar:5 };
    }
  },

  // ─── HEALTH ANALYSIS ──────────────────────
  analyzeChaiForProfile(settings, profile) {
    const conditions = profile?.conditions || [];
    const nutrition  = this.calcChaiNutrition(settings);
    const messages   = [];
    let overallOk    = true;

    // Sugar analysis
    const sugar = parseFloat(settings.sugar) || 0;
    if (conditions.includes('diabetes')) {
      if (sugar > 0.5) {
        messages.push({ type:'warn', icon:'🩸', msg:`${sugar} tsp sugar may spike blood glucose. Try 0 or stevia.` });
        overallOk = false;
      } else {
        messages.push({ type:'safe', icon:'✅', msg:`Sugar level is diabetes-safe (${sugar} tsp or less).` });
      }
    } else if (sugar > 3) {
      messages.push({ type:'warn', icon:'⚠️', msg:'High sugar — consider reducing for general health.' });
    }

    // Caffeine
    const patti = settings.chaiPatti;
    if (conditions.includes('hypertension') && patti === 'kadak') {
      messages.push({ type:'warn', icon:'❤️', msg:'Kadak chai has more caffeine — limit with hypertension.' });
      overallOk = false;
    }

    // Milk
    if (conditions.includes('lactoseIntolerant') && settings.milk !== 'no milk') {
      if (['oat milk','almond milk','soy milk'].includes(settings.milkType)) {
        messages.push({ type:'safe', icon:'✅', msg:`${settings.milkType} is lactose-free — good choice!` });
      } else {
        messages.push({ type:'warn', icon:'🥛', msg:'Regular milk contains lactose. Switch to oat/almond milk.' });
        overallOk = false;
      }
    }

    // Ginger
    if (['light','strong'].includes(settings.ginger)) {
      messages.push({ type:'safe', icon:'🫚', msg:'Ginger aids digestion and has anti-inflammatory properties.' });
    }

    // Cardamom bonus
    if (settings.addons?.includes('cardamom')) {
      messages.push({ type:'safe', icon:'🌿', msg:'Cardamom improves digestion and freshens breath.' });
    }

    // Tulsi bonus
    if (settings.addons?.includes('tulsi')) {
      messages.push({ type:'safe', icon:'🌱', msg:'Tulsi is an adaptogen — reduces stress and boosts immunity.' });
    }

    // Black pepper
    if (settings.addons?.includes('black pepper')) {
      messages.push({ type:'safe', icon:'🫙', msg:'Black pepper increases turmeric absorption 2000%. Great combo!' });
    }

    // Overall
    if (overallOk && messages.every(m => m.type === 'safe')) {
      messages.unshift({ type:'safe', icon:'💚', msg:'Your chai is perfectly crafted for your health profile!' });
    } else if (!overallOk) {
      messages.unshift({ type:'warn', icon:'⚠️', msg:'A few adjustments can make this drink healthier for you.' });
    }

    return { messages, nutrition, overallOk };
  },

  analyzeForProfile(beverageId, settings, profile) {
    if (beverageId === 'masala-chai') return this.analyzeChaiForProfile(settings, profile);

    const nutrition = this.getNutrition(beverageId, settings);
    const conditions = profile?.conditions || [];
    const messages = [];

    if (beverageId === 'green-tea') {
      messages.push({ type:'safe', icon:'💚', msg:'Green tea is excellent for metabolism and antioxidants.' });
      if (conditions.includes('diabetes')) {
        messages.push({ type:'safe', icon:'🩸', msg:'Green tea helps regulate blood sugar — great choice.' });
      }
      if (settings.sweetener === 'none' || settings.sweetener === 'stevia') {
        messages.push({ type:'safe', icon:'✅', msg:'Zero-sugar option — perfect!' });
      } else if (settings.sweetener === 'honey' && conditions.includes('diabetes')) {
        messages.push({ type:'warn', icon:'⚠️', msg:'Honey still has sugar. Consider stevia with diabetes.' });
      }
    }

    if (beverageId === 'golden-milk') {
      messages.push({ type:'safe', icon:'🌟', msg:'Turmeric milk is anti-inflammatory and great before bed.' });
      if (conditions.includes('hypertension')) {
        messages.push({ type:'safe', icon:'❤️', msg:'Curcumin in turmeric supports cardiovascular health.' });
      }
    }

    if (beverageId === 'buttermilk') {
      messages.push({ type:'safe', icon:'🦠', msg:'Chaas is probiotic and helps with digestion.' });
      if (conditions.includes('hypertension') && settings.salt === 'regular') {
        messages.push({ type:'warn', icon:'⚠️', msg:'Use light salt with hypertension.' });
      }
    }

    return { messages, nutrition, overallOk: messages.every(m => m.type !== 'warn') };
  },

  // ─── PRESETS ──────────────────────────────
  savePreset(beverageId, settings, name) {
    const presets = KP.load('beverage_presets', {});
    if (!presets[beverageId]) presets[beverageId] = [];
    presets[beverageId] = presets[beverageId].filter(p => p.name !== name);
    presets[beverageId].push({ name, settings, savedAt: new Date().toISOString() });
    KP.save('beverage_presets', presets);
  },

  getPresets(beverageId) {
    return (KP.load('beverage_presets', {})[beverageId] || []);
  },

  // ─── CUP COLOR ────────────────────────────
  getChaiColor(settings) {
    const milkLevel = { 'no milk': 0, 'light': 0.3, 'regular': 0.55, 'extra': 0.75 };
    const ml = milkLevel[settings.milk] || 0.55;
    const strength = { 'light': 0.3, 'medium': 0.6, 'kadak': 0.9 };
    const str = strength[settings.chaiPatti] || 0.6;
    const r = Math.round(180 - str * 80 + ml * 60);
    const g = Math.round(100 - str * 40 + ml * 30);
    const b = Math.round(50 - str * 20 + ml * 40);
    return `rgb(${r},${g},${b})`;
  }
};
