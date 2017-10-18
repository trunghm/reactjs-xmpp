import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authorActions from '../../actions/authorActions';
import {bindActionCreators} from 'redux';
import AuthorList from './AuthorList';
import toastr from 'toastr';
import {browserHistory} from 'react-router';


class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.state = {
      deletedAuthorId: ''
    };

  }

  deleteAuthor(authorId) {

    if (getCourseByAuthorId(this.props.courses, authorId) === null) {
      this.setState({deletedAuthorId: authorId});

      this.props.actions.deleteAuthor(authorId)
        .then(() => {
          toastr.success('Author deleted');
          this.setState({deletedAuthorId: ''});
        })
        .catch(error => {
          toastr.error(error);
          this.setState({deletedAuthorId: ''});
        });
    }
    else {
      toastr.error('You can not delete author who has course');
    }
  }

  redirectToAddAuthorPage(){
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        {authors && authors.length > 0
          ? <AuthorList authors={authors} onDelete={this.deleteAuthor} deletedAuthorId={this.state.deletedAuthorId}/>
          : ''
        }
      </div>
    );
  }


}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired

};


function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

function getCourseByAuthorId(courses, id) {
  const course = courses.filter(course => course.authorId === id);
  if (course && course.length > 0) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
