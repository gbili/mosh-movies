import React from 'react';

function NotFound({ location }) {
  return (
    <h1>404 Not Found: {location.pathname}</h1>
  );
}

export default NotFound;
