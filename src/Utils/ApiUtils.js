import axios from 'axios'

export const fetchNewsItems = (searchTerm, startIndex, pageSize) => {
    return axios.get(`https://content.guardianapis.com/search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=${startIndex}&page-size=${pageSize}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}