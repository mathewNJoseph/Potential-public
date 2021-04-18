import React from 'react'
import './Widgets.css'

function Widgets() {
  return (
    <div className="widgets">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/countyofsantacruz//&tabs=timeline&width=340&height=2000"
        width="340"
        height="100%"
        style={{ border: 'none', overflow:'hidden', height: '200%'}}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Widgets