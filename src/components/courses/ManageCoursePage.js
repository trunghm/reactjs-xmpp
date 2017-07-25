import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.course.id !== nextProps.course.id){
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    this.setState({saving: true});
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect(){
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        saving={this.state.saving}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(x => x.id === id);
  if (course)
    return course[0];
  else
    return null;
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  const courseId = ownProps.params.id;

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorFormatedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorFormatedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
