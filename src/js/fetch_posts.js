/* So this is the basics for fetching the posts from the URL specified in const
*  The json file is located under a personal domain that team member owns,
*  And using cpanel, the json file was manually uploaded and a simple php file generated to be able to fetch the json data.
* */

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