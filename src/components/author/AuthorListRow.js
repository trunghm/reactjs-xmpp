import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class AuthorListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  deleteAuthor(event) {
    const authorId = event.target.name;
    this.props.onDelete(authorId);
  }

  render() {
    const {author, deletedAuthorId} = this.props;

    return (
      <tr>
        <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
        <td>{author.firstName}</td>
        <td>{author.lastName}</td>
        <td>
          <input
            name={author.id}
            type="submit"
            value={deletedAuthorId === author.id  ? "Deleting" : "Delete"}
            className="btn btn-primary"
            onClick={this.deleteAuthor}/>
        </td>
      </tr>
    );
  }
}

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletedAuthorId: PropTypes.string.isRequired
};


export default AuthorListRow;
