import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class CourseListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse(event){
    const courseId = event.target.name;
    this.props.onDelete(courseId);
  }

  render(){
    const {course, deletedCourseId} = this.props;

    return (
      <tr>
        <td><a href={course.watchHref} target="_blank">Watch</a></td>
        <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
        <td>{course.length}</td>
        <td>
          <input
            name={course.id}
            type="submit"
            value={deletedCourseId === course.id  ? "Deleting" : "Delete"}
            className="btn btn-primary"
            onClick={this.deleteCourse}/>
        </td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  deletedCourseId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
