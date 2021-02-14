// YourComponent.stories.js

import React from 'react'
import MealTable from 'modules/cals-and-macros/table/MealTable/MealTable'

// This default export determines where your story goes in the story list
export default {
  title: 'MealTable',
  component: MealTable,
};

const Template = (args) => <MealTable {...args} />

export const Width50 = Template.bind({});
export const Width100 = Template.bind({});

const foodListOneItem = [
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
      ]

Width50.args = {
  foodList: foodListOneItem,
  width: '50%'
}

Width100.args = {
  foodList: foodListOneItem,
  width: '100%'
}