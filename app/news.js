function getNewsFeed(source, APIkey){
  var newsQuery = 'https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + APIkey;
  var newsRequest = $.ajax({
      url: newsQuery,
      method: "GET",
    });

    newsRequest.done(function( msg ) {
      console.log('News: ');
      console.log(msg);

      var i = 0;
      msg.articles.forEach(function(){
        var thisArticle = msg.articles[i];
        $("#news-container").append('<div class="news-single"> <h2 class="headline">' + thisArticle.title + '</h2> <div class="by-line"><span class="source">' + source + '</span> - <span class="author">' + thisArticle.author + '</span></div> </div>');
        console.log(thisArticle.title);
        i++;
      });
    });
}

function getRedditFeed(subreddit, sort, count){
  $('#subreddit').html('');
  $('#subreddit').append(subreddit);
  if(sort){
    //Do Nothing
  }else{
    sort = 'hot';
  }
  
  if(count){
    //Do Nothing
  }else{
    count = 20;
  }
  console.log('Reddit Count is ' + count);
  var redditQuery = 'https://www.reddit.com/r/' + subreddit + '/' + sort + '/.json?count=' + count;
  console.log(redditQuery);
  var redditRequest = $.ajax({
      url: redditQuery,
      method: "GET",
    });
  
    redditRequest.done(function( msg ) {
      $("#reddit-container").html('');
      console.log('Reddit: ');
      //console.log(msg.data.children);
      var r = 0;
      
      while(r < count){
        console.log(msg.data.children[r]);
        var thisPost = msg.data.children[r].data;

        $("#reddit-container").append('<div class="reddit-single"><div class="title">' + thisPost.title + '</div><div class="domain">' + thisPost.domain + '</div><div class="author">u/' + thisPost.author + '</div></div>');        
        r++;
      }

    });
}