import {BsFilterRight, BsSearch} from 'react-icons/bs'

import './index.css'

const SortByOption = props => {
  const {
    sortByOptions,
    activeOptionValue,
    onChangeOption,
    searchInput,
    onChangeSearchInput,
    onEnterSearchInput,
  } = props

  const enterSearchInput = event => {
    if (event.key === 'Enter') {
      onEnterSearchInput()
    }
  }

  const changeSearchInput = e => {
    onChangeSearchInput(e.target.value)
  }

  const onChangeSortVal = e => {
    onChangeOption(e.target.value)
  }

  return (
    <>
      <div className="sort-by-container">
        <div className="search-input-container">
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={changeSearchInput}
            onKeyDown={enterSearchInput}
          />
          <BsSearch className="search-icon" />
        </div>
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
