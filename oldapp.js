"use strict";

const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const BASE_URL = "http://api.giphy.com/v1/gifs";

let inputForm = $("#form");

/** handles what happens when submitting Giphy key */
function handleSubmit(evt) {
  evt.preventDefault();
  let searchVal = $("#giphySearch").val();
  // console.log(searchVal);
  addGiphy(searchVal);
}

/** takes in searchTerm and sends a request to GIPHY API and adds
 *  a new div with gif
 */
async function addGiphy(searchTerm) {
  let newDiv = $("<div>");
  let newGif = $("<img>");
  let giphy = await axios.get(
    `${BASE_URL}/search`,
    {
      params: {
        q: searchTerm,
        api_key: API_KEY
      }
    }
  );
  console.log(giphy.data.data['0']);
  let giphyLink = giphy.data.data['0'].images.original.url;
  newGif.attr("src", giphyLink);
  newDiv.append(newGif);
  $("#gifs").append(newDiv);
}

/** removes all gifs */
function removeAllGifs(){
  $("#gifs").empty();
}

const removeButton = $("#removeButt");
removeButton.on("click", removeAllGifs);

inputForm.on("submit", handleSubmit)


