import { combineReducers } from 'redux'
import { ADD_RECIPE, REMOVE_FROM_CALENDAR} from '../actions'

const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}

// added this reducer later, one action will cause 2 reducers to update
// food and calendar
function food(state = {}, action) {
  switch(action.type) {
    case ADD_RECIPE:
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,

      }
    default :
      return state
  }

}

function calendar(state = initialCalendarState, action) {
  const { day, recipe, meal } = action

  switch(action.type) {
    case ADD_RECIPE:
      return {
        ...state, // allow shallow update for only cur day
        [day]: {
          ...state[day], // shallow update for only cur meal
          [meal]: recipe.label
        }
      }
    case REMOVE_FROM_CALENDAR:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  food,
  calendar
})
