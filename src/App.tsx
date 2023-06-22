import { useState } from 'react'
import './index.css'

function App() {

  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [cvc, setCVC] = useState("") 
  const [nameError, setNameError] = useState("")  
  const [numberError, setNumberError] = useState("")
  const [dateError, setDateError] = useState("")
  const [cvcError, setCvcError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleName = (e: any) => {
    const value = e.target.value
    const regex = /^[a-zA-Z ]+$/
    if (value === "") {
      setName("")
    }
    if (regex.test(value)) {
      setName(value)
    }
    if (!regex.test(value)) {
      setNameError("Please enter a valid name")
    }
    if (value.length === 0) {
      setNameError("Name cannot be empty")
    }
    if (regex.test(value) && value.length !== 0) {
      setNameError("")
    }
  }

  
  const handleNumber = (e: any) => {
    const value = e.target.value
    const regex = /^[0-9 ]+$/
    const parts: string[] = [];

    if (value === "") {
      setNumber("")
    }
    if (regex.test(value) && value.length <= 19) {
      const valueWithoutSpaces = value.replace(/ /g, "")
      for (let i = 0; i < valueWithoutSpaces.length; i += 4) {
        parts.push(valueWithoutSpaces.substr(i, 4));
      }
      setNumber(parts.join(" "))
    }
    if (!regex.test(value)) {
      setNumberError("Please enter a valid card number")
    }
    if (value.length === 0) {
      setNumberError("Card number cannot be empty")
    }
    if (regex.test(value) && value.length !== 0) {
      setNumberError("")
    }
    if (value.length < 19) {
      setNumberError("Card number must be 16 digits")
    }
  }

  const handleMonth = (e: any) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value.length > 2) {
      setDateError("")
    }
    else if (value === "") {
      setMonth("")
      setDateError("")
    } else if (regex.test(value)) {
      const intValue = parseInt(value, 10)
      if (intValue < 1 || intValue > 12) {
        setDateError("")
      } else {
        setMonth(value)
        setDateError("")
      }
    } else {
      setDateError("Please enter a valid month")
    }
    if (value.length === 0) {
      setDateError("Date cannot be empty")
    }
  }

  const handleYear = (e: any) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value.length > 2) {
      setDateError("")
    }
    else if (value.length < 2) {
      setDateError("Year must be 2 digits")
      setYear(value)
    }
    else if (value === "") {
      setYear("")
      setDateError("")
    } 
    else if (regex.test(value)) {
      const intValue = parseInt(value, 10)
      if (intValue < 1) {
        setDateError("Please enter a valid year")
      } else {
        setYear(value)
        setDateError("")
      }
    } 
    else {
      setDateError("Please enter a valid year")
    }

    if (value.length === 0) {
      setDateError("Date cannot be empty")
    }
  }

  const handleCVC = (e: any) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value.length > 3) {
      setCvcError("")
    }
    else if (value.length < 3) {
      setCvcError("Year must be 3 digits")
      setCVC(value)
    }
    else if (value === "") {
      setCVC("")
      setCvcError("")
    } 
    else if (regex.test(value)) {
      const intValue = parseInt(value, 10)
      if (intValue < 1 || intValue > 999) {
        setDateError("Please enter a valid CVC")
      } else {
        setCVC(value)
        setCvcError("")
      }
    } 
    else {
      setCvcError("Please enter a valid CVC")
    }

    if (value.length === 0) {
      setCvcError("CVC cannot be empty")
    }
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (nameError === "" && numberError === "" && dateError === "" && cvcError === "" && name !== "" && number !== "" && month !== "" && year !== "" && cvc !== "") {
      setSuccess(true)
    }
  }

  if (!success) {
    return (
      <div className='main'>
        <div className="left"></div>
        <div className="right">
          <div className="cards">
            <div className="front">
              <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff"/><path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff"/></svg>
              <span className="number">{number}</span>
              <div className="bottomOfFront">
                <span className="name">{name}</span>
                <span className="date">{month}/{year}</span>
              </div>
            </div>
            <div className="back">
              <span className="cvc">{cvc}</span>
            </div>
          </div>
          <div className="form">
            <label htmlFor="name">CARDHOLDER NAME</label>
            <input value={name} onChange={handleName} id='name' type="text" placeholder='e.g. Barbaros Teoman'/>
            <p className='error'>{nameError}</p>
            <label htmlFor="number">CARD NUMBER</label>
            <input value={number} onChange={handleNumber} id='number' type="text" placeholder='e.g. 1234 5678 9123 0000'/>
            <p className='error'>{numberError}</p>
            <div className="bottomForm">
              <div className="bottomFormLeft">
                <label htmlFor="month">EXP. DATE (MM/YY)</label>
                <div className='bottomFormLeftInputs'>
                  <input value={month} onChange={handleMonth} id="month" type="text" placeholder='MM'/>
                  <input value={year} onChange={handleYear} id="year" type="text" placeholder='YY'/>
                </div>
                <p className='error'>{dateError}</p>
              </div>
              <div className="bottomFormRight">
                <label htmlFor="cvc">CVC</label>
                <input value={cvc} onChange={handleCVC} id="cvc" type="text" placeholder='e.g. 123'/>
                <p className='error'>{cvcError}</p>
              </div>
            </div>
            <button onClick={handleSubmit} type="submit">Confirm</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='main'>
        <div className="left"></div>
        <div className="right">
          <div className="cards">
            <div className="front">
              <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff"/><path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff"/></svg>
              <span className="number">{number}</span>
              <div className="bottomOfFront">
                <span className="name">{name}</span>
                <span className="date">{month}/{year}</span>
              </div>
            </div>
            <div className="back">
              <span className="cvc">{cvc}</span>
            </div>
          </div>
          <div className="successScreen">
            <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>
            <h1>THANK YOU!</h1>
            <p className='successMessage'>We've added your card details</p>
            <button type="submit">Continue</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App