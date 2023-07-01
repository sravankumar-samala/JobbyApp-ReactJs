export default function DisplayProfileDetails(props) {
  const {
    profileApiStatus,
    getUserProfileDetails,
    renderApiStatusResults,
    userDetails,
  } = props

  const profileSuccessView = () => (
    <div className="profile-container">
      <img src={userDetails.profileImageUrl} alt="profile" />
      <h2>{userDetails.name}</h2>
      <p>{userDetails.bio}</p>
    </div>
  )

  const profileFailureView = () => (
    <button
      type="button"
      className="retry-btn button"
      onClick={getUserProfileDetails}
    >
      Retry
    </button>
  )

  return (
    <>
      {renderApiStatusResults(
        profileApiStatus,
        profileSuccessView,
        profileFailureView,
      )}
    </>
  )
}
