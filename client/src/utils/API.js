// import axios from "axios";
// var express = require("express");
var cheerio = require("cheerio");
// Initialize Express
// var app = express();

export default {
  // Gets all articles
  getArticles: async function() {
    console.clear();
    console.log('GET ARTICLES');
    // console.log("getArticles is being called - inside API.js", await axios.get("/api/articles"));
    // return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    // return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    // return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    console.log("saaveArticle is being called - inside API.js");
    // Write the logic for scrape ?
    // return axios.post("/api/articles", articleData);
  }
};
