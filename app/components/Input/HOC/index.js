import React, { Component } from 'react';

export default WrappedComponent => {
  return class HOC extends Component {
    handleChange = ({ target: { value } }) => {
      const { name, onChange } = this.props; // eslint-disable-line react/prop-types

      onChange(value, name);
    }

    render() {
      return <WrappedComponent {...this.props} onChange={this.handleChange} />;
    }
  };
};
