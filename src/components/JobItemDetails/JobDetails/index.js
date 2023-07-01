import JobItemDesign from '../../JobItemDesign'
import SimilarJobs from '../SimilarJobs'
import './index.css'

export default function JobDetails(props) {
  const {
    jobDetailsObject,
    similarJobs,
    jobDetailsApiStatus,
    getJobItemDetails,
    renderJobsDetailsStatusView,
  } = props

  const renderSuccessView = () => {
    const {skills, lifeAtCompany} = jobDetailsObject

    const skillsList = skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))
    const lifeAtCompanyObject = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = lifeAtCompanyObject

    return (
      <div className="job-details-container">
        <div className="job-item-details-container job-item grid">
          <JobItemDesign jobObj={jobDetailsObject} showLink />
          <div className="skill-list-container">
            <h2>Skills</h2>
            <ul className="skills-list grid">
              {skillsList.map(each => (
                <li className="skill-item flex">
                  <img src={each.imageUrl} alt={each.name} />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container grid">
            <div className="description">
              <h2>Life at Company</h2>
              <p>{description}</p>
            </div>
            <div className="company-image">
              <img src={imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <SimilarJobs similarJobs={similarJobs} />
        </div>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="jobs-failed-container jobs-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn button"
        onClick={() => getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  return (
    <>
      {renderJobsDetailsStatusView(
        jobDetailsApiStatus,
        renderSuccessView,
        renderFailureView,
      )}
    </>
  )
}
