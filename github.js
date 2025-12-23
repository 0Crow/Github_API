const TOKEN = "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";

function loadRepos() {
  const username = document.getElementById("username").value.trim();
  const repoContainer = document.getElementById("repos");
  const profileContainer = document.getElementById("profile"); 
  if (!username) {
    profileContainer.innerHTML = "";
    alert("Please enter a username.");
    return;
  }

  profileContainer.innerHTML = "Loading profile...";
  repoContainer.innerHTML = "Loading repositories...";

  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "Authorization": `token ${TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  })
    .then(res => res.json())
    .then(user => {
      if (user.message) {
        profileContainer.innerHTML = user.message;
        repoContainer.innerHTML = "";
        return;
      }

      profileContainer.innerHTML = `
        <img src="${user.avatar_url}">
        <p>${user.login}</p>
        <p>${user.bio || "No bio available"}</p>
        <p>👥 ${user.followers} followers | ${user.following} following</p>
        <p>📦 Public repos: ${user.public_repos}</p>
      `;
    })
    .catch(err => {
      profileContainer.innerHTML = "Error loading profile";
      console.error(err);
    });

  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      "Authorization": `token ${TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  })
    .then(res => res.json())
    .then(data => {
      repoContainer.innerHTML = "";

      if (data.message) {
        repoContainer.textContent = data.message;
        return;
      }

      data.forEach(repo => {
        const div = document.createElement("div");
        div.className = "repo";
        div.innerHTML = `
          <h3>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </h3>
          <p>${repo.description || "No description"}</p>
          <span>⭐ ${repo.stargazers_count}</span>
          <span> | 🧑‍💻 ${repo.language || "N/A"}</span>
        `;
        repoContainer.appendChild(div);
      });
    })
    .catch(err => {
      repoContainer.textContent = "Error loading repositories";
      console.error(err);
    });
}

