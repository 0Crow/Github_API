// GitHub personal access token for authenticated API requests
const TOKEN = "Your_Token_Key_Here";

// Main function to load profile and repositories
function loadRepos() {

  // Get username input value
  const username = document.getElementById("username").value.trim();

  // Repository list container
  const repoContainer = document.getElementById("repos");

  // Profile container
  const profileContainer = document.getElementById("profile"); 

  // Check if username is empty
  if (!username) {
    profileContainer.innerHTML = "";
    alert("Please enter a username.");
    return;
  }

  // Show loading messages
  profileContainer.innerHTML = "Loading profile...";
  repoContainer.innerHTML = "Loading repositories...";

  // Fetch GitHub user profile
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "Authorization": `token ${TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  })
    .then(res => res.json())
    .then(user => {

      // Handle user not found or API error
      if (user.message) {
        profileContainer.innerHTML = user.message;
        repoContainer.innerHTML = "";
        return;
      }

      // Display user profile information
      profileContainer.innerHTML = `
        <img src="${user.avatar_url}">
        <p>${user.login}</p>
        <p>${user.bio || "No bio available"}</p>
        <p>👥 ${user.followers} followers | ${user.following} following</p>
        <p>📦 Public repos: ${user.public_repos}</p>
      `;
    })
    .catch(err => {
      // Handle profile fetch error
      profileContainer.innerHTML = "Error loading profile";
      console.error(err);
    });

  // Fetch repositories of the user
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      "Authorization": `token ${TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  })
    .then(res => res.json())
    .then(data => {
      repoContainer.innerHTML = "";

      // Handle repository API error
      if (data.message) {
        repoContainer.textContent = data.message;
        return;
      }

      // Loop through each repository
      data.forEach(repo => {
        const div = document.createElement("div");
        div.className = "repo";

        // Insert repository details
        div.innerHTML = `
          <h3>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </h3>
          <p>${repo.description || "No description"}</p>
          <span>⭐ ${repo.stargazers_count}</span>
          <span> | 🧑‍💻 ${repo.language || "N/A"}</span>
        `;

        // Add repository card to container
        repoContainer.appendChild(div);
      });
    })
    .catch(err => {
      // Handle repository fetch error
      repoContainer.textContent = "Error loading repositories";
      console.error(err);
    });
}

