//Component to show search bar & suggestions at one place
import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { LOGO } from '../Utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className="fixed -z-10">    
            <img src={LOGO} alt="background" />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch