import React from 'react';

// export default class TodoItem extends React.PureComponent {
export default class TodoItem extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.done !== nextProps.done) return true;
  //   if (this.props.title !== nextProps.title) return true;
  //   if (this.props.notes !== nextProps.notes) return true;
  //   return false;
  // }

  render() {
    console.log('TodoItem render called');
    return (
      <div>
        {this.props.done ? '✓' : '▢'} {this.props.title}(
        {this.props.notes.join(', ')})
      </div>
    );
  }
}
