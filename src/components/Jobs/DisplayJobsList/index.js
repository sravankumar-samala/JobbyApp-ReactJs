import {Link} from 'react-router-dom'
import JobItemDesign from '../../JobItemDesign'
import './index.css'

export default function DisplayJobsList(props) {
  const {
    jobsApiStatus,
    renderApiStatusResults,
    jobsList,
    getJobs,
    salaryRange,
    jobTypes,
    search,
  } = props

  const jobsSuccessView = () => (
    <ul className="jobs-list grid">
      {jobsList.map(eachJob => (
        <Link to={`/jobs/${eachJob.id}`} className="job-item-link grid">
          <li className="job-item grid">
            <JobItemDesign jobObj={eachJob} showLink={false} />
          </li>
        </Link>
      ))}
    </ul>
  )

  const jobsFailureView = () => (
    <div className="jobs-failed-container jobs-failure grids">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn button"
        onClick={() => getJobs()}
      >
        Retry
      </button>
    </div>
  )

  const noJobsView = () => (
    <div className="jobs-failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  return (
    <>
      {jobsList.length === 0 &&
      (salaryRange !== '' || jobTypes.length !== 0 || search !== '')
        ? noJobsView()
        : renderApiStatusResults(
            jobsApiStatus,
            jobsSuccessView,
            jobsFailureView,
          )}
    </>
  )
}
