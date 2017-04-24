import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

const ClassList = ({ classes = [], onClassSelected = console.log, addClass, allClasses, onClassAdded}) => {
  return (
    <div>
      <ListGroup>
        {classes.map(c => <ListGroupItem key={c._id} onClick={onClassSelected.bind(this, c)}>{c.code} - {c.name} {addClass ? <Glyphicon className="pull-right" glyph="remove-sign" /> : null}</ListGroupItem>)}
        { addClass ? <ListGroupItem>
          <Typeahead 
            onChange={onClassAdded}
            options={allClasses}
            labelKey="name"
          />
        </ListGroupItem> : null}
      </ListGroup>
    </div>
  );
};

export default ClassList;