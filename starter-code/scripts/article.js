var articles = [];

function Article (opts) {
  // TODO: Use the object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

// Define a method on the Article prototype
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  /* TODO: Now use jQuery to fill in the rest of the current
  template clone with properties from this particular Article instance.
  We need to fill in:
   1. author name,
   2. author url,
   3. article title,
   4. article body, and
   5. publication date as a datetime attribute. */
  $newArticle.attr('data-author', this.author);
  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  /* TODO: This cloned article is no longer a template,
   as it now has real data attached to it! We need to account
   for that and change it before this current article gets
   rendered to our DOM. */
  $newArticle.removeClass('template');
  return $newArticle;
};
// Sort our data by date published, descending order
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});
/* Now iterate through our transformed collection and instantiate
 a new Article instance for each object in our collection. */
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});
/* Append each Article to the DOM.
NOTE: Remember that the '.toHtml' method invoked is one WE created. */
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
