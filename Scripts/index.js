let container = document.getElementById("container")
let url = "https://api.github.com/search/repositories?q=stars:%3E1+language:all"

var page = 1;

let next = document.getElementById("next")
next.addEventListener("click",() => {
    container.innerHTML = null
    page++;
    let link = `https://api.github.com/search/repositories?q=stars:%3E1+language:all&page=${page}`
    fetchData(link)
})

let prev = document.getElementById("prev")
prev.addEventListener("click",() => {
    container.innerHTML = null
    page--;
    let link = `https://api.github.com/search/repositories?q=stars:%3E1+language:all&page=${page}`
    fetchData(link)
})


function fetchData(url){
    let isLoading = true;
    if(isLoading)
    {
        let loading = document.createElement("h1")
        loading.innerText = "...Loading"
        container.append(loading)
    }
    fetch(url).then((res) => res.json()).then((res) => {
        container.innerHTML=null
        res.items.map((item) => {
            console.log(item)
            let divOne = document.createElement("div");
            divOne.setAttribute("id","divOne")
            //adding clickEvent on DivOne
            divOne.addEventListener("click",() => {
                window.location.href = `${item.owner.html_url}`
                // console.log("HI")
            })

            let image = document.createElement("img")

            
            image.src = item.owner.avatar_url

            let name = document.createElement("h2")
            name.innerText = item.name

            let language = document.createElement("h2")
            language.innerText = item.language

            let divTwo = document.createElement("div")
            divTwo.setAttribute("id","divTwo")

            let starsCount = document.createElement("h3")
            starsCount.innerText = `${item.stargazers_count} stars`

            let forksCount = document.createElement("h3")
            forksCount.innerText = `${item.forks_count} forks`

            divTwo.append(starsCount,forksCount)




            divOne.append(image,name,language,divTwo)
            container.append(divOne)

        })
    })
}
fetchData(url)

