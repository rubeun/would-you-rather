import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='center'>
      <h3>404 Error</h3>
      <p>Content Does Not Exist</p>
      <p>Return <Link to='/' className='text-link'>Home</Link></p>
    </div>
  )
}