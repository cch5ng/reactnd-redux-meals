import React, { Component } from 'react';
import logo from '../logo.svg';
import { addRecipe } from '../actions'
import '../App.css';

class App extends Component {

  state = {
    calendar: null
  }

  componentDidMount() {
    const { store } = this.props
    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  submitFood = () => {
    console.log('clicked btn')
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      recipe: {
        label: this.input.value
      },
      meal: 'breakfast'
    }))

    // clear input after start store update
    this.input.value = ''
  }

  render() {
    return (
      <div className="App">
        <input
            type='text'
            ref={(input) => this.input = input}
            placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
            Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App;
