// ---------- Filter Matrices ----------
const filterMatrices = {
  Grayscale: [
    0.33,0.34,0.33,0,0,
    0.33,0.34,0.33,0,0,
    0.33,0.34,0.33,0,0,
    0,0,0,1,0
  ],
  Sepia: [
    0.393,0.769,0.189,0,0,
    0.349,0.686,0.168,0,0,
    0.272,0.534,0.131,0,0,
    0,0,0,1,0
  ],
  Invert: [
    -1,0,0,0,255,
    0,-1,0,0,255,
    0,0,-1,0,255,
    0,0,0,1,0
  ],
  Brighten: [
    1.2,0,0,0,20,
    0,1.2,0,0,20,
    0,0,1.2,0,20,
    0,0,0,1,0
  ],
  Contrast: [
    1.5,0,0,0,-40,
    0,1.5,0,0,-40,
    0,0,1.5,0,-40,
    0,0,0,1,0
  ],
  Cool: [
    1,0,0,0,0,
    0,1,0,0,0,
    0,0,1.3,0,10,
    0,0,0,1,0
  ],
  Warm: [
    1.2,0,0,0,10,
    0,1.1,0,0,0,
    0,0,0.9,0,0,
    0,0,0,1,0
  ]
};

let filtersApplied = [];
let originalImage = null;

const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");

// ---------- Load Image ----------
document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = URL.createObjectURL(file);
});

// ---------- Create Filter Buttons ----------
const filterContainer = document.getElementById("filters");
Object.keys(filterMatrices).forEach(name => {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.onclick = () => addFilter(name);
  filterContainer.appendChild(btn);
});

// ---------- Apply Filter ----------
function applyAllFilters() {
  if (!originalImage) return;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // combine all filters linearly based on intensity
  let finalMatrix = new Array(20).fill(0);
  let totalWeight = 0;
  filtersApplied.forEach(f => {
    totalWeight += f.intensity;
    for (let i = 0; i < 20; i++) {
      finalMatrix[i] += f.matrix[i] * f.intensity;
    }
  });
  if (totalWeight > 0) {
    finalMatrix = finalMatrix.map(v => v / totalWeight);
  } else return ctx.putImageData(imgData, 0, 0);

  // Apply finalMatrix
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4);
    data[i]   = r * finalMatrix[0] + g * finalMatrix[1] + b * finalMatrix[2] + finalMatrix[4];
    data[i+1] = r * finalMatrix[5] + g * finalMatrix[6] + b * finalMatrix[7] + finalMatrix[9];
    data[i+2] = r * finalMatrix[10]+ g * finalMatrix[11]+ b * finalMatrix[12]+ finalMatrix[14];
    data[i+3] = a;
  }

  ctx.putImageData(imgData, 0, 0);
}

// ---------- Add Filter ----------
function addFilter(name) {
  filtersApplied.push({
    name,
    matrix: filterMatrices[name],
    intensity: 1
  });
  renderFilterTags();
  applyAllFilters();
}

// ---------- Render Active Filters ----------
function renderFilterTags() {
  const container = document.getElementById("active-filters");
  container.innerHTML = "";
  filtersApplied.forEach((f, idx) => {
    const div = document.createElement("div");
    div.className = "filter-tag";
    div.innerHTML = `
      <div>${f.name}</div>
      <div class="filter-controls">
        <input type="range" min="0" max="2" step="0.1" value="${f.intensity}" 
          oninput="changeIntensity(${idx}, this.value)">
        <span class="remove" onclick="removeFilter(${idx})">✖</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// ---------- Intensity Adjustment ----------
function changeIntensity(index, val) {
  filtersApplied[index].intensity = parseFloat(val);
  applyAllFilters();
}

// ---------- Remove Filter ----------
function removeFilter(index) {
  filtersApplied.splice(index, 1);
  renderFilterTags();
  applyAllFilters();
}

// ---------- Combine Filters (Stable blend) ----------
function combineFilters() {
  if (filtersApplied.length < 2)
    return alert("Need at least 2 filters to combine!");

  let combined = new Array(20).fill(0);
  let totalWeight = 0;
  filtersApplied.forEach(f => {
    const w = f.intensity || 1;
    totalWeight += w;
    for (let i = 0; i < 20; i++) {
      combined[i] += f.matrix[i] * w;
    }
  });
  combined = combined.map(v => v / totalWeight);

  filtersApplied = [{
    name: "Custom Blend",
    matrix: combined,
    intensity: 1.0
  }];

  renderFilterTags();
  applyAllFilters();
}

// ---------- Save Custom Filter ----------
function saveAsNewFilter() {
  const blend = filtersApplied.find(f => f.name === "Custom Blend");
  if (!blend) return alert("No custom blend found!");
  const name = prompt("Enter a name for your new filter:");
  if (name) {
    filterMatrices[name] = blend.matrix;
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => addFilter(name);
    filterContainer.appendChild(btn);
    alert(`✅ Saved new filter: ${name}`);
  }
}

// ---------- Reset Filters ----------
function resetFilters() {
  filtersApplied = [];
  renderFilterTags();
  applyAllFilters();
}
