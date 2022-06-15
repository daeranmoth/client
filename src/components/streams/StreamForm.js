import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }


  renderInput = (formProps) => {
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off"/>
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {

    return (
    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
      <Field name="title" label="Enter title" component={this.renderInput} />
      <Field name="description" label="Enter description" component={this.renderInput} />
      <button className='ui button primary'>Submit</button>
    </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "you must enter a title";
  }

  if (!formValues.description) {
    errors.description = "you must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
