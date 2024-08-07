const track = document.getElementById("image-track");	
const luz = document.getElementById("luz");
const names = document.querySelectorAll(".name");
const name = document.getElementById('name');
const image1 = document.getElementById('image-container-1');

image1.addEventListener('click', function(event) {
  
});


window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => { 
  if(track.dataset.mouseDownAt === "0") return;

  const mousedelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mousedelta / maxDelta) * -100;
  const nextpercenttage = parseFloat(track.dataset.prevPercentage) + percentage;
  const limitedNextPercentage = Math.min(0, Math.max(-100, nextpercenttage));

  track.dataset.percentage = limitedNextPercentage;

  track.style.transform = `translate(${limitedNextPercentage}%, -50%)`;
  track.animate({
    transform: `translate(${nextpercenttage}%, -50%)`
  }, {
    duration: 1200, 
    fill: "forwards"
  });
  for(const image of track.getElementsByClassName("image")) {
    image.style.objetposition.animate({
      transform: `translate(${limitedNextPercentage + 100} 50%)`
    }, {
      duration: 1200, 
      fill: "forwards"
    });
  }
}

document.body.onmousemove = Event => {
  console.log('CACA1', names);
  const { clientX, clientY } = Event;
  const reversedNames = Array.from(names).reverse();
  reversedNames.forEach((name, index) => {
    name.style.transform = `translate(-${(clientX/window.screen.width) * (index * 2)}%, -${(clientY/window.screen.height) * (index * 2)}%)`;
    console.log('CACA', name.style.transform);
  });
  luz.style.left = `${clientX}px`;
  luz.style.top = `${clientY}px`;
};

document.addEventListener('mousemove', function(event) {
  const { clientX, clientY } = event;
  const imageContainers = document.querySelectorAll('.image-container');
  imageContainers.forEach((container) => {
    const rect = container.getBoundingClientRect();
    const x = -((clientX - rect.left) / rect.width) * 50 - 25; // -25 to 25 range
    const y = -((clientY - rect.top) / rect.height) * 50 - 25; // -25 to 25 range
    container.style.boxShadow = `${x/10}px ${y/10}px 14px   rgba(255, 255, 255, 0.2)`;
    name.style.textShadow = `${x/10}px ${y/10}px 14px rgba(255, 255, 255, 0.2)`;
  });
});
document.addEventListener('mousemove', function(event) {
  const { clientX, clientY } = event;
  const imageContainers = document.querySelectorAll('.image-container');

  imageContainers.forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    const x = -((clientX - rect.left) / rect.width) * 50 - 25; // -25 to 25 range
    const y = -((clientY - rect.top) / rect.height) * 50 - 25; // -25 to 25 range
    container.style.boxShadow = `${x}px ${y}px 20px rgba(0, 0, 0, 0.2)`;

    // Aplica la misma sombra a los nombres
    if (name[index]) {
      name[index].style.textShadow = `${x}px ${y}px 20px rgba(0, 0, 0, 0.2)`;
    }
  });
});
