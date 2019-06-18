"use strict";

class ArticleLoader {
  constructor () {
    this.articles = [];
    this.currentIndex = 0;
  }

  initialize () {
    return new Promise(
      (resolve, reject) => {
        fetch("https://www.collaction.hk/api/extradition_objective?token=mzFly3aDBwWQpnJaHol60A2I9lYccTLy92lyN3QorQbfgLkO5ifxauPOuBF1")
        //fetch("https://assets.collaction.hk/extradition_objective_list.json")
          .then(
            res => {
              if (res.ok) {
                return res.json();
              }
              reject();
            }
          )
          .then(
            res => {
              this.articles = res.data;
              resolve(res.data);
            }
          );
      }
    );
  }

  get (length = 10) {
    return this._getArticles(this.currentIndex, this.currentIndex += length);
  }

  _getArticles (start, end) {
    return this._compileArticles(start, end);
  }

  _compileArticles (start = 0, end = undefined) {
    return this.articles
      .slice(start, end)
      .map(
        (article) => {
          let btns = Array
            .from(new DOMParser().parseFromString(article.content, "text/xml")
              .getElementsByTagName("a"))
            .reduce(
              (acc, val) => {
                val.classList.add("fa-icon");
                val.classList.add("badge");
                acc += val.outerHTML;
                return acc;
              },
              ""
            );
          return `<article class="post">
                    <a class="h3 text-white post-title" target="_blank" href="${article.url}">${article.title}</a>
                    <p class="post-time fa-icon mb-1">${article.datetime}</p>
                    <div class="post-content">${btns}</div>
                  </article>`;
        }
      );
  }
}
