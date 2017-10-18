export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}

export function coursesSortedForDisplay(courses, sortBy) {
  return courses.sort((a, b)=> {
    if (a[sortBy] && b[sortBy]) {
      if (a[sortBy] < b[sortBy])
        return -1;
      if (a[sortBy] < b[sortBy])
        return 1;
      return 0;
    }
  });
/*
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });*/
}

