
import './Body.css'

import Card from '../../Asset/card/Card'
import {mockData} from '../../utils/mockData'
import { useState } from 'react'

const Body = ()=>{

   const [resturentData , setResturentData] = useState(mockData)
    
   
   return(
        <div className='bady'>
            <div className='searchInput'>
            <div className="group"><svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
               <input placeholder="Search" type="search" className="input"></input>
            </div>
            <button onClick={()=>{
  if (resturentData.length === mockData.length) {
    const topData = mockData.filter((res) => res.rating > 4.5);
    setResturentData(topData);
  }
}}>Top Rated</button>
           
            </div>
            
            
            <div className='res-container' >
            {resturentData.map((food, index) => (
              <Card key={index} food={food} />
             ))}

            </div>
        </div>
    )
}

export default Body