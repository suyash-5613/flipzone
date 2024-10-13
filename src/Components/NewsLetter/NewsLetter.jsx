import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe To Our NewsLetter and Stay Updated</p>
        <div>
            <input type="email" placeholder="Enter Your Email"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter