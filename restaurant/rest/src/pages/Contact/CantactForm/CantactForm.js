import React from 'react'
import './CantactForm.css'

import bgImage from '../../../assets/cake.jpg'

const CantactForm = () => {
  return (
    <div className='section'>
        <div className='container grid-container contact-content'>
            <div>
                <h1 className='heading-secondary'>
                    get in <span>touch</span>
                </h1>

                <p>We're committed to providing exceptional service and ensuring your experience with us is nothing short of extraordinary. <span className='special-word'>Don't hesitate to reach out;</span> we're here to make your dining experience memorable!</p>

                <img src={bgImage} alt="get in touch" />
                <p>Prefer to communicate via email? Shoot us a message through Contact Form, and we'll get back to you as soon as possible.</p>
                <p>Stay connected with us on social media platforms like <span className='special-word'>Facebook, Instagram, and Twitter.</span> Get updates on special promotions, events, and more.</p>
                <p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
            </div>

            <div>
                <h1 className='heading-secondary'>
                    Mail <span>us</span>
                </h1>

                <form>
                    <div className='form-field name-email'>
                        <div>
                            <label>Name</label>
                            <input type="text" name='name' />
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" name='email' />
                        </div>
                    </div>


                    <div className='form-field'>
                        <div>
                            <label>Subject</label>
                            <input type="text" name='subject' />
                        </div>
                    </div>

                    <div className='form-field'>
                        <div>
                            <label>Message</label>
                            <textarea type="text" name='message' />
                        </div>
                    </div>
                </form>

                <button>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default CantactForm