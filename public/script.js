document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("event-form");
  const title = document.getElementById("event-name");
  const date = document.getElementById("event-date");
  const time = document.getElementById("event-time");
  const location = document.getElementById("event-location");
  const desc = document.getElementById("event-description");
  const list = document.getElementById("events");

  
  loadEventsFromStorage();

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (title.value.trim() === "" || date.value === "") {
      alert("Lütfen etkinlik adı ve tarih girin.");
      return;
    }
    
    const newEvent = {
      title: title.value,
      date: date.value,
      time: time.value,
      location: location.value,
      description: desc.value
    };

    
    saveEventToStorage(newEvent);
    
    
    renderEvent(newEvent);
    
    
    form.reset();
  });

  function renderEvent(event) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${event.title}</h3>
      <p><strong>Tarih:</strong> ${event.date}</p>
      <p><strong>Saat:</strong> ${event.time || 'Belirtilmemiş'}</p>
      <p><strong>Yer:</strong> ${event.location || 'Belirtilmemiş'}</p>
      <p>${event.description}</p>`;
    list.appendChild(li);
  }
  
  function saveEventToStorage(event) {
    
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    
    events.push(event);
    
    localStorage.setItem('events', JSON.stringify(events));
  }
  
  function loadEventsFromStorage() {
    
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    events.forEach(event => renderEvent(event));
  }

 
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  document.getElementById("next").addEventListener("click", () => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  });

  document.getElementById("prev").addEventListener("click", () => {
    slides[current].classList.remove("active");
    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add("active");
  });

  
  title.addEventListener("input", () => {
    if (title.value.trim().length < 3) {
      title.style.border = "2px solid red";
      title.title = "Title must be at least 3 characters.";
    } else {
      title.style.border = "2px solid green";
      title.title = "";
    }
  });

  date.addEventListener("input", () => {
    const today = new Date().toISOString().split("T")[0];
    if (date.value < today) {
      date.style.border = "2px solid red";
      date.title = "Date must be in the future.";
    } else {
      date.style.border = "2px solid green";
      date.title = "";
    }
  });
});

function sendEmail() {
  const name = document.getElementById("event-name").value;
  const date = document.getElementById("event-date").value;
  const time = document.getElementById("event-time").value;
  const location = document.getElementById("event-location").value;
  const description = document.getElementById("event-description").value;

  const subject = `Event Details: ${name}`;
  const body = `Event: ${name}\nDate: ${date}\nTime: ${time}\nLocation: ${location}\nDescription: ${description}`;

  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function addToCalendar() {
  alert("Takvime ekleme özelliği yakında aktif olacak!");
  
}