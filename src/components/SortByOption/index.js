import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const SortByOption = props => {
  const {sortByOptions, activeOptionValue, onChangeOption} = props

  const onChangeSortVal = e => {
    onChangeOption(e.target.value)
  }

  return (
    <>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionValue}
          onChange={onChangeSortVal}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default SortByOption
