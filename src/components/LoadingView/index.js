import Loader from 'react-loader-spinner'

export default function LoadingView() {
  return (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
}
