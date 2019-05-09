import React from 'react';
import Button from './Button'

function Movie(props) {
  console.log(props);
  return (
    <React.Fragment>
    <h1>Movie with id {props.match.params.id}</h1>
    <Button clickHandler={ () => props.history.push('/movies') } value="Save"/>
    <Button clickHandler={ () => props.history.replace('/movies') } classes={['warning']} value="Save No go back"/>
    </React.Fragment>
  );
}

export default Movie;
