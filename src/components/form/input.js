import React from 'react'
import { observer } from 'mobx-react'
import classes from 'classnames'

const Input = ({ field, placeholder, disabled, type = 'text' }) => {
  const fieldClasses = classes({
    'field': true,
    'form__input-group': true,
    'form__input-group--error': field.error
  })
  const fieldBodyClasses = classes({
    'field-body': true,
    'form__input-wrapper': true,
    'form__input-wrapper--error': field.error
  })

  const inputClasses = classes({
    'form__input': true,
    'input': true,
    'is-danger': !!field.error
  })

  const fieldLabel = (
    <label className="form__label label">
      {field.label}
    </label>
  )

  const fieldInput = (
    <div className={fieldBodyClasses}>
      <div className="field">
        <div className="control">
          <input className={inputClasses} {...field.bind() } type={type} placeholder={placeholder} disabled={disabled || undefined} />
        </div>
        {field.error && <div className="form__input-error help is-danger">{field.error}</div>}
      </div>
    </div>
  )

  return (
    <div className={fieldClasses}>
      {fieldLabel}
      {fieldInput}
    </div>
  )
}

export default observer(Input)
