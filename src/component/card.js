import {Link} from 'react-router-dom'

const Card = ({cat})=>{
    return (
        <div key={cat.id} className="cat-card">
          <img src={cat.url}/>
          <button className="view-button">
              <Link to={{pathname:'/single/'+cat.id,state:cat}}>
               View Details
              </Link>
            </button>
        </div>
    )
}

export default Card
    
