import React, { Component } from 'react';
import { connect } from 'react-redux'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import '../App.css';

class App extends Component {

  render() {
    //console.table(this.props)
    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>

        <ul className='meal-types'>
          {mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

      </div>
)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: (recObj) => dispatch(addRecipe(recObj)),
    remove: (recObj) => dispatch(removeFromCalendar(recObj))
  }
}

function mapStateToProps({ food, calendar }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  console.log(Object.keys(calendar[dayOrder[0]]))
  return {
    //calendar is so far an array of objects {day, meals}
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]] // if calendar for day>meal exists assign it
          : null

        return meals
      }, {})
    })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//Object.keys(calendar[day]) => [breakfast, lunch, dinner]
//goal is [{day, meals: {breakfast, lunch, dinner}}, {day, meals}, {}...]
//the pattern was that in redux store data is usually in form of an object
//but to use the data in react, usually need to convert that format to an array
//probably want to create a helper function that can automate that?