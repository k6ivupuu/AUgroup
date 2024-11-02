/* So this is the basics for fetching the posts from the URL specified in const
*  The json file is located under a personal domain that team member owns,
*  And using cpanel, the json file was manually uploaded and a simple php file generated to be able to fetch the json data.
* */
/*
const url = 'http://koivupuu.ee/serve-json.php';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("donkey magic")
        console.log('JSON data:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const url = 'https://gist.githubusercontent.com/Einsoor/07bc3cbf4b93bdc5f320b5711df64158/raw/22f7e82cfba54846c7e98e177b3a08e56361b4dc/posts.json';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched JSON data:', data);
        renderPosts(data.Posts); 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
*/

//fetch works the same with local and remote files, so we basically only need to change the url to the file path
//just added another error message aswell

const url = '/src/assets/data/posts.json'

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.Posts) {
            console.log('Fetched JSON data:', data);
            renderPosts(data.Posts);
        } else {
            console.error('No posts found in the response data.');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function renderPosts(posts) {
    const postFeed = document.querySelector('.postfeed');
    postFeed.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.id = post.reference;

        postElement.innerHTML = `
            <div class="post-header">
                <span style="font-size: 24px;">👤</span>
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
            </div>
            <h1>${post.title}</h1>
            ${post.image ? `<img src="${post.image.src}" alt="${post.image.name}" class="post-image">` : ''}
            <p>${post.content}</p>
            <div>
                <button class="like-button">👍 Like</button>
            </div>
        `;

        postFeed.appendChild(postElement);
    });
}

