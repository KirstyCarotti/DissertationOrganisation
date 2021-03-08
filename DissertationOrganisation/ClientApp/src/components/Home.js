import React, { Component } from 'react';
import Lists from './Lists.js'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <Lists></Lists>
        </div>
    );
  }
}
