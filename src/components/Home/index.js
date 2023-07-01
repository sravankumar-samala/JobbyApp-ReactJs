import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="home-page-content">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="home-page-btn button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
