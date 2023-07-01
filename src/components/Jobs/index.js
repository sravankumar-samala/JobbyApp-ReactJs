import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import LoadingView from '../LoadingView'
import DisplayProfileDetails from './DisplayProfileDetails'
import DisplayJobsList from './DisplayJobsList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

export default function Jobs() {
  const [search, setSearchValue] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [profileApiStatus, setProfileApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [jobTypes, setJobTypes] = useState([])
  const [salaryRange, setSalaryRange] = useState('')
  const [jobsList, setJobsList] = useState([])
  const [jobsApiStatus, setJobsApiStatus] = useState(apiStatusConstants.initial)

  const getUserProfileDetails = async () => {
    setProfileApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        const profileDetails = data.profile_details
        const updatedProfileDetails = {
          name: profileDetails.name,
          profileImageUrl: profileDetails.profile_image_url,
          bio: profileDetails.short_bio,
        }
        setUserDetails(updatedProfileDetails)
        setProfileApiStatus(apiStatusConstants.success)
      } else {
        throw new Error(data.error_msg)
      }
    } catch (error) {
      setProfileApiStatus(apiStatusConstants.failed)
      console.log(error.message)
    }
  }

  const getJobs = useCallback(async () => {
    setJobsApiStatus(apiStatusConstants.inProgress)
    const employmentTypes = jobTypes.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const {jobs} = data
        const updatedJobsList = jobs.map(jobObj => ({
          companyLogoUrl: jobObj.company_logo_url,
          employmentType: jobObj.employment_type,
          id: jobObj.id,
          jobDescription: jobObj.job_description,
          location: jobObj.location,
          packagePerAnnum: jobObj.package_per_annum,
          rating: jobObj.rating,
          title: jobObj.title,
        }))
        setJobsList(updatedJobsList)
        setJobsApiStatus(apiStatusConstants.success)
      } else {
        throw new Error(data.error_msg)
      }
    } catch (error) {
      setJobsApiStatus(apiStatusConstants.failed)
      console.log(error.message)
    }
    // eslint-disable-next-line
  }, [salaryRange, jobTypes])

  //   apis will be called here through useEffect hook
  useEffect(() => {
    getUserProfileDetails()
  }, [])

  useEffect(() => {
    getJobs()
  }, [getJobs])

  const handleOnCheck = event => {
    const {value, checked} = event.target

    if (checked) {
      setJobTypes(prevTypes => [...prevTypes, value])
    } else {
      setJobTypes(prevTypes => prevTypes.filter(type => type !== value))
    }
  }

  const renderApiStatusResults = (apiStatus, successView, failureView) => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failed:
        return failureView()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <Header />
      <div className="jobs-page-container grid">
        {/* ------------- Search Input ------------ */}
        <div className="search-container">
          <input
            type="search"
            value={search}
            placeholder="Search"
            onChange={event => setSearchValue(event.target.value)}
          />
          <button
            type="button"
            className="search-btn grid"
            onClick={() => getJobs()}
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>

        {/* **************** Profile and Filters *************** */}
        <div className="profile-filters-container flex">
          {/* ---------- Profile Details ---------- */}
          <div className="profile-container-holder grid">
            <DisplayProfileDetails
              profileApiStatus={profileApiStatus}
              renderApiStatusResults={renderApiStatusResults}
              userDetails={userDetails}
              getUserProfileDetails={getUserProfileDetails}
            />
          </div>

          {/* --------------- Filters ------------- */}
          <div className="filters-container">
            <hr />
            <div className="employment-type-container">
              <DisplayEmploymentFilters handleOnCheck={handleOnCheck} />
            </div>
            <hr />
            <div className="salary-range-container">
              <DisplaySalaryRangeFilters setSalaryRange={setSalaryRange} />
            </div>
          </div>
        </div>

        {/* ----------------- Jobs --------------- */}
        <div className="jobs-container">
          <DisplayJobsList
            getJobs={getJobs}
            jobsList={jobsList}
            salaryRange={salaryRange}
            jobTypes={jobTypes}
            search={search}
            jobsApiStatus={jobsApiStatus}
            renderApiStatusResults={renderApiStatusResults}
          />
        </div>
      </div>
    </div>
  )
}

function DisplayEmploymentFilters(props) {
  const {handleOnCheck} = props

  return (
    <>
      <h3>Type of Employment</h3>
      <ul className="employment-type-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId}>
            <label>
              <input
                type="checkbox"
                value={eachType.employmentTypeId}
                onChange={handleOnCheck}
              />
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

function DisplaySalaryRangeFilters(props) {
  const {setSalaryRange} = props

  return (
    <>
      <h3>Salary Range</h3>
      <ul className="salary-range-list">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.salaryRangeId}>
            <label>
              <input
                type="radio"
                value={eachRange.salaryRangeId}
                name="salaryRange"
                onChange={e => setSalaryRange(e.target.value)}
              />
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}
