import { useState, useEffect } from 'react'
import axios from 'axios'
 
const baseUrl = 'http://localhost:5173/restcountries'

const Languages = ({langs}) => {
    const languages = Object.values(langs)
    return(
        <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
    )
}

const Country = ({country}) => {
    return (
        <div>
        <h1>{country.name.common}</h1>
        <br/>
        Capital {country.capital}<br/>
        Area {country.area}
        <br/>
        <h2>Languages</h2>
        <Languages langs={country.languages} />
        <img src={country.flags.png} />
        </div>)
}

const Countries = ({cList, show, setCountry}) => {
    if (Object.keys(show).length > 0) {
        return(<Country country={show.country}/>)
    }
    if (cList.length === 0) {
        return
    } else if (cList.length > 10) {
        return ('Too many matches, specify more letters!')
    } else if (cList.length === 1) {
        return(<Country country={cList[0]}/>)
    }
    return(
        <div>
        {cList.map(country => <div key={country.name.common}>{country.name.common}<button onClick={() => setCountry({country})} >Show</button></div>)}
        </div>
    )
}

function App() {
    const [countryName, setCountryName] = useState('')
    const [allCountries, setAllCountries] = useState([])
    const [showCountry, setShowCountry] = useState({})

    const collectInput = (event) => {
        setShowCountry({})
        setCountryName(event.target.value)
    }

    useEffect(() => {
        axios.get(baseUrl+'/api/all').then(response =>  {
            setAllCountries(response.data)})
    }, [])

    const countryList = () => {
        if (allCountries.length === 0 || countryName.length === 0) {
            return []
        }
        return allCountries.filter(country => countryName === country.name.common.substring(0, countryName.length))
    }

    return (
        <div>
        find countries <input value={countryName} onChange={collectInput} />
        <br/>
        <Countries cList={countryList()} show={showCountry} setCountry={setShowCountry}/>
        </div>
    )
}

export default App
