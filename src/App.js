import React, { Component,unstable_Profiler as Profiler } from "react";
import { connect } from "react-redux";
import {
  calculate,
  deleteLastEntry,
  clear,
  evaluateExpression,
  square,
  squareRoot
} from "./store/actions/calculate";
import Calculator from "./components/calculator";
import * as fromCalculator from "./store";
import "./App.css";

export class App extends Component {
  componentDidMount() {
    console.log("mounted calculator!");
  }
  
  logProfile = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    console.log(`${id}'s ${phase} phase:`);
    console.log(`Actual time: ${actualTime}`);
    console.log(`Base time: ${baseTime}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
}
  render() {
    return (
      
        <Profiler id="app" onRender={this.logProfile}>
          <div className="calculator--container">
            <Calculator.Screen {...this.props} />
            <Calculator.Keypad {...this.props} />
          </div>
        </Profiler>
    );
  }
}

const mapStateToProps = state => {
  return {
    expression: fromCalculator.getExpression(state),
    total: fromCalculator.getTotal(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculate: buttonKey => {
      dispatch(calculate(buttonKey));
    },
    delete: () => {
      dispatch(deleteLastEntry());
    },
    clear: () => {
      dispatch(clear());
    },
    evaluate: () => {
      dispatch(evaluateExpression());
    },
    square: () => {
      dispatch(square());
    },
    squareRoot: () => {
      dispatch(squareRoot());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
