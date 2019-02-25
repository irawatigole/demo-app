// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";


const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
//const Users = () => <h2>Users</h2>;
// const Back = () => <h2>Back</h2>

const AppRouter = () => (

  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>     
        </ul>
      </nav>
      <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Redirect from='/users' to='/users/:id'/>
      <Route path="/users/:id" component={Users}/>
      </Switch>
    </div>  
  </Router>
  
);

class Users extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          users: [],
          isLoaded: false,
          todos: []
      }
  }

  componentDidMount() {
      setTimeout(() => {
          fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
              return response.json();
            }).then((users) => { this.setState({ users,isLoaded: true }) 
          })
      }, 3000);
    //   fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {
    //     return response.json();
    // }).then((todos) => { this.setState({todos}) })
  }

  ChildUser({match}){
    let index = this.state.users.findIndex(user => user.id === parseInt(match.params.id));
    return (
      <div>
        <p><b>{this.state.users[index].name}</b></p>
      <table border="2">
           <tbody>
              <tr> <th>Details</th><th>Value</th></tr>   
              <tr> <th>id</th><td>{this.state.users[index].id}</td> </tr> 
              <tr> <th>username</th><td> {this.state.users[index].username}</td> </tr> 
              <tr> <th>email</th><td>{this.state.users[index].email}</td> </tr> 
              <tr> <th>address</th><td>{this.state.users[index].address.street}-{this.state.users[index].address.suite}-{this.state.users[index].address.city}-{this.state.users[index].address.zipcode}</td> </tr> 
              <tr> <th>geo</th><td>{this.state.users[index].address.geo.lat} {this.state.users[index].address.geo.lng}</td> </tr> 
              <tr> <th>phone</th><td>{this.state.users[index].phone}</td> </tr>  
              <tr> <th>website</th><td> {this.state.users[index].website}</td> </tr>           
           </tbody>  
      </table>

      {/* <table>
          <tbody>
            <tr><th>Title</th></tr>
            <tr><th>Status</th></tr>
            <tr><th>{this.state.todos[index]}</th></tr>
          </tbody>
        </table> */}
      </div>
    // <p>{this.state.users[index].address.street}</p>
    // <p> {JSON.stringify({...this.state.users[index]})} </p>
    )
  }
  usersList(){
      return (
          <ul>
               { this.state.users.map((user,index) => <li key={index}> <Link to={`/users/${user.id}`}>{user.name}</Link> </li>)} 
               <Route path="/users/:id" component={this.ChildUser.bind(this)}/>                                  
          </ul>
      )
  }

  render(){
      return (
          <div>
              <h2>Listing Users - {this.state.users.length}</h2>
              {this.state.isLoaded ? this.usersList() : <img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" />}
              <p><Link to="/users">Back</Link> </p>
              
          </div>
      )
  }
}
export default AppRouter;

// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const App = () => (
//   <Router>
//     <div>
//       <Header />
//       <Route exact path="/" component={Home} />
//       <Route path="/about" component={About} />
//       <Route path="/topics" component={Topics} />
//     </div>
//   </Router>
// );

// const Home = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>

//     <ul>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.path}/:id`} component={Topic} />
//     <Route
//       exact
//       path={match.path}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );
// const Header = () => (
//   <ul>
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/about">About</Link>
//     </li>
//     <li>
//       <Link to="/topics">Topics</Link>
//     </li>
//   </ul>
// );

// export default App;
