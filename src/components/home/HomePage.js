import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Hello world!</h1>
        <Link to="courses" className="btn btn-primary btn-lg">Courses</Link>
      </div>
    );
  }
}

export default HomePage;
