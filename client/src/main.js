const API_BASE_URL = 'https://mood-journal-1c99.onrender.com';

const form = document.getElementById("moodForm");
const moodList = document.getElementById("moodList");

// Handle mood form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mood = document.getElementById("mood").value;
  const description = document.getElementById("description").value;

  const response = await fetch(`${API_BASE_URL}/moods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, description })
  });

  if (response.ok) {
    form.reset();
    loadMoods();
  } else {
    alert("Error logging mood");
  }
});

// Fetch moods from backend and display them
async function loadMoods() {
  const res = await fetch(`${API_BASE_URL}/moods`);
  const moods = await res.json();

  moodList.innerHTML = "";

  moods.forEach(({ mood, description, createdAt }) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${mood}</strong><br>${description}<br><small>${new Date(createdAt).toLocaleString()}</small>`;
    moodList.appendChild(li);
  });
}

// Load existing moods on page load
loadMoods();
