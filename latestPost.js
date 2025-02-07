//setup markdown-it
var md = window.markdownit({
	linkify: true,
	breaks: false
});

var query = {
  limit: 10,
  tag: 'ajayyy'
}

//list of posts to remove from view
var blacklist = ['exclude-self-votes-from-human-input-for-bot', 'youtube-watch-history-statistics-viewer-logo', '3d-models-for-voster-coaster-food-stalls', 'adding-commands-to-a-discord-bot', 'sync-your-utopian-posts-on-to-your-website', '3d-model-task-request-for-voster-coaster-or-roller-coaster-cart-1535478624679'];

steem.api.setOptions({ url: "https://api.steemit.com" });

steem.api.getDiscussionsByBlog(query, function(err, result) {
  if(!err){

    //this will be set by the for loop
    var post = null;

    //find the post with the specified tags
    for(var i = 0; i < result.length; i++) {
      if(result[i].category === 'utopian-io' && JSON.parse(result[i].json_metadata).tags.indexOf('development')  > -1 && blacklist.indexOf(result[i].permlink) < 0 && result[i].author === "ajayyy"){
        post = result[i];
        break;
      }
    }

    if(post === null) {
      document.getElementById('recentPostTitle').innerHTML = "Error Fetching Post";
    } else {
      document.getElementById('recentPostTitle').innerHTML = post.title;
	  document.getElementById('recentPostDate').innerHTML = "Posted " + post.created.split("T")[0];
      //convert the markdown to HTML
      document.getElementById('recentPostBody').innerHTML = md.render(post.body);
      //Highlight code
      hljs.initHighlighting();
    }
  }
});
