const key = 'b76dc9b6c43143ad9fb94cdcd8d4c686'
const cards = document.getElementById('cards')
const input = document.getElementById('input-box')
const searchBtn = document.getElementById('searchBtn')
let showMoreItem = document.getElementById('showMoreResults')
let value;
let page = 8

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    
    cards.innerHTML = '';
    page = 8;
    
    fetchNews()
})


function fetchNews() {
    input.value === '' ? value= "sport" : value = input.value;
    console.log(value);

    try {
        let url = `https://newsapi.org/v2/everything?q=${value}&pageSize=${page}&apiKey=${key}`
        fetch(url)
            .then((res) => res.json())
            .then((res) => displayNews(res))
    } catch (error) {
        console.log("Error happened while fetching Url "+error);
    }
}

function displayNews(data) {
    // input.value = ''
    cards.innerHTML = ''

    data.articles.map((article) => {
        let card = document.createElement('div')
        card.classList.add('card')

        let image = document.createElement('img')
        image.src = article.urlToImage
        image.alt = article.title

        let title = document.createElement('h2')
        title.textContent = article.title

        let description = document.createElement('p')
        description.textContent = article.description

        card.appendChild(image)
        card.appendChild(title)
        card.appendChild(description)

        card.addEventListener('click', () => {
            window.open(article.url, '_blank')
        })

        cards.appendChild(card)
    })
    
}


showMoreItem.addEventListener('click', ()=>{
    page += 4;
    fetchNews()
})

window.addEventListener('load', () => {
    input.value = ''
    fetchNews()
})







