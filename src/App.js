// import logo from './logo.svg';
import './App.css';
import Greet from './Components/Greet'
import Welcome from './Components/Welcome'
import Hello from './Components/Hello';
import HelloMessage from './Components/HelloMessage'; 
import Class from './Components/Class';
import Student from './Components/Student';
import Employee from './Components/Employee';
import Customer from './Components/Customer';
import DoubleClick from './Components/DoubleClick';
import Click from './Components/Click';
import EventBind from './Components/EventBind';
import ParentComponent from './Components/ParentComponent'
import Component1 from './Components/Component1';
import Component2 from './Components/Component2';
import StudentList from './Components/StudentList';
import StyleComponent from './Components/StyleComponent';
import StyleComponent1 from './Components/StyleComponent1';
import StyleComponent2 from './Components/StyleComponent2';
import Bootstrap from './Components/Bootstrap';
import USComponent from './Components/USComponent';
import USObject from './Components/USObject';
import USArray from './Components/USArray';
import ClassState from './Components/ClassState';
import FunctionState from './Components/FunctionState';
import FunctionEffect from './Components/FunctionEffect'
import CompA from './Components/CompA';
import { createContext } from 'react';
import Control from './Components/Control';
import ControlFunction from './Components/ControlFunction';
import MultipleInputs from './Components/MultipleInputs';
import FunctionInputs from './Components/FunctionInputs';
import Checkbox from './Components/Checkbox';
import MultipleCheckboxes from './Components/MultipleCheckboxes';
import ArrayInsideObject from './Components/ArrayInsideObject';
import ArrayInsideObjectTuteDudeHelp from './Components/ArrayInsideObjectTuteDudeHelp';
import ArrayInsideComplexObject from './Components/ArrayInsideComplexObject';
import RefComponent from './Components/RefComponent';
import RefComponentUncontrolled from './Components/RefComponentUncontrolled';
import FunctionUseRef from './Components/FunctionUseRef';
import FunctionUseRefHook from './Components/FunctionUseRefHook';

let a  =  "Variable value"

export const NameContext = createContext()

function App() {
  return (
    <div className="App">
      <NameContext.Provider value={{ name :'Gujju', name2  : "Steve" }}>
      <Class/>
      </NameContext.Provider>
    </div>
  );

  //1. if else conditional rendering
  // const name = "1"
  // if(name=="1"){
  //   return <div className='App-logo App-header'><Component1/></div>
  // }
  // else{
  //   return <div className='App-header'><Component2/></div>
  // }

  //2. && rendering
  // return (
  //   <div className="App">
  //     {name=="1"  && <Component1/>}
  //     {name=="2"  && <Component2/>}
  //     {(name!=1 && name !=2)  && <><h1>No option hence displaying both components</h1><Component2/><Component1/></>}
  //   </div>
  // );

  //3. Ternary Rendering
  // const age = 18;
  // return(
  //   <div className='App-header'>
  //     {age>=18 ? <h1>You can vote !</h1> : <h1>Sorry you still a kid , cant vote !</h1>}
  //   </div>
  // )
}

export default App;
