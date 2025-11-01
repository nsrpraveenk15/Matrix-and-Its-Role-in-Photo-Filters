# Matrix and Its Role in Photo Filters

**Matrix-Based Photo Filters** is an interactive web project that demonstrates how **linear algebra** — specifically **matrix multiplication** — can be used to manipulate and combine **photo filters** such as *Grayscale*, *Sepia*, *Invert*, *Warm*, and *Cool*, all using **HTML5 Canvas**, **CSS**, and **Vanilla JavaScript**.

---

## 🎯 Objective

This project bridges **mathematics** and **visual computing**, showing how pixel colors can be transformed using simple matrix operations.  
It provides a practical look at how **image processing** works at a low level — without external libraries or frameworks.

---

## 🖼️ Demo Features

✅ Upload any image  
✅ Apply multiple filters simultaneously  
✅ Adjust **individual filter intensity** in real time  
✅ Remove specific filters  
✅ Combine active filters into a **custom blend**  
✅ Save new custom filters  
✅ Reset the image to original  

---

## 📂 Project Structure

```
Matrix-and-Its-Role-in-Photo-Filters/
│
├── index.html      # Webpage structure  
├── style.css       # Layout and styling  
├── script.js       # Filter logic & matrix operations  
├── LICENSE         # MIT License  
└── README.md       # Documentation  
```

---

## ⚙️ How It Works

### 1. 🖼️ Image Upload
When an image is uploaded, it’s drawn onto an HTML `<canvas>`:

```js
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
```

This gives pixel-level access to the image’s RGBA data array.

---

### 2. 🎨 Matrix Representation of a Filter

Each filter is represented by a **4×5 color transformation matrix**, which defines how to compute new RGB values based on existing ones.

**Example – Grayscale Filter:**
```js
[
  0.33, 0.34, 0.33, 0, 0,
  0.33, 0.34, 0.33, 0, 0,
  0.33, 0.34, 0.33, 0, 0,
  0,    0,    0,    1, 0
]
```

Each row transforms **Red**, **Green**, and **Blue** components to create a new pixel color.

---

### 3. 🧮 Mathematical Formula

For every pixel `(R, G, B, A)`:

\[
\begin{bmatrix}
R' \\ G' \\ B' \\ A'
\end{bmatrix}
=
\begin{bmatrix}
m_{00} & m_{01} & m_{02} & m_{03} & m_{04} \\
m_{05} & m_{06} & m_{07} & m_{08} & m_{09} \\
m_{10} & m_{11} & m_{12} & m_{13} & m_{14} \\
m_{15} & m_{16} & m_{17} & m_{18} & m_{19}
\end{bmatrix}
\cdot
\begin{bmatrix}
R \\ G \\ B \\ A \\ 1
\end{bmatrix}
\]

---

### 4. 🧩 Visualization — How a Matrix Transforms a Pixel

```
Before Transformation (Original RGB):

   ┌──────┬──────┬──────┐
   │  R   │  G   │  B   │
   └──────┴──────┴──────┘

Transformation Matrix (4×5):

   ┌───────────────────────────────┐
   │ m00  m01  m02  m03  m04 │ → affects Red
   │ m05  m06  m07  m08  m09 │ → affects Green
   │ m10  m11  m12  m13  m14 │ → affects Blue
   │ m15  m16  m17  m18  m19 │ → affects Alpha
   └───────────────────────────────┘

After Multiplication:

   ┌──────────┬──────────┬──────────┐
   │   R'     │   G'     │   B'     │  ← new pixel color
   └──────────┴──────────┴──────────┘
```

This means every pixel’s RGB values are multiplied by the matrix and summed up, producing a new color.  
By tweaking the matrix values, you can create effects like *Sepia*, *Warm*, *Cool*, or even **custom tones**.

---

### 5. 🔢 Combining Filters

Each filter has an **intensity (0–2)**.  
When multiple filters are active, the script computes a **weighted average** of their matrices:

```js
let finalMatrix = new Array(20).fill(0);
filtersApplied.forEach(f => {
  for (let i = 0; i < 20; i++) {
    finalMatrix[i] += f.matrix[i] * f.intensity;
  }
});
```

The **final matrix** is then applied to the image — giving a **smooth blended effect**.

---

## 💡 Practical Use Cases of Matrix Filters

This same mathematical foundation is used in:

🎨 **Photo Editors** – Brightness, contrast, and color balance tools (Photoshop, GIMP)  
📱 **Social Media Filters** – Real-time tone adjustments (Instagram, Snapchat)  
🤖 **AI / Computer Vision** – Image preprocessing and normalization  
🕹️ **Graphics Programming** – Shader-based color transformations (WebGL, OpenGL)

---

## 🧰 Technologies Used

- **HTML5 Canvas** – Pixel rendering & manipulation  
- **CSS3** – Responsive layout and visuals  
- **JavaScript (ES6)** – Logic, event handling, and matrix math  

---

## 🧮 Educational Insight

This project turns **linear algebra into a visual experiment**:

> Matrices are not abstract — they transform images, not just numbers.  
> You can literally *see* the math in action, where equations become filters and numbers become art.

---

## 📜 License

This project is released under the **MIT License**.  
You’re free to use, modify, and distribute this code with proper attribution.

```
MIT License © 2025 NSR Praveen Kumar
```

---

## 💡 Inspiration

This project was built to visualize how a simple **4×5 matrix** can completely redefine how we see an image.  
It’s **math, art, and code — working together.**

**Created by:** NSR Praveen Kumar
