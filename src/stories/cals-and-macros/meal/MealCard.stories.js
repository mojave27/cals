// YourComponent.stories.js

import React from 'react'
import MealMiniCard from 'modules/cals-and-macros/meal/MealMiniCard'

// This default export determines where your story goes in the story list
export default {
  title: 'Cals-And-Macros/MealMiniCard',
  component: MealMiniCard,
};

const Template = (args) => <MealMiniCard {...args} />

export const OneFoodItem = Template.bind({});
export const Empty = Template.bind({});

const DEFAULT_ARGS = {
  selected: false,
  width: '750px',
  deleteItem: () => {},
  editItem: () => {},
  onClick: () => {},
}

const item1 = {
      "foodList": [
        {
          "active": false,
          "id": 5,
          "quantity": "100",
          "unit": "grams",
          "calories": "165",
          "proteinGrams": "31",
          "carbGrams": "0",
          "fatGrams": "3.5",
          "description": "chicken"
        }
      ],
      "name": "test1",
      "id": 1
  }

OneFoodItem.args = {
  item: item1,
  ...DEFAULT_ARGS
}
Empty.args = {
  item: {},
  ...DEFAULT_ARGS
}
