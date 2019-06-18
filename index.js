"use strict";

const loader = new ArticleLoader();

window.addEventListener(
  "load",
  () => {
    loader.initialize().then(
      () => {
        let innerHTML = loader.get(10)
          .reduce(
            (acc, val, idx, arr) => {
              acc += val;
              if (idx + 1 < arr.length) {
                acc += `<hr class="bg-white">`;
              }
              return acc;
            },
            ""
          );
        /* if (loader.articles.length > 10) {
          innerHTML += `<div class="text-center">
                          <button id="load-more" class="btn btn-sm btn-light">
                            Load More
                          </button>
                        </div>`;
        } */
        document.getElementById("articles").innerHTML = innerHTML;
      },
      () => {
        document.getElementById("articles").innerHTML = ``;
      }
    );
  }
);

document
  .getElementById("news")
  .addEventListener(
    "click",
    (evt) => {
      if (evt.target.id === "load-more") {
        let addition = loader
          .get(10)
          .reduce(
            (acc, val, idx, arr) => {
              acc += val;
              if (idx + 1 < arr.length) {
                acc += `<hr class="bg-white">`;
              }
              return acc;
            },
            ""
          );
        if (addition.length > 0) {
          document.getElementById("articles").innerHTML += `<hr class="bg-white">`;
          document.getElementById("articles").innerHTML += addition;
        } else {
          document.getElementById("load-more").classList.add("d-none");
        }
      }
    }
  );
