import React from 'react'
import { observer } from 'mobx-react'
import classes from 'classnames'

const FileInput = ({ field, placeholder, disabled }) => {
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

  const [selectedFile] = field.files || [{name: placeholder}]

  const fieldInput = (
    <div className={fieldBodyClasses}>
      <div className="field">
        <div className="control">

          {/* File input */}
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" {...field.bind()} disabled={disabled || undefined} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fa fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {selectedFile.name}
              </span>
            </label>
          </div>
          {/* /File input */}

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

export default observer(FileInput)
