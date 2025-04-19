import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className="flex h-screen justify-center items-center">
    <CircularProgress size="3rem" />
  </div>
  )
}

export default Loader