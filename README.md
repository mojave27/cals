# wolog-ui

This version of the project stores all the program content in a single, program object.  Example:

```json
{
    "name": "Natties Test",
    "description": "this will be the nattie program",
    "id": "1",
    "workouts": [{
        "name": "W1",
        "description": "n/a",
        "id": 0,
        "sets": [{
            "id": 10,
            "exercises": [{
                "id": 3,
                "reps": ""
            }]
        }],
        "days": [{
            "id": 0,
            "date": "1/1/20",
            "sets": [{
                "id": 10,
                "exercises": [{
                    "id": 3,
                    "weight": "25",
                    "actualReps": "12, 10, 10"
                }]
            }]
        }]
    }]
}
```

## TODO: