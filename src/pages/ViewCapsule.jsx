import { useParams } from 'react-router-dom'

function ViewCapsule() {
  const { id } = useParams()

  return (
    <div>
      <h2>View Capsule</h2>
      <p>Viewing capsule with ID: <strong>{id}</strong></p>
 
    </div>
  )
}

export default ViewCapsule
