import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';
import {withRouter} from 'react-router';
let _ = require('lodash');

export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, props.author),
      errors: {},
      saving: false,
      isDirty: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.isDirty && !_.isEqual(this.props.author, this.state.author))
        return 'You have unsaved information, are you sure you want to leave this page?';
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      // Necessary to populate form when existing author is loaded directly.
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }


  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;

    return this.setState({author: author, isDirty:true});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 3) {
      errors.firstName = 'FirstName must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 3) {
      errors.lastName = 'LastName must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({saving: true, isDirty:false});
    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        author={this.state.author}
        errors={this.state.errors}
        saving={this.state.saving}
        isDirty={this.state.isDirty}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id === id);
  if (author && author.length > 0) return author[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id; // from the path `/author/:id`

  let author = {id: '', firstName: '', lastName: ''};

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author,
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageAuthorPage));
