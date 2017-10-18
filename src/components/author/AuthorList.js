import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, onDelete, deletedAuthorId}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Id</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {authors.map(author =>
        <AuthorListRow key={author.id} author={author} onDelete={onDelete} deletedAuthorId={deletedAuthorId}/>
      )}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletedAuthorId: PropTypes.string.isRequired
};


export default AuthorList;
