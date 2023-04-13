"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const SHOWS_BASE_URL = "https://api.tvmaze.com/"
const SEARCH_ENDPOINT = "search/shows";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getCatImg() {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  let catResponse = await axios({
    params: {q: "cat"},
    method: "GET",
    baseURL: SHOWS_BASE_URL,
    url: SEARCH_ENDPOINT,
  })

  return catResponse;
}


async function getShowsByTerm(searchTerm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  let response = await axios({
    params: {q: searchTerm},
    method: "GET",
    baseURL: SHOWS_BASE_URL,
    url: SEARCH_ENDPOINT,
  })

  const showData = [];
  for (let show of response.data){
    const showObject = {};
    showObject.id = show.show.id;
    showObject.name = show.show.name;
    showObject.summary = show.show.summary;
    if (show.show.image){
      showObject.image = show.show.image.medium;
    }
    else{
      // let cat = await getCatImg();

      // console.log(cat);
      // showObject.image = cat.data[6].image.medium;

    }

    showData.push(showObject);
  }

  console.log("showData", showData);

  return showData;
}


/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.empty();
  for (const show of shows) {

    const $name = `<h3>${show.name}</h3>`;
    const $id = `<p>id: ${show.id}</p>`;
    const $summary = `<p>${show.summary}</p>`;
    const $image = `<img src="${show.image}">`;
    $showsList.append($name);
    $showsList.append($id);
    $showsList.append($summary);
    $showsList.append($image);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const searchTerm = $("#searchForm-term").val();
  const shows = await getShowsByTerm(searchTerm);

  $episodesArea.hide();
  displayShows(shows);
}

$searchForm.on("submit", async function handleSearchForm (evt) {
  evt.preventDefault();
  await searchShowsAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function displayEpisodes(episodes) { }

// add other functions that will be useful / match our structure & design
