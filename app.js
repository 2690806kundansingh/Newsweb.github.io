const apikey = '42a3d0737e004e5ebe9c97548e2cf450';

const blogContainer = document.getElementById("blog-conatainer");
const searchField = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;

    }
    catch(error){
        console.error("Error fetching random new",error);
        return [];
    }
}
//add event listener to button to search any things
searchbutton.addEventListener("click", async()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles);
        }catch(error) {
            console.log("Error fetching news by query",error)
        }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=50&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;

    }
    catch(error){
        console.error("Error fetching random new",error);
        return [];
    }
}


function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((articles)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title = document.createElement("h2");
        const truncatedTitle = articles.title.length >30 ? articles.title.slice(0,30) + "....":articles.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = articles.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        //after clicking go to new window
        blogCard.addEventListener("click",()=>{
            window.open(articles.url,"_blank");
        });

        blogContainer.appendChild(blogCard);
        
    });
}

(async () =>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();