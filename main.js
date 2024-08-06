const track = document.getElementById("image-track");	

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => { 
  if(track.dataset.mouseDownAt === "0") return;

  const mousedelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  const percentage = (mousedelta / maxDelta) * -100,
        nextpercenttage = parseFloat(track.dataset.prevPercentage) + percentage;

  track.style.transform = `translate(${percentage}%, -50%)`;
}
