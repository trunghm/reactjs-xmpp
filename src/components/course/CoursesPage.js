import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import {coursesSortedForDisplay} from '../../selectors/selectors' ;

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.state = {
      deletedCourseId: ''
    };
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteCourse(courseId) {
    this.setState({deletedCourseId: courseId});

    this.props.actions.deleteCourse(courseId)
      .then(() => {
        toastr.success('Course deleted');
        this.setState({deletedCourseId: ''});
      })
      .catch(error => {
        toastr.error(error);
        this.setState({deletedCourseId: ''});
      });
  }

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        {courses && courses.length > 0
          ? <CourseList courses={courses} onDelete={this.deleteCourse} deletedCourseId={this.state.deletedCourseId}/>
          : ''
        }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: coursesSortedForDisplay(state.courses, 'title')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
