# wolog-ui

## Ad Hoc daily workouts
Define your workout as you go.  Just start a new day, add the exercises and targets you want for that day, and start lifting!


## Follow a program
Choose a program to follow.  The app will take you through the program, day by day.  You can alter and tweak each day of the program as you like.

There are predefined program templates, or you can create/enter your own program.


## Reporting and Stats
View graphs and reports for the following items:
* weight over time
* progression for specific exercises, workouts, and programs
* energy and sleep quality, and how those may affect your workout progression

## Example Data

### Program
```json
{
  "workoutIds": ["9"],
  "workouts": [{
    "sets": [{
      "exerciseGroups": [{
        "exercises": [],
        "id": 0
      }],
      "id": 0
    }],
    "exerciseGroups": [{
      "exercises": [{
        "name": "leg-ext",
        "reps": "5x10",
        "id": 16,
        "type": "isolation"
      }, {
        "name": "lat raise",
        "reps": "5x10",
        "id": 2,
        "type": "isolation"
      }],
      "id": 0
    }, {
      "exercises": [{
        "name": "leg curl",
        "reps": "5x10",
        "id": 10,
        "type": "isolation"
      }, {
        "name": "shrugs",
        "reps": "5x10",
        "id": 12,
        "type": "isolation"
      }],
      "id": 1
    }],
    "description": " legs, shoulders",
    "id": "9",
    "name": "5x10 L2"
  }],
  "schedule": {
    "days": [{
      "id": 0,
      "name": "day one",
      "routine": {
        "cardio": {},
        "workouts": ["9"]
      }
    }]
  },
  "description": "DELETE_THIS",
  "id": "c0f13720-3d94-11eb-875e-9d465872d1b0",
  "name": "DELETE_ME"
}
```