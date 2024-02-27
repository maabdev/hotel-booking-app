import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-blue-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/"><span className='text-blue-800'>M</span>Booking</Link>
        </span>
        <span className='text-white  font-bold tracking-tight flex gap-4'>
          <p className='cursor-pointer hover:text-blue-800'>Privacy Policy</p>
          <p className='cursor-pointer hover:text-blue-800'>Terms of Service</p>
        </span>

        
      </div>
    </div>
  )
}

export default Footer
