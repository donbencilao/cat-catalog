import {useLocation, useHistory} from 'react-router-dom'

const Single = ()=>{
    const {state} = useLocation()
    const history = useHistory();
    const breedInfo = state.breeds[0]
    return (
        <div className="App">
        <header className="breedInfo-header">
            <h1>{breedInfo.name}</h1>
            <img src={state.url} />
        </header>
        <div className="breedInfo">
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Values</th>
                    </tr>    
                </thead>   
                <tbody>
                    <tr>
                        <td>Origin</td>
                        <td>{breedInfo.origin}</td>
                    
                    </tr>
                    <tr>
                        <td>Temperament</td>
                        <td>{breedInfo.temperament}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{breedInfo.description}</td>
                    </tr>
                </tbody>
                    
                
            </table>
            <div className="prev">
              <button onClick={history.goBack}>Go Back</button>
            </div>
        </div>
        </div>
    )
}

export default Single