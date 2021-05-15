import axios from 'axios'
/**
 * Get all cat images filtered by breed id
 * @param {*} breedId 
 * @param {*} limit 
 * @param {*} page 
 * @param {*} order 
 * @returns Cat breeds array
 */
export const getCatsByBreedId = async(breedId,limit=10,page=0,order='Desc')=>
    await axios.get(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`)
    // https://api.thecatapi.com/v1/images/search?page=2&limit=10&breed_id=aege
/** 
 * Get all cat breeds
*/
export const getCatBreeds = async()=>
    await axios.get(`https://api.thecatapi.com/v1/breeds`) 


