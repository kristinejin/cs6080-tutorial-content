// const ul = document.createElement('ul');
// document.body.appendChild(ul);

// const li = document.createElement('li');
// ul.appendChild(li);
// li.innerText = 'hayden';

// fetch('http://localhost:3000/users');
// fetch('http://localhost:3000/user/0');

// https://ericpullukaran.com/blogs/nested-fetching-a-deep-dive

const getUsers = new Promise((resolve, reject) => {
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((userIds) => {
      Promise.all(
        userIds.map((userId) =>
          fetch(`http://localhost:3000/user/${userId}`).then((res) =>
            res.json()
          )
        )
      )
        .then((users) => resolve(users))
        .catch((err) => reject(err));
    });
});

// How to use our promise:
getUsers.then((usersDetails) => console.log(usersDetails));
