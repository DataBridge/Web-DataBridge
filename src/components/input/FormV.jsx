import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { forIn, mapValues } from 'lodash';
import InputV from './InputV';


const FormV = withStyles(({ color, unit }) => ({
  container: {
  },
}))((props) => {
  let valid = true;
  const elems = [];
  forIn(props.schema, (value, key, i) => {
    valid = valid && (props[value.state] === 'valid');
    elems.push(
    <InputV 
      placeholder={value.placeholder}
      validate={value.validate}
      state={props[value.state]}
      valid={props[value.validHandler]}
      invalid={props[value.invalidHandler]}
      empty={props[value.emptyHandler]}
      key={value.id}
    />
  )});

  if (valid)
    props.validForm();
  
  return (
    <div>
      {elems}      
    </div>
  )
})

function FormBuilder(schema, validForm, invalidForm) {
  const stateSetters = [];
  const handlers = {};

  forIn(schema, (value, key) => {
    const state = `state${value.placeholder}`;
    const stateSetter = `setState${value.placeholder}`;
    const emptyHandler = `empty${value.placeholder}`;
    const validHandler = `valid${value.placeholder}`;
    const invalidHandler = `invalid${value.placeholder}`;

    const stateSetterFunc = withState(state, stateSetter, 'empty');
    stateSetters.push(stateSetterFunc);
    handlers[emptyHandler] = (args) => () =>  args[stateSetter](_ => 'empty');
    handlers[validHandler] = (args) => () =>  args[stateSetter](_ => 'valid');
    handlers[invalidHandler] = (args) => () =>  args[stateSetter](_ => 'invalid');

    schema[key].state = state;
    schema[key].emptyHandler = emptyHandler;
    schema[key].validHandler = validHandler;
    schema[key].invalidHandler = invalidHandler;
  });

  const enhance = compose(
    ...stateSetters,
    withHandlers(handlers),
    withProps(_ => ({ schema })),
    withProps(_ => ({ validForm })),
    withProps(_ => ({ invalidForm })),
  )

  return enhance(FormV);

} 

export default FormBuilder;