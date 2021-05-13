let sourceImg;
let sourceDiv;
let targetImg;
let targetDiv;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  // ev.dataTransfer.setData("text", ev.target.id);
  sourceImg = ev.path[0];
  sourceDiv = ev.path[1];
}

function drop(ev) {
  // ev.preventDefault();
  // var data = ev.dataTransfer.getData("text");
  // ev.target.appendChild(document.getElementById(data));
  targetImg = ev.path[0];
  targetDiv = ev.path[1];

  const container1 = document.getElementById(sourceDiv.id);
  const container2 = document.getElementById(targetDiv.id);
  const img1 = document.getElementById(sourceImg.id);
  const img2 = document.getElementById(targetImg.id);

  container1.innerHTML = '';
  container1.appendChild(img2);
  container2.innerHTML = '';
  container2.appendChild(img1);
}
