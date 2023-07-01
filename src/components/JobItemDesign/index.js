import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import './index.css'

export default function JobItemDesign(props) {
  const {jobObj, showLink} = props
  return (
    <>
      <div className="job-item-header flex">
        <img src={jobObj.companyLogoUrl} alt="company logo" />
        <div className="header-details flex">
          <h2>{jobObj.title}</h2>
          <div className="rating flex">
            <AiFillStar className="rating-star" />
            <p>{jobObj.rating}</p>
          </div>
        </div>
      </div>
      <div className="info-details flex">
        <div className="location-type-info flex">
          <div className="location flex">
            <IoLocationSharp />
            <p>{jobObj.location}</p>
          </div>

          <div className="job-type flex">
            <MdWork />
            <p>{jobObj.employmentType}</p>
          </div>
        </div>
        <p>{jobObj.packagePerAnnum}</p>
      </div>
      <div className="description">
        <hr />
        {showLink ? (
          <div className="description-header flex">
            <h3>Description</h3>
            <a
              href={jobObj.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <BiLinkExternal />
            </a>
          </div>
        ) : (
          <h3>Description</h3>
        )}
        <p>{jobObj.jobDescription}</p>
      </div>
    </>
  )
}
