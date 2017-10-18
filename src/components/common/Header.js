import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {loading} = this.props;
    return (
      <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        <Link to="/courses" activeClassName="active">Courses ({this.props.courses.length})</Link>
        {" | "}
        <Link to="/authors" activeClassName="active">Authors ({this.props.authors.length})</Link>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
        {loading && <LoadingDots interval={100} dots={20}/>}
      </nav>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
    courses: state.courses,
    authors: state.authors
  };
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Header);
