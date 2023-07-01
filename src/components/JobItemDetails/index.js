import {useEffect, useState, useCallback} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetails from './JobDetails'
import LoadingView from '../LoadingView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

export default function JobItemDetails(props) {
  const {match} = props
  const {id} = match.params
  const [jobDetailsApiStatus, setJobDetailsApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [jobDetailsObject, setJobDetailsObject] = useState({})
  const [similarJobsList, setSimilarJobs] = useState([])

  const getJobItemDetails = useCallback(async () => {
    setJobDetailsApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
        const jobDetails = data.job_details
        const similarJobs = data.similar_jobs

        const updatedJobDetails = {
          companyLogoUrl: jobDetails.company_logo_url,
          companyWebsiteUrl: jobDetails.company_website_url,
          employmentType: jobDetails.employment_type,
          id: jobDetails.id,
          jobDescription: jobDetails.job_description,
          location: jobDetails.location,
          packagePerAnnum: jobDetails.package_per_annum,
          rating: jobDetails.rating,
          title: jobDetails.title,
          skills: jobDetails.skills,
          lifeAtCompany: jobDetails.life_at_company,
        }
        const updatedSimilarJobsList = similarJobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        }))

        setJobDetailsObject(updatedJobDetails)
        setSimilarJobs(updatedSimilarJobsList)
        setJobDetailsApiStatus(apiStatusConstants.success)
      } else throw new Error(data.error.msg)
    } catch (error) {
      setJobDetailsApiStatus(apiStatusConstants.failed)
      console.log(error.message)
    }
  }, [id])

  useEffect(() => {
    getJobItemDetails()
  }, [getJobItemDetails])

  const renderJobsDetailsStatusView = (apiStatus, successView, failureView) => {
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
      <JobDetails
        jobDetailsObject={jobDetailsObject}
        jobDetailsApiStatus={jobDetailsApiStatus}
        similarJobs={similarJobsList}
        getJobItemDetails={getJobItemDetails}
        renderJobsDetailsStatusView={renderJobsDetailsStatusView}
      />
    </div>
  )
}
