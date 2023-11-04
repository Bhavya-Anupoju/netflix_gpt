import React, { useRef,useState } from 'react'
import lang from '../Utils/langConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../Utils/openAI'
import { API_OPTIONS } from '../Utils/constants'
import { addGptMovieResults } from '../Utils/gptSlice'

const GptSearchBar = () => {

    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null)
    const dispatch = useDispatch();
    const [load, setLoad] = useState(null);

    const searchMovieTMDB = async (movie) => {
        //For every movie the search API is called & the results are retrived 
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS)
        const json = await data.json()
        setLoad(json)
        return json.results
    }
 
    const handleGptSearchClick = async() => {
        const gptQuery = 'Act as a Movie Recommendation system and suggest some movies for the query : ' + searchText.current.value + '. Only give me names of 5 movies, which are comma separated like the example result given ahead. Example Result : Inception, Swati Mutyam, Bommarillu, Conjuring'

        //Make a API call to get the movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',

        });          
        //split the array which are separated by a comma 
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")  
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))
        //[Promise, Promise, Promise, Promise, Promise]
        //Each 'Promise' takes time to resolve
        const tmdbResults = await Promise.all(promiseArray)
        dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
    }

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 grid grid-cols-12 bg-black' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].placeholder}/>
            <button className='py-2 px-4 bg-red-700 col-span-3 m-4  text-white rounded-lg' type='submit' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar