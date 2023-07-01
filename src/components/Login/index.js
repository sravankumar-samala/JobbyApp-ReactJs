import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

export default function Login() {
  const [submitError, setSubmitError] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const onChangeUserName = event => {
    setUserName(event.target.value)
    setSubmitError(false)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setSubmitError(false)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmit = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) onSubmitSuccess(data.jwt_token)
    else {
      setSubmitError(true)
      setErrorMsg(data.error_msg)
      console.log(data.error_msg)
    }
  }

  const renderNameInputField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-field"
        value={username}
        placeholder="Enter your name"
        onChange={onChangeUserName}
      />
    </>
  )
  const renderPasswordInputField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="input-field"
        value={password}
        placeholder="Enter your password"
        onChange={onChangePassword}
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="page-container">
      <form className="form " onSubmit={onSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        {renderNameInputField()}
        {renderPasswordInputField()}
        <button type="submit" className="login-btn button">
          Login
        </button>
        {submitError && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}
