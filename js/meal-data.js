/* =========================================
   KHAANA PEENA — Indian Food Database
   55+ dishes with health metadata
   ========================================= */

const MEAL_DATA = {

  breakfast: [
    {
      id:'poha', name:'Poha', hindi:'पोहा', emoji:'🥘',
      desc:'Light flattened rice with turmeric, peas & lemon',
      calories:220, protein:5, carbs:40, fat:6, fiber:2,
      glycemicIndex:'low', sodium:'medium', spice:1, prepTime:15,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['low-glycemic','light','energising','easy-digest'],
      contraindications:[],
      healthScore:88,
      suitableFor:['diabetes','hypertension','thyroid','weight-loss','general'],
      ingredients:[
        {name:'Flattened Rice',qty:'100g',adjustable:true,type:'carb'},
        {name:'Mustard Oil',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Green Peas',qty:'2 tbsp',adjustable:true,type:'protein'},
        {name:'Onion',qty:'1 small',adjustable:true,type:'veg'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'},
        {name:'Turmeric',qty:'¼ tsp',adjustable:false,type:'spice'},
        {name:'Lemon Juice',qty:'1 tbsp',adjustable:true,type:'flavor'},
        {name:'Peanuts',qty:'1 tbsp',adjustable:true,type:'protein'},
        {name:'Sugar',qty:'½ tsp',adjustable:true,type:'sweet'},
        {name:'Coriander',qty:'handful',adjustable:true,type:'herb'}
      ]
    },
    {
      id:'upma', name:'Upma', hindi:'उपमा', emoji:'🫕',
      desc:'Savory semolina porridge with vegetables',
      calories:250, protein:7, carbs:42, fat:8, fiber:3,
      glycemicIndex:'medium', sodium:'medium', spice:1, prepTime:12,
      isVeg:true, isVegan:false, isGlutenFree:false,
      healthTags:['filling','protein-rich','easy-digest'],
      contraindications:['gluten'],
      healthScore:80,
      suitableFor:['general','thyroid','weight-loss'],
      ingredients:[
        {name:'Semolina (Sooji)',qty:'100g',adjustable:true,type:'carb'},
        {name:'Ghee',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Mustard Seeds',qty:'½ tsp',adjustable:false,type:'spice'},
        {name:'Curry Leaves',qty:'8 leaves',adjustable:true,type:'herb'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'},
        {name:'Onion',qty:'1 medium',adjustable:true,type:'veg'},
        {name:'Carrot',qty:'¼ cup',adjustable:true,type:'veg'},
        {name:'Peas',qty:'2 tbsp',adjustable:true,type:'protein'},
        {name:'Water',qty:'2 cups',adjustable:false,type:'liquid'}
      ]
    },
    {
      id:'idli', name:'Idli', hindi:'इडली', emoji:'🫓',
      desc:'Steamed fermented rice & lentil cakes',
      calories:160, protein:5, carbs:32, fat:1, fiber:1,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:20,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['fermented','probiotic','light','low-fat','low-sodium'],
      contraindications:[],
      healthScore:92,
      suitableFor:['diabetes','hypertension','thyroid','weight-loss','general','pregnancy'],
      ingredients:[
        {name:'Rice Batter',qty:'200g',adjustable:false,type:'carb'},
        {name:'Urad Dal Batter',qty:'50g',adjustable:false,type:'protein'},
        {name:'Salt',qty:'pinch',adjustable:true,type:'mineral'}
      ]
    },
    {
      id:'moong-dal-cheela', name:'Moong Dal Cheela', hindi:'मूंग दाल चीला', emoji:'🥞',
      desc:'Protein-packed green lentil pancake',
      calories:190, protein:12, carbs:28, fat:4, fiber:4,
      glycemicIndex:'low', sodium:'low', spice:1, prepTime:20,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['high-protein','low-glycemic','gluten-free','diabetic-friendly'],
      contraindications:[],
      healthScore:95,
      suitableFor:['diabetes','hypertension','weight-loss','gym','general'],
      ingredients:[
        {name:'Green Moong Dal',qty:'100g',adjustable:false,type:'protein'},
        {name:'Ginger',qty:'½ inch',adjustable:true,type:'spice'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'},
        {name:'Onion',qty:'1 small',adjustable:true,type:'veg'},
        {name:'Coriander',qty:'handful',adjustable:true,type:'herb'},
        {name:'Cumin',qty:'½ tsp',adjustable:false,type:'spice'},
        {name:'Oil',qty:'½ tsp/cheela',adjustable:true,type:'fat'}
      ]
    },
    {
      id:'ragi-porridge', name:'Ragi Porridge', hindi:'रागी दलिया', emoji:'🥣',
      desc:'Superfood finger millet warm bowl',
      calories:185, protein:7, carbs:35, fat:2, fiber:5,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:10,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['superfood','calcium-rich','gluten-free','diabetic-friendly','low-glycemic'],
      contraindications:[],
      healthScore:96,
      suitableFor:['diabetes','hypertension','weight-loss','thyroid','general','pregnancy'],
      ingredients:[
        {name:'Ragi Flour',qty:'3 tbsp',adjustable:true,type:'carb'},
        {name:'Milk/Water',qty:'1 cup',adjustable:true,type:'liquid'},
        {name:'Jaggery',qty:'1 tsp',adjustable:true,type:'sweet'},
        {name:'Cardamom',qty:'pinch',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'methi-paratha', name:'Methi Paratha', hindi:'मेथी पराठा', emoji:'🫓',
      desc:'Fenugreek-stuffed whole wheat flatbread',
      calories:280, protein:9, carbs:45, fat:9, fiber:5,
      glycemicIndex:'medium', sodium:'medium', spice:1, prepTime:25,
      isVeg:true, isVegan:false, isGlutenFree:false,
      healthTags:['blood-sugar-control','fiber-rich','iron-rich'],
      contraindications:['gluten'],
      healthScore:82,
      suitableFor:['diabetes','general','gym'],
      ingredients:[
        {name:'Whole Wheat Flour',qty:'2 cups',adjustable:false,type:'carb'},
        {name:'Fresh Methi',qty:'1 cup',adjustable:true,type:'herb'},
        {name:'Ghee',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Ajwain',qty:'¼ tsp',adjustable:true,type:'spice'},
        {name:'Red Chili',qty:'½ tsp',adjustable:true,type:'spice'},
        {name:'Salt',qty:'to taste',adjustable:true,type:'mineral'}
      ]
    },
    {
      id:'egg-omelette', name:'Masala Omelette', hindi:'मसाला ऑमलेट', emoji:'🍳',
      desc:'Spicy egg omelette with onions and tomatoes',
      calories:240, protein:18, carbs:6, fat:16, fiber:1,
      glycemicIndex:'low', sodium:'medium', spice:2, prepTime:8,
      isVeg:false, isVegan:false, isGlutenFree:true,
      healthTags:['high-protein','low-carb','keto-friendly','gym-friendly'],
      contraindications:['egg-allergy'],
      healthScore:87,
      suitableFor:['gym','weight-loss','diabetes','general'],
      ingredients:[
        {name:'Eggs',qty:'2 large',adjustable:true,type:'protein'},
        {name:'Onion',qty:'1 small',adjustable:true,type:'veg'},
        {name:'Tomato',qty:'½',adjustable:true,type:'veg'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'},
        {name:'Coriander',qty:'handful',adjustable:true,type:'herb'},
        {name:'Oil/Butter',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Black Pepper',qty:'pinch',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'fruit-bowl', name:'Seasonal Fruit Bowl', hindi:'फलों का कटोरा', emoji:'🍇',
      desc:'Fresh chopped seasonal fruits with chaat masala',
      calories:135, protein:2, carbs:32, fat:1, fiber:4,
      glycemicIndex:'low-medium', sodium:'low', spice:0, prepTime:5,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['antioxidant-rich','vitamin-rich','hydrating','light'],
      contraindications:[],
      healthScore:90,
      suitableFor:['general','weight-loss','pregnancy','hypertension'],
      ingredients:[
        {name:'Banana',qty:'½',adjustable:true,type:'fruit'},
        {name:'Apple',qty:'½',adjustable:true,type:'fruit'},
        {name:'Papaya',qty:'few chunks',adjustable:true,type:'fruit'},
        {name:'Pomegranate',qty:'2 tbsp',adjustable:true,type:'fruit'},
        {name:'Chaat Masala',qty:'pinch',adjustable:true,type:'spice'},
        {name:'Lemon',qty:'squeeze',adjustable:true,type:'flavor'}
      ]
    }
  ],

  lunch: [
    {
      id:'dal-tadka', name:'Dal Tadka', hindi:'दाल तड़का', emoji:'🍲',
      desc:'Yellow lentils with ghee tempering',
      calories:310, protein:18, carbs:48, fat:8, fiber:10,
      glycemicIndex:'low', sodium:'medium', spice:2, prepTime:30,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['high-protein','high-fiber','low-glycemic','iron-rich'],
      contraindications:[],
      healthScore:90,
      suitableFor:['diabetes','hypertension','general','gym'],
      ingredients:[
        {name:'Toor Dal',qty:'1 cup',adjustable:false,type:'protein'},
        {name:'Ghee',qty:'1 tbsp',adjustable:true,type:'fat'},
        {name:'Cumin',qty:'1 tsp',adjustable:false,type:'spice'},
        {name:'Onion',qty:'1 medium',adjustable:true,type:'veg'},
        {name:'Tomato',qty:'2 medium',adjustable:true,type:'veg'},
        {name:'Garlic',qty:'4 cloves',adjustable:true,type:'spice'},
        {name:'Ginger',qty:'1 inch',adjustable:true,type:'spice'},
        {name:'Turmeric',qty:'½ tsp',adjustable:false,type:'spice'},
        {name:'Red Chili',qty:'1 tsp',adjustable:true,type:'spice'},
        {name:'Coriander',qty:'handful',adjustable:true,type:'herb'}
      ]
    },
    {
      id:'palak-paneer', name:'Palak Paneer', hindi:'पालक पनीर', emoji:'🥬',
      desc:'Cottage cheese in creamy spinach gravy',
      calories:380, protein:22, carbs:18, fat:24, fiber:5,
      glycemicIndex:'low', sodium:'medium', spice:2, prepTime:35,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['high-protein','iron-rich','calcium-rich','low-carb'],
      contraindications:['lactose'],
      healthScore:85,
      suitableFor:['gym','general','hypertension'],
      ingredients:[
        {name:'Spinach',qty:'300g',adjustable:false,type:'veg'},
        {name:'Paneer',qty:'150g',adjustable:true,type:'protein'},
        {name:'Onion',qty:'2 medium',adjustable:true,type:'veg'},
        {name:'Tomato',qty:'2 medium',adjustable:true,type:'veg'},
        {name:'Cream',qty:'2 tbsp',adjustable:true,type:'fat'},
        {name:'Garlic',qty:'5 cloves',adjustable:true,type:'spice'},
        {name:'Ginger',qty:'1 inch',adjustable:true,type:'spice'},
        {name:'Garam Masala',qty:'½ tsp',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'rajma-chawal', name:'Rajma Chawal', hindi:'राजमा चावल', emoji:'🫘',
      desc:'Kidney beans in tomato gravy with steamed rice',
      calories:450, protein:20, carbs:72, fat:7, fiber:14,
      glycemicIndex:'medium', sodium:'medium', spice:2, prepTime:45,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['high-protein','high-fiber','plant-based'],
      contraindications:[],
      healthScore:82,
      suitableFor:['general','gym','vegan'],
      ingredients:[
        {name:'Kidney Beans',qty:'1 cup',adjustable:false,type:'protein'},
        {name:'Basmati Rice',qty:'¾ cup',adjustable:true,type:'carb'},
        {name:'Onion',qty:'2 large',adjustable:true,type:'veg'},
        {name:'Tomatoes',qty:'3 medium',adjustable:true,type:'veg'},
        {name:'Oil',qty:'2 tbsp',adjustable:true,type:'fat'},
        {name:'Rajma Masala',qty:'2 tsp',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'chicken-curry', name:'Chicken Curry', hindi:'चिकन करी', emoji:'🍗',
      desc:'Slow-cooked chicken in spiced onion-tomato gravy',
      calories:420, protein:38, carbs:14, fat:22, fiber:3,
      glycemicIndex:'low', sodium:'medium', spice:3, prepTime:40,
      isVeg:false, isVegan:false, isGlutenFree:true,
      healthTags:['high-protein','low-carb','gym-friendly'],
      contraindications:[],
      healthScore:84,
      suitableFor:['gym','general','diabetes'],
      ingredients:[
        {name:'Chicken',qty:'300g',adjustable:true,type:'protein'},
        {name:'Onion',qty:'2 large',adjustable:true,type:'veg'},
        {name:'Tomatoes',qty:'3 medium',adjustable:true,type:'veg'},
        {name:'Yogurt',qty:'3 tbsp',adjustable:true,type:'protein'},
        {name:'Oil',qty:'2 tbsp',adjustable:true,type:'fat'},
        {name:'Garam Masala',qty:'1 tsp',adjustable:true,type:'spice'},
        {name:'Turmeric',qty:'½ tsp',adjustable:false,type:'spice'}
      ]
    },
    {
      id:'veg-biryani', name:'Veg Biryani', hindi:'वेज बिरयानी', emoji:'🍚',
      desc:'Aromatic basmati rice with spiced vegetables',
      calories:480, protein:12, carbs:82, fat:12, fiber:6,
      glycemicIndex:'medium', sodium:'high', spice:3, prepTime:50,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['aromatic','festive','filling'],
      contraindications:['hypertension-caution'],
      healthScore:70,
      suitableFor:['general'],
      ingredients:[
        {name:'Basmati Rice',qty:'1.5 cups',adjustable:false,type:'carb'},
        {name:'Mixed Vegetables',qty:'2 cups',adjustable:true,type:'veg'},
        {name:'Fried Onions',qty:'¾ cup',adjustable:true,type:'veg'},
        {name:'Ghee',qty:'2 tbsp',adjustable:true,type:'fat'},
        {name:'Biryani Masala',qty:'2 tsp',adjustable:true,type:'spice'},
        {name:'Saffron',qty:'few strands',adjustable:true,type:'spice'},
        {name:'Yogurt',qty:'½ cup',adjustable:true,type:'protein'}
      ]
    },
    {
      id:'kadhi-chawal', name:'Kadhi Chawal', hindi:'कढ़ी चावल', emoji:'🍜',
      desc:'Yogurt & gram flour curry over steamed rice',
      calories:390, protein:12, carbs:68, fat:9, fiber:4,
      glycemicIndex:'medium', sodium:'medium', spice:2, prepTime:30,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['probiotic','easy-digest','comfort-food'],
      contraindications:['lactose'],
      healthScore:75,
      suitableFor:['general','thyroid'],
      ingredients:[
        {name:'Yogurt',qty:'1 cup',adjustable:true,type:'protein'},
        {name:'Gram Flour',qty:'3 tbsp',adjustable:false,type:'protein'},
        {name:'Rice',qty:'¾ cup',adjustable:true,type:'carb'},
        {name:'Mustard Seeds',qty:'½ tsp',adjustable:false,type:'spice'},
        {name:'Fenugreek Seeds',qty:'¼ tsp',adjustable:true,type:'spice'},
        {name:'Curry Leaves',qty:'8 leaves',adjustable:true,type:'herb'},
        {name:'Dried Red Chili',qty:'2',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'aloo-gobi', name:'Aloo Gobi', hindi:'आलू गोभी', emoji:'🥦',
      desc:'Potato & cauliflower stir fry with dry spices',
      calories:280, protein:7, carbs:48, fat:8, fiber:7,
      glycemicIndex:'medium', sodium:'low', spice:2, prepTime:25,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['fiber-rich','vitamin-C','low-sodium'],
      contraindications:[],
      healthScore:78,
      suitableFor:['general','hypertension'],
      ingredients:[
        {name:'Potato',qty:'2 medium',adjustable:true,type:'carb'},
        {name:'Cauliflower',qty:'½ head',adjustable:true,type:'veg'},
        {name:'Oil',qty:'1.5 tbsp',adjustable:true,type:'fat'},
        {name:'Cumin',qty:'1 tsp',adjustable:false,type:'spice'},
        {name:'Turmeric',qty:'½ tsp',adjustable:false,type:'spice'},
        {name:'Coriander Powder',qty:'1 tsp',adjustable:true,type:'spice'},
        {name:'Amchur',qty:'½ tsp',adjustable:true,type:'spice'}
      ]
    }
  ],

  dinner: [
    {
      id:'khichdi', name:'Khichdi', hindi:'खिचड़ी', emoji:'🍲',
      desc:'Comforting rice & lentil one-pot meal',
      calories:320, protein:14, carbs:55, fat:6, fiber:8,
      glycemicIndex:'low-medium', sodium:'low', spice:1, prepTime:25,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['easy-digest','balanced','comfort-food','anti-inflammatory'],
      contraindications:[],
      healthScore:91,
      suitableFor:['diabetes','hypertension','thyroid','weight-loss','general','pregnancy'],
      ingredients:[
        {name:'Rice',qty:'½ cup',adjustable:true,type:'carb'},
        {name:'Yellow Moong Dal',qty:'¼ cup',adjustable:true,type:'protein'},
        {name:'Ghee',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Cumin',qty:'1 tsp',adjustable:false,type:'spice'},
        {name:'Turmeric',qty:'¼ tsp',adjustable:false,type:'spice'},
        {name:'Ginger',qty:'½ inch',adjustable:true,type:'spice'},
        {name:'Salt',qty:'to taste',adjustable:true,type:'mineral'}
      ]
    },
    {
      id:'veg-stew', name:'Vegetable Stew + Chapati', hindi:'सब्जी स्टू', emoji:'🥘',
      desc:'Light coconut milk vegetable stew with whole wheat roti',
      calories:360, protein:10, carbs:58, fat:10, fiber:9,
      glycemicIndex:'low', sodium:'low', spice:1, prepTime:30,
      isVeg:true, isVegan:true, isGlutenFree:false,
      healthTags:['light-dinner','anti-inflammatory','low-sodium'],
      contraindications:['gluten'],
      healthScore:88,
      suitableFor:['hypertension','general','weight-loss','thyroid'],
      ingredients:[
        {name:'Mixed Vegetables',qty:'2 cups',adjustable:true,type:'veg'},
        {name:'Coconut Milk',qty:'½ cup',adjustable:true,type:'fat'},
        {name:'Whole Wheat Flour',qty:'1 cup',adjustable:true,type:'carb'},
        {name:'Ginger',qty:'1 inch',adjustable:true,type:'spice'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'},
        {name:'Curry Leaves',qty:'8',adjustable:true,type:'herb'}
      ]
    },
    {
      id:'grilled-paneer', name:'Grilled Paneer + Salad', hindi:'ग्रिल्ड पनीर', emoji:'🧀',
      desc:'Marinated cottage cheese grilled with bell peppers',
      calories:340, protein:28, carbs:10, fat:20, fiber:4,
      glycemicIndex:'low', sodium:'medium', spice:2, prepTime:25,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['high-protein','low-carb','keto-friendly','gym-dinner'],
      contraindications:['lactose'],
      healthScore:89,
      suitableFor:['gym','diabetes','weight-loss','general'],
      ingredients:[
        {name:'Paneer',qty:'200g',adjustable:true,type:'protein'},
        {name:'Bell Peppers',qty:'2 cups',adjustable:true,type:'veg'},
        {name:'Yogurt',qty:'3 tbsp',adjustable:true,type:'marinade'},
        {name:'Tikka Masala',qty:'2 tsp',adjustable:true,type:'spice'},
        {name:'Olive Oil',qty:'1 tsp',adjustable:true,type:'fat'},
        {name:'Lemon',qty:'½',adjustable:true,type:'flavor'}
      ]
    },
    {
      id:'palak-soup', name:'Palak Soup + Roti', hindi:'पालक सूप', emoji:'🥣',
      desc:'Cream of spinach soup with buttered whole wheat roti',
      calories:260, protein:9, carbs:38, fat:8, fiber:7,
      glycemicIndex:'low', sodium:'medium', spice:1, prepTime:20,
      isVeg:true, isVegan:false, isGlutenFree:false,
      healthTags:['iron-rich','light-dinner','low-calorie','detox'],
      contraindications:['gluten','lactose'],
      healthScore:86,
      suitableFor:['weight-loss','hypertension','general'],
      ingredients:[
        {name:'Spinach',qty:'250g',adjustable:false,type:'veg'},
        {name:'Onion',qty:'1 small',adjustable:true,type:'veg'},
        {name:'Garlic',qty:'3 cloves',adjustable:true,type:'spice'},
        {name:'Cream',qty:'1 tbsp',adjustable:true,type:'fat'},
        {name:'Whole Wheat Flour',qty:'1 cup for roti',adjustable:true,type:'carb'},
        {name:'Black Pepper',qty:'½ tsp',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'chicken-tikka', name:'Chicken Tikka + Salad', hindi:'चिकन टिक्का', emoji:'🍢',
      desc:'Tandoor-style marinated chicken with green salad',
      calories:380, protein:45, carbs:8, fat:18, fiber:3,
      glycemicIndex:'low', sodium:'medium', spice:3, prepTime:40,
      isVeg:false, isVegan:false, isGlutenFree:true,
      healthTags:['very-high-protein','low-carb','gym-dinner','keto'],
      contraindications:[],
      healthScore:90,
      suitableFor:['gym','weight-loss','diabetes','general'],
      ingredients:[
        {name:'Chicken Breast',qty:'300g',adjustable:true,type:'protein'},
        {name:'Yogurt',qty:'4 tbsp',adjustable:false,type:'marinade'},
        {name:'Tikka Masala',qty:'2 tsp',adjustable:true,type:'spice'},
        {name:'Lemon Juice',qty:'2 tbsp',adjustable:true,type:'flavor'},
        {name:'Ginger Garlic Paste',qty:'1 tbsp',adjustable:true,type:'spice'},
        {name:'Oil',qty:'1 tsp',adjustable:true,type:'fat'}
      ]
    },
    {
      id:'mushroom-masala', name:'Mushroom Masala + Brown Rice', hindi:'मशरूम मसाला', emoji:'🍄',
      desc:'Spiced mushroom curry with fiber-rich brown rice',
      calories:350, protein:14, carbs:52, fat:10, fiber:8,
      glycemicIndex:'low', sodium:'medium', spice:2, prepTime:30,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['umami','high-fiber','diabetic-friendly','vegan'],
      contraindications:[],
      healthScore:88,
      suitableFor:['diabetes','general','vegan','weight-loss'],
      ingredients:[
        {name:'Button Mushrooms',qty:'250g',adjustable:true,type:'protein'},
        {name:'Brown Rice',qty:'½ cup',adjustable:true,type:'carb'},
        {name:'Onion',qty:'2 medium',adjustable:true,type:'veg'},
        {name:'Tomato',qty:'2 medium',adjustable:true,type:'veg'},
        {name:'Cashew Paste',qty:'1 tbsp',adjustable:true,type:'fat'},
        {name:'Mushroom/Coriander Masala',qty:'2 tsp',adjustable:true,type:'spice'}
      ]
    }
  ],

  snacks: [
    {
      id:'makhana', name:'Roasted Makhana', hindi:'मखाना', emoji:'🫙',
      desc:'Air-popped fox nuts roasted with spices',
      calories:100, protein:4, carbs:20, fat:1, fiber:2,
      glycemicIndex:'low', sodium:'low', spice:1, prepTime:5,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['low-calorie','crunchy','diabetic-friendly','antioxidant'],
      contraindications:[],
      healthScore:97,
      suitableFor:['diabetes','hypertension','weight-loss','general','pregnancy'],
      ingredients:[
        {name:'Fox Nuts',qty:'30g',adjustable:false,type:'carb'},
        {name:'Ghee',qty:'¼ tsp',adjustable:true,type:'fat'},
        {name:'Rock Salt',qty:'pinch',adjustable:true,type:'mineral'},
        {name:'Black Pepper',qty:'pinch',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'sprouts-chaat', name:'Sprouts Chaat', hindi:'स्प्राउट्स चाट', emoji:'🥗',
      desc:'Mixed bean sprouts with tangy chaat masala',
      calories:140, protein:10, carbs:24, fat:2, fiber:7,
      glycemicIndex:'low', sodium:'low', spice:2, prepTime:10,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['high-protein','high-fiber','low-calorie','enzyme-rich','detox'],
      contraindications:[],
      healthScore:96,
      suitableFor:['diabetes','weight-loss','gym','general'],
      ingredients:[
        {name:'Mixed Sprouts',qty:'100g',adjustable:false,type:'protein'},
        {name:'Onion',qty:'1 small',adjustable:true,type:'veg'},
        {name:'Tomato',qty:'½',adjustable:true,type:'veg'},
        {name:'Chaat Masala',qty:'½ tsp',adjustable:true,type:'spice'},
        {name:'Lemon',qty:'1 tbsp',adjustable:true,type:'flavor'},
        {name:'Green Chili',qty:'1',adjustable:true,type:'spice'}
      ]
    },
    {
      id:'roasted-chana', name:'Roasted Chana', hindi:'भुना चना', emoji:'🟤',
      desc:'Dry roasted chickpeas — protein powerhouse snack',
      calories:120, protein:8, carbs:18, fat:3, fiber:6,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:1,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['high-protein','high-fiber','low-cost','portable'],
      contraindications:[],
      healthScore:94,
      suitableFor:['diabetes','hypertension','gym','weight-loss','general'],
      ingredients:[
        {name:'Roasted Chickpeas',qty:'30g',adjustable:true,type:'protein'}
      ]
    },
    {
      id:'yogurt-bowl', name:'Yogurt & Fruits Bowl', hindi:'दही फल कटोरा', emoji:'🫙',
      desc:'Hung curd with seasonal fruits and honey',
      calories:160, protein:9, carbs:24, fat:4, fiber:3,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:5,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['probiotic','calcium-rich','gut-health'],
      contraindications:['lactose'],
      healthScore:89,
      suitableFor:['general','hypertension','weight-loss'],
      ingredients:[
        {name:'Low-fat Yogurt',qty:'150g',adjustable:true,type:'protein'},
        {name:'Seasonal Fruits',qty:'½ cup',adjustable:true,type:'fruit'},
        {name:'Honey',qty:'1 tsp',adjustable:true,type:'sweet'},
        {name:'Chia Seeds',qty:'1 tsp',adjustable:true,type:'fiber'}
      ]
    }
  ],

  beverages: [
    {
      id:'masala-chai', name:'Masala Chai', hindi:'मसाला चाय', emoji:'☕',
      desc:'Classic Indian spiced milk tea',
      calories:80, protein:3, carbs:12, fat:3, fiber:0,
      glycemicIndex:'medium', sodium:'low', spice:1, prepTime:5,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['warming','antioxidant','digestive','energising'],
      contraindications:['lactose','caffeine-sensitive'],
      healthScore:75,
      suitableFor:['general'],
      customizable: true,
      customOptions:{
        sugar:{min:0,max:4,default:2,unit:'tsp',diabeticMax:0.5},
        chaiPatti:{options:['light','medium','kadak'],default:'medium'},
        milk:{options:['no milk','light','regular','extra'],default:'regular'},
        ginger:{options:['none','pinch','light','strong'],default:'light'},
        addons:['cardamom','cinnamon','tulsi','black pepper','fennel','masala'],
        milkType:['regular milk','skim milk','oat milk','almond milk','soy milk']
      }
    },
    {
      id:'green-tea', name:'Green Tea', hindi:'ग्रीन टी', emoji:'🍵',
      desc:'Antioxidant-rich green tea, plain or with honey',
      calories:5, protein:0, carbs:1, fat:0, fiber:0,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:3,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['antioxidant','fat-burning','diabetes-friendly','zero-fat'],
      contraindications:['caffeine-sensitive'],
      healthScore:96,
      suitableFor:['diabetes','hypertension','weight-loss','general'],
      customizable:true,
      customOptions:{
        sweetener:{options:['none','honey','stevia','jaggery'],default:'none'},
        type:{options:['plain','lemon','mint','ginger','tulsi'],default:'plain'},
        strength:{options:['light','medium','strong'],default:'medium'}
      }
    },
    {
      id:'buttermilk', name:'Masala Chaas', hindi:'मसाला छाछ', emoji:'🥛',
      desc:'Spiced buttermilk with cumin and mint',
      calories:60, protein:4, carbs:8, fat:2, fiber:0,
      glycemicIndex:'low', sodium:'medium', spice:1, prepTime:3,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['probiotic','cooling','digestive','summer-drink','calcium-rich'],
      contraindications:['lactose'],
      healthScore:88,
      suitableFor:['diabetes','general','hypertension'],
      customizable:true,
      customOptions:{
        salt:{options:['no salt','light','regular'],default:'light'},
        addons:['mint','roasted cumin','ginger','curry leaves','chili'],
        type:['plain','spiced','mint','ginger','jeera']
      }
    },
    {
      id:'golden-milk', name:'Golden Milk (Haldi Doodh)', hindi:'हल्दी दूध', emoji:'🌟',
      desc:'Turmeric milk with anti-inflammatory spices',
      calories:110, protein:6, carbs:12, fat:4, fiber:0,
      glycemicIndex:'low', sodium:'low', spice:1, prepTime:5,
      isVeg:true, isVegan:false, isGlutenFree:true,
      healthTags:['anti-inflammatory','immunity-boost','bedtime-drink','healing'],
      contraindications:['lactose'],
      healthScore:92,
      suitableFor:['hypertension','diabetes','general','post-workout','pregnancy'],
      customizable:true,
      customOptions:{
        turmeric:{min:0.25,max:1,default:0.5,unit:'tsp'},
        sweetener:{options:['none','honey','jaggery','stevia'],default:'honey'},
        addons:['black pepper','cardamom','cinnamon','ashwagandha','nutmeg'],
        milkType:['regular','skim','oat','almond']
      }
    },
    {
      id:'coconut-water', name:'Fresh Coconut Water', hindi:'नारियल पानी', emoji:'🥥',
      desc:'Natural electrolyte drink, rich in potassium',
      calories:45, protein:2, carbs:9, fat:0, fiber:0,
      glycemicIndex:'low', sodium:'low', spice:0, prepTime:1,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['electrolyte','hydrating','potassium-rich','natural-energy'],
      contraindications:[],
      healthScore:98,
      suitableFor:['hypertension','diabetes','general','post-workout','pregnancy'],
      customizable:false
    },
    {
      id:'aam-panna', name:'Aam Panna', hindi:'आम पन्ना', emoji:'🥭',
      desc:'Raw mango cooling drink with black salt',
      calories:70, protein:0, carbs:17, fat:0, fiber:1,
      glycemicIndex:'medium', sodium:'medium', spice:1, prepTime:10,
      isVeg:true, isVegan:true, isGlutenFree:true,
      healthTags:['cooling','digestive','summer-drink','heat-stroke-prevention'],
      contraindications:[],
      healthScore:80,
      suitableFor:['general','hypertension'],
      customizable:true,
      customOptions:{
        sugar:{min:0,max:3,default:1,unit:'tsp'},
        addons:['mint','cumin','black salt','cardamom']
      }
    }
  ]
};

// Flat list for search
const ALL_FOODS = [
  ...MEAL_DATA.breakfast,
  ...MEAL_DATA.lunch,
  ...MEAL_DATA.dinner,
  ...MEAL_DATA.snacks,
  ...MEAL_DATA.beverages
].map(f => ({...f, category: Object.keys(MEAL_DATA).find(k => MEAL_DATA[k].find(i => i.id === f.id))}));

// Health conditions metadata
const HEALTH_CONDITIONS = {
  diabetes: { label:'Diabetes', icon:'🩸', avoidTags:['high-glycemic','sugary'], preferTags:['low-glycemic','diabetic-friendly','high-fiber'], sodiumCap:'medium' },
  hypertension: { label:'Hypertension', icon:'❤️', avoidTags:['hypertension-caution'], preferTags:['low-sodium','potassium-rich'], sodiumCap:'low' },
  thyroid: { label:'Thyroid', icon:'🦋', avoidTags:['goitrogenic-raw'], preferTags:['iodine-rich','selenium-rich'], sodiumCap:'medium' },
  'weight-loss': { label:'Weight Loss', icon:'⚖️', calorieCap:400, preferTags:['low-calorie','high-fiber','high-protein'], avoidTags:['heavy','fried'] },
  gym: { label:'Active / Gym', icon:'🏋️', preferTags:['high-protein','gym-friendly','post-workout'], proteinMin:20 },
  lactoseIntolerant: { label:'Lactose Intolerant', icon:'🥛', avoidContra:['lactose'] },
  glutenFree: { label:'Gluten Free', icon:'🌾', avoidContra:['gluten'] },
  vegan: { label:'Vegan', icon:'🌱', requireVegan:true },
  pregnancy: { label:'Pregnancy', icon:'🤰', preferTags:['iron-rich','calcium-rich','folic-acid'], avoidTags:['raw-sprouts'], spiceCap:2 }
};

if (typeof module !== 'undefined') module.exports = { MEAL_DATA, ALL_FOODS, HEALTH_CONDITIONS };
