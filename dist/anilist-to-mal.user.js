// ==UserScript==
// @name         anilist-to-mal
// @namespace    akatroj.github.io
// @version      1.0.1
// @author       Akatroj
// @description  Adds a button on anilist anime pages that links to the same anime entry on MAL
// @icon         https://vitejs.dev/logo.svg
// @downloadURL  https://github.com/Akatroj/anilist-to-mal/raw/deploy/dist/anilist-to-mal.user.js
// @updateURL    https://github.com/Akatroj/anilist-to-mal/raw/deploy/dist/anilist-to-mal.user.js
// @match        *://anilist.co/anime/*
// @connect      graphql.anilist.co
// ==/UserScript==

(I=>{const M=document.createElement("style");M.dataset.source="vite-plugin-monkey",M.innerText=I,document.head.appendChild(M)})("._button_6u4mv_1{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgPHJlY3Qgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImZpbGw6IzJlNTFhMiIvPgogICA8cGF0aCBkPSJNNDMyLjQ5IDQxMC42MVY1OTAuM2wtNDQuODYtLjA2VjQ3OWwtNDMuMzEgNTEuMjktNDIuNDMtNTIuNDQtLjQzIDExMi43NUgyNTZWNDEwLjY1aDQ3bDM5Ljc5IDU0LjI5IDQzLTU0LjMxem0xODQuMDYgNDQuMTQuNTMgMTM1LjE1aC01MC40NWwtLjE3LTYxLjI1aC01OS43M2MxLjQ5IDEwLjY1IDQuNDggMjcgOC45IDM4IDMuMzEgOC4xMyA2LjM2IDE2IDEyLjQ0IDI0LjA2bC0zNi4zNyAyNGMtNy40NS0xMy41Ny0xMy4yNy0yOC41Mi0xOC43My00NC40MmExOTguMzEgMTk4LjMxIDAgMCAxLTEwLjgyLTQ2LjQ5Yy0xLjgxLTE2LTIuMDctMzEuMzggMi4yOC00Ny4xOWE4My4zNyA4My4zNyAwIDAgMSAyNC43Ny0zOS44MWM2LjY4LTYuMjUgMTYtMTAuNjcgMjMuNDctMTQuNjZzMTUuODUtNS42MyAyMy42Mi03LjY2YTE1OCAxNTggMCAwIDEgMjUuNDEtMy45YzguNDktLjczIDIzLjYyLTEuNDEgNTEtLjZsMTEuNjMgMzcuMzFoLTU4Ljc4Yy0xMi42NS4xNy0xOC43MyAwLTI4LjYxIDQuNDZhNDcuNyA0Ny43IDAgMCAwLTI3LjI2IDQxbDU2LjgxLjcuODEtMzguNjFoNDkuMjZ6TTcwMS43MiA0MTB2MTQxLjM1TDc2OCA1NTJsLTkuMTcgMzcuODdINjU2LjI4VjQwOS4zM3oiIHN0eWxlPSJmaWxsOiNmZmYiLz4KPC9zdmc+Cg==);background-size:cover;height:35px;padding:0 14px;aspect-ratio:1;z-index:1000;border-radius:5px;cursor:pointer;outline:none;border:none}");

(function() {
  var _a, _b;
  "use strict";
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
  async function fetchMalId(anilistId2) {
    const {
      Media: { id, idMal }
    } = await graphqlRequest(anilistApiEndpoint, {
      query: querySingle,
      variables: {
        anilistId: anilistId2
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
  const button = "_button_6u4mv_1";
  const styles$1 = {
    button
  };
  function createMALButton(malId) {
    const button2 = document.createElement("button");
    button2.title = "Go to MAL";
    button2.className = styles$1.button;
    button2.onclick = async () => {
      window.location.href = `https://myanimelist.net/anime/${await malId}/`;
    };
    return button2;
  }
  async function addButton(anilistId2) {
    const buttonContainer = document.querySelector("div.actions");
    if (!buttonContainer)
      throw new Error("Cannot find button container!");
    const malIdPromise = fetchMalId(anilistId2);
    const button2 = createMALButton(malIdPromise);
    buttonContainer.appendChild(button2);
  }
  const styles = "#app\n  > div.page-content\n  > div\n  > div.header-wrap\n  > div.header\n  > div\n  > div.cover-wrap.overlap-banner\n  > div\n  > div {\n  display: grid;\n  grid-template-columns: auto 35px 35px;\n  margin-bottom: 20px;\n  margin-top: 20px;\n  grid-gap: 7px;\n}\n";
  function overrideAnilistStyles() {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }
  overrideAnilistStyles();
  const URL_REGEX = /(?:anilist\.co\/anime\/)(?<id>.*)\//;
  const anilistId = (_b = (_a = document.URL.match(URL_REGEX)) == null ? void 0 : _a.groups) == null ? void 0 : _b.id;
  if (!anilistId)
    throw new Error("No id found in url");
  setTimeout(() => {
    addButton(anilistId);
  }, 300);
})();
