// ==UserScript==
// @name         anilist-to-mal
// @namespace    akatroj.github.io
// @version      1.0.0
// @author       Akatroj
// @description  Adds a button on anilist anime pages that links to the same anime entry on MAL
// @icon         https://vitejs.dev/logo.svg
// @updateURL    https://github.com/Akatroj/anilist-to-mal/raw/deploy/dist/anilist-to-mal.user.js
// @match        *://anilist.co/anime/*
// @connect      graphql.anilist.co
// ==/UserScript==

(t=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.innerText=t,document.head.appendChild(e)})(".ow84u20{background-color:#000;text-align:center;color:#fff;padding:50px;border-radius:15px;position:fixed;top:50%;left:20%;z-index:1000;cursor:pointer}");

(function() {
  "use strict";
  const button_css_ts_vanilla = "";
  var button = "ow84u20";
  function createButton(text, onClick) {
    const element = document.createElement("button");
    element.className = button;
    element.innerText = text;
    element.addEventListener("click", onClick);
    return element;
  }
  async function graphqlRequest(endpoint, {
    query,
    variables
  }) {
    const body = JSON.stringify({ query, variables });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json", Accept: "application/json" },
      body
    });
    const { data } = await response.json();
    return data;
  }
  async function fetchMalId(anilistId) {
    const {
      Media: { id, idMal }
    } = await graphqlRequest(anilistApiEndpoint, {
      query: querySingle,
      variables: {
        anilistId
      }
    });
    console.log(`anilistId: ${id}, malId: ${idMal}`);
    return idMal;
  }
  const anilistApiEndpoint = "https://graphql.anilist.co/";
  const querySingle = (
    /* GraphQL */
    `
query ($anilistId: Int) {
    Media(id: $anilistId, type: ANIME) {
      id,
      idMal
    }
}
`.replace(/(^[\s]+)|(\n)/gm, "")
  );
  const URL_REGEX = /(?:anilist\.co\/anime\/)(?<id>.*)\//;
  async function addButton() {
    var _a, _b;
    const anilistId = (_b = (_a = document.URL.match(URL_REGEX)) == null ? void 0 : _a.groups) == null ? void 0 : _b.id;
    console.log(document.URL.match(URL_REGEX));
    if (!anilistId)
      throw new Error("No id found in url");
    const malIdPromise = fetchMalId(anilistId);
    const button2 = createButton("Go to MAL", async () => {
      const malId = await malIdPromise;
      window.location.href = `https://myanimelist.net/anime/${malId}/`;
    });
    document.body.appendChild(button2);
  }
  addButton();
})();
