import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import './index.css'

export default function SimilarJobs(props) {
  const {similarJobs} = props

  return (
    <ul className="similar-jobs-list grid">
      {similarJobs.map(each => (
        <li key={each.id} className="similar-job-item">
          <div className="job-item-header flex">
            <img src={each.companyLogoUrl} alt="similar job company logo" />
            <div className="header-details flex">
              <h2>{each.title}</h2>
              <div className="rating flex">
                <AiFillStar className="rating-star" />
                <p>{each.rating}</p>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>{each.jobDescription}</p>
          </div>
          <div className="info-details">
            <div className="location-type-info flex">
              <div className="location flex">
                <IoLocationSharp />
                <p>{each.location}</p>
              </div>

              <div className="job-type flex">
                <MdWork />
                <p>{each.employmentType}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
