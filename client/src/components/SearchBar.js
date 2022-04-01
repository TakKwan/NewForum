import { useState } from 'react'
import axios from 'axios'
import { backend } from '../resources/resources'

const SearchBar = ({ onSubmit }) => {
  const [searchTerms, setSearchTerms] = useState('')

  const onSearchTermsChange = (e) => {
    setSearchTerms(e.target.value)
  }

  const onSearch = async (e) => {
    e.preventDefault()
    const result = await axios.get(backend.baseUrl + backend.post.searchPosts, {
      params: { searchTerms }
    })
    onSubmit(result.data)
  }

  return (
    <form className="searchBar">
      <input
        type="text"
        placeholder="Search Post Content"
        onChange={onSearchTermsChange}
      />
      <button onClick={onSearch}>Search</button>
    </form>
  )
}

export default SearchBar
