import React, { Component } from 'react';
import mongoose from 'mongoose'

class Index extends Component {
  static getInitialProps({req}){
    if(req) {
      mongoose.connect('mongodb://admin:admin@ds153710.mlab.com:53710/cider')

      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log("connected")

        var kittySchema = mongoose.Schema({
          name: String
        });
        kittySchema.methods.speak = function () {
          var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
          console.log(greeting);
        }
        var Kitten = mongoose.model('Kitten', kittySchema);
        var silence = new Kitten({ name: 'Silence' });
        console.log(silence.name); // 'Silence'

        silence.save(function (err, fluffy) {
          if (err) return console.error(err);
          silence.speak();
        });

        db.close()

      });

      return {
        test: 'isNode'
      }
    } else {
      return {
        test: 'isBrowser'
      }      
    }
  }

  render() {
    return (
      <div>
        {this.props.test}
      </div>
    );
  }
}

export default Index;