import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'

import '../App.css';

class App extends Component {

  testActions() {
    this.props.boundAddRecipe()
    this.props.boundRemoveFromCalendar()
  }

  render() {
    console.log('this.props: ' + this.props)
    console.table(this.props)
    console.log('key this.props: ' + Object.keys(this.props))
    console.log('this.props.calendar: ' + this.props.calendar)
    console.log('this.props.calendar[0]: ' + this.props.calendar[0])
    console.log('keys this.props.calendar[0]: ' + Object.keys(this.props.calendar[0]))
    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    boundAddRecipe: (recObj) => dispatch(addRecipe(recObj)),
    boundRemoveFromCalendar: (recObj) => dispatch(removeFromCalendar(recObj))
  }
}

function mapStateToProps(calendar) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  console.log(Object.keys(calendar[dayOrder[0]]))
  return {
    //calendar is so far an array of objects {day, meals}
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal] // if calendar for day>meal exists assign it
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