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