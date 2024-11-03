# Nosql database

```mongodb

Collections : 

1.  Recipes  doc -> (id, name , category, ingredients, steps)

2.  Categories  doc->(id, name)


- What made you decide when to embed information? What assumptions did you make?

I thought of as keeping each recipe together with all its related data as they are usually accessed together. For example, in the case of recipes, the ingredients and steps are always going to be used together, so it makes sense to embed them in the recipe document. I assumed that the ingredients and steps for a recipe would not be used independently of the recipe itself. I created categories as a separate collection because they are used across multiple recipes and can be queried independently.

- If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you
  choose and why?
  Mongodb makes more sense for the recipes example because usually each recipe, its ingredients and steps are needed together.  


Collection categories
{
 [
    {
        _id: 1,
        name: "Main Course"
    },
    {
        _id: 2,
        name: "Appetizer"
    },
    {
        _id: 3,
        name: "Dessert"
    },
    {
        _id: 4,
        name: "Afghan"
    },
    {
        _id: 5,
        name: "Indian"
    },
 ]
}






collection recipes {
[


    {
    _id: 23456789,
    name: "Mantu",
    category: [2,4],
    ingredients: [
        "All purpose flour",
        "Baking powder",
        "Baking Soda",
        "black pepper",
        "water",
        "ground beef",
        "onion",
        "vegetable oil",
        "yogurt",
        "salt",
        "garlic",
        "mint"
    ],
    steps: [
        {
            stepNumber: 1,
            description: "Mix flour, water, and salt in a bowl."
        },
        {
            stepNumber: 2,
            description: "Knead the dough until smooth."
        },
        {
            stepNumber: 3,
            description: "Cover the dough with a damp cloth and let it rest for 30 minutes."
        },
        {
            stepNumber: 4,
            description: "Mix ground beef, onion, salt, black pepper, and garlic in a bowl."
        },
        {
            stepNumber: 5,
            description: "Roll out the dough and cut it into small circles."
        },
        {
            stepNumber: 6,
            description: "Place a small amount of the beef mixture in the center of each circle."
        },
        {
            stepNumber: 7,
            description: "Fold the dough over the filling and pinch the edges to seal."
        },
        {
            stepNumber: 8,
            description: "Mix yogurt, garlic, and mint in a bowl."
        },
        {
            stepNumber: 9,
            description: "Steam the mantu for 30 minutes."
        },
        {
            stepNumber: 10,
            description: "Serve the mantu with yogurt."
        }

         ]
  },
  {
    _id: 23456790,
    name: "Biryani",
    category: [1,5],
    ingredients: [
        "Basmati rice",
        "Chicken",
        "Onion",
        "Tomato",
        "Ginger",
        "Garlic",
        "Green chili",
        "Yogurt",
        "Mint",
        "Cilantro",
        "Ghee",
        "Cumin",
        "Coriander",
        "Turmeric",
        "Red chili powder",
        "Salt",
        "Water"
    ],
    steps: [
        {
            stepNumber: 1,
            description: "Soak the rice in water for 30 minutes."
        },
        {
            stepNumber: 2,
            description: "Heat ghee in a pan and add cumin, coriander, turmeric, red chili powder, and salt."
        },
        {
            stepNumber: 3,
            description: "Add onion, ginger, garlic, and green chili to the pan."
        },
        {
            stepNumber: 4,
            description: "Add chicken, tomato, yogurt, mint, and cilantro to the pan."
        },
        {
            stepNumber: 5,
            description: "Cook the chicken until tender."
        },
        {
            stepNumber: 6,
            description: "Drain the rice and add it to the pan."
        },
        {
            stepNumber: 7,
            description: "Add water to the pan and cook until the rice is done."
        },
        {
            stepNumber: 8,
            description: "Serve the biryani hot."
        }
    ]
  },

  { _id: 23456608767,
  name : "Cake",
  category: [3],
  ingredients: [
    "All purpose flour",
    "Baking powder",
    "Baking Soda",
    "Butter",
    "Sugar",
    "Eggs",
    "Vanilla extract",
    "Milk"
  ],
  steps: [
    {
      stepNumber: 1,
      description: "Preheat the oven to 350°F."
    },
    {
      stepNumber: 2,
      description: "Grease and flour a cake pan."
    },
    {
      stepNumber: 3,
      description: "Mix flour, baking powder, and baking soda in a bowl."
    },
    {
      stepNumber: 4,
      description: "Cream butter and sugar in a separate bowl."
    },
    {
      stepNumber: 5,
      description: "Add eggs and vanilla extract to the butter mixture."
    },
    {
      stepNumber: 6,
      description: "Alternate adding the flour mixture and milk to the butter mixture."
    },
    {
      stepNumber: 7,
      description: "Pour the batter into the cake pan."
    },
    {
      stepNumber: 8,
      description: "Bake the cake for 30-40 minutes."
    },
    {
      stepNumber: 9,
      description: "Let the cake cool before serving."
    }
  ]}


 ] }







```
