import {getCatsByBreedId,getCatBreeds} from '../actions/cats';
import {useState,useEffect} from 'react';
import Card from '../component/card';

const Home = ()=>{
    const [catBreeds,setCatBreeds] = useState([])
    const [catData,setcatData] = useState([])
    const [currentPage,setCurrentPage] = useState({page:0,catBreed:''})
    const [showLoadMore,setShowLoadMore] = useState(false)
    
    /**
     * Cat breed initialization
     */
    const initCatBreeds = async ()=>{
        try{
            const result = await getCatBreeds()
            const catBreed = window.sessionStorage.getItem('catBreed')
            if(catBreed){
                setCurrentPage({page:0,catBreed})
                selectCatBreed(catBreed)
            }
            if(result){
                setCatBreeds(result.data)
            }
        }catch(error){
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    }

    /**
     * Get all cat breed images filtered by breed id
     * @param {*} value cat breed id
     */
    const selectCatBreed = async(value)=>{
        try {
            setcatData([{}])
            const catBreed = value
            setCurrentPage({page:0,catBreed})
            const result = await getCatsByBreedId(catBreed)
            window.sessionStorage.setItem('catBreed',catBreed)
            if(result){
                setcatData(result.data)
                setShowLoadMore(true)
            }
        } catch (error) {
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    }
    /**
     * Checks for duplicate entries
     * @param {*} prev 
     * @param {*} newSet 
     * @returns {Boolean} If it has duplicates, it will return true
     */
    const checkDuplicteEntry = (prev,newSet)=>{
        let hasDuplicateItem = false
        prev.forEach(data=>{
            const hasFound = newSet.some(newData=>{
                return data.id == newData.id
            })
            if(hasFound){
                hasDuplicateItem = true
                return
            }
        })
        return hasDuplicateItem
    }
    /**
     * Loads more cat images
     * @param {*} e holds the click event object
     */
    const loadMoreCats = async(e)=>{
        e.preventDefault()
        try {
            const page = currentPage.page + 1
            const catBreed = currentPage.catBreed
            const result = await getCatsByBreedId(catBreed,10,page)
            setCurrentPage({page,catBreed})
            if(result.data.length > 0 && !checkDuplicteEntry(catData,result.data)){
                setcatData((prevState)=>[...prevState,...result.data])
                setShowLoadMore(true)
            }else{
                setShowLoadMore(false)
            }

        } catch (error) {
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    }

    useEffect(()=>{
        initCatBreeds()
    },[])

    
    return (
        <div className="App">
            <header className="App-header">
                <h1>CAT BREED CATALOG</h1>
                <select value={currentPage?.catBreed} onChange={(e)=>selectCatBreed(e.target.value)}>
                    <option value=''>---</option>
                    {catBreeds?.map(breed=><option key={breed.id} value={breed.id}>{breed.name}</option>)}
                </select>
               
            </header>
            <main className="catalog">
                    {catData?.map(cat=>
                     <Card cat={cat}/>
                    )}
                    {
                       showLoadMore &&  ( <div className="loadmore">
                       <button onClick={loadMoreCats}>LOAD MORE</button> 
                      </div>)
                    }
               
            </main>
        </div>
    )
}
    


export default Home