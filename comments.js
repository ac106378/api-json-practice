(function (window) {
  'use strict';
  var postcontainer = document.getElementById('post-container');
  var postCount = 0;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(function (posts) {
      posts.forEach(function (post) {
        var newPost = document.createElement('article');
        // create and append title
        var header = document.createElement('h2');
        header.setAttribute('data-posts', 'title');
        header.innerHTML = post.title;
        newPost.appendChild(header);

        // create and append text
        var text = document.createElement('p');
        text.setAttribute('data-posts', 'body');
        text.innerHTML = post.body.replace(/\n/g, '<br>');
        newPost.appendChild(text);

        // create and append button
        var button = document.createElement('button');
        button.setAttribute('data-posts', 'id');
        button.setAttribute('value', `${++postCount}`);
        button.setAttribute('type', 'button');
        button.innerHTML = 'Show Comments';
        newPost.appendChild(button);

        // create and append comment section in preparation to be filled
        var comments = document.createElement('section');
        comments.setAttribute('class', 'comments');
        comments.setAttribute('id', `comments-${postCount}`);
        comments.setAttribute('hidden', 'true');
        newPost.appendChild(comments);

        postcontainer.appendChild(newPost);
      });
    });
  window.onload = function () {
    // select all buttons with this attr
    const BUTTON_SELECTOR = '[data-posts="id"]';
    let buttons = document.querySelectorAll(BUTTON_SELECTOR);

    // for each button matching the selector
    buttons.forEach(function (button) {
      'use strict';

      let sectionSelector = `#comments-${button.value}`;
      let commentSection = document.querySelector(sectionSelector);

      button.addEventListener('click', function (event) {
        if (commentSection.hidden) {
          if (commentSection.hasChildNodes() === false) {
            // attach header
            let header = document.createElement('h3');
            header.innerHTML = 'Comments';
            commentSection.appendChild(header);
            // fetch and populate comments
            console.log('loading from api...');
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${button.value}`)
              .then(response => response.json())
              .then(function (comments) {
                comments.forEach(function (comment) {
                  // create and add comment body
                  let commentbody = document.createElement('p');
                  commentbody.setAttribute('data-comments', 'body');
                  commentbody.innerHTML = comment.body.replace(/\n/g, '<br>');
                  commentSection.appendChild(commentbody);

                  // attach address element to name
                  let name = document.createElement('a');
                  name.setAttribute('data-comments', 'email');
                  name.setAttribute('href', `mailto:${comment.email}`);
                  name.innerHTML = comment.name;

                  let address = document.createElement('address');
                  address.setAttribute('data-comments', 'name');
                  address.appendChild(name);
                  commentSection.appendChild(address);
                });
              });
          }
          commentSection.hidden = false;
          button.textContent = 'Hide comments';
        } else {
          commentSection.hidden = true;
          button.textContent = 'Show comments';
        }

        event.preventDefault();
      });
    });
  };
})(window);
