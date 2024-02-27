import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-blue-400 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight"> {/*trackin-tight to add a logo effect */}
            <Link to="/"><span className='text-blue-800'>M</span>Booking</Link>
        </span>
        <span className="flex space-x-2">
            <Link to="/sign-in" className='flex bg-white items-center text-blue-800 px-3 font-bold hover:bg-blue-200 '>Sign In</Link>
        </span>
      </div>
    </div>
  )
}

export default Header
