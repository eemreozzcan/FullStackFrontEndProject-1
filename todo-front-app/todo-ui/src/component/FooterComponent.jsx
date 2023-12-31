//Imports the 'react' library as 'react
import React from 'react'

//"Creates a functional component named 'FooterComponent'."
const FooterComponent = () => {
  //"The component's return value uses JSX."
  return (
    //"The HTML code is wrapped in a div tag."
    <div>
        <footer className='footer'>
            <p className='text-center'>Copyrights reserved at 2023-25 by Java Guides</p>
        </footer>
    </div>
  )
}
//Exports the FooterComponent component, making it usable in other files
export default FooterComponent