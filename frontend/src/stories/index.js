import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ClassList from '../components/ClassList';
import NavBar from '../components/NavBar';

storiesOf('ClassList', module)
  .add('classes', () => (
    <ClassList 
      classes={[
        'CS 242', 
        'CS 411'
      ]}
      onClassSelect={action('clicked')}
      />
  ));

storiesOf('NavBar', module)
  .add('classes', () => (
    <NavBar store={{ getState: () => ({}) }}></NavBar>
  ));