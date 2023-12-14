let nums = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
let currentDigit = 0;
//p5.js
function drawDigit(val) {
  let canvas = createCanvas(400, 400);
  let containerBackgroundColor = window
    .getComputedStyle(document.body)
    .getPropertyValue("background-color");
  canvas.style("background-color", containerBackgroundColor); // Set canvas background dynamically

  fill(color("brown"));
  stroke(color("brown"));

  // Center the canvas horizontally and vertically
  let x = (width - 200) / 2;
  let y = (height - 300) / 2;

  translate(x, y); //menggeser kordinat titik x dan y
  sevenSegment(val); //menggambar pola sesuai input
  displayTruthTable(val); //menampilkan truth table
}

function setup() {
  drawDigit(nums[currentDigit]); //saya akan mengakses array num sesuai dengan current digit
}

function getColor(val, shift) {
  // val untuk menenentukan warna nya dan shift disini untuk melakukan pergeseran bit
  let r = 196;
  let g = 84;
  let b = 0;
  let a = 40 + 255 * ((val >> shift) & 1); // untuk melakukan pergeseran bit
  return color(r, g, b, a);
}

function sevenSegment(val) {
  push(); // mengubah sesuai function
  noStroke();
  noFill();
  // A
  fill(getColor(val, 6));
  rect(60, 20, 78, 18, 10, 10);
  //60: Koordinat x (horizontal) dari sudut kiri atas persegi panjang.
  // 20: Koordinat y (vertikal) dari sudut kiri atas persegi panjang.
  // 78: Lebar dari persegi panjang.
  // 18: Tinggi dari persegi panjang.
  // 10: Radius sudut atas kiri (corner radius) pada sumbu x.
  // 10: Radius sudut atas kiri (corner radius) pada sumbu y.
  // B
  fill(getColor(val, 5));
  rect(140, 40, 18, 98, 10, 10);
  // C
  fill(getColor(val, 4));
  rect(140, 160, 18, 98, 10, 10);
  // D
  fill(getColor(val, 3));
  rect(60, 260, 78, 18, 10, 10);
  // E
  fill(getColor(val, 2));
  rect(40, 160, 18, 98, 10, 10);
  // F
  fill(getColor(val, 1));
  rect(40, 40, 18, 98, 10, 10);
  // G
  fill(getColor(val, 0));
  rect(60, 140, 78, 18, 10, 10);

  pop(); //mengembalikan ke awal
}

function updateDigit() {
  let input = document.getElementById("digitInput").value;
  let digit = parseInt(input);

  if (!isNaN(digit) && digit >= 0 && digit <= 9) {
    // memeriksa apakah input itu angka dan dalam rentang 0-9
    currentDigit = digit;
    drawDigit(nums[currentDigit]); // Perbarui tampilan dengan digit yang diminta
  }
}

function generateRandomDigit() {
  let randomDigit = Math.floor(Math.random() * 10);
  document.getElementById("digitInput").value = randomDigit;
  currentDigit = randomDigit;
  drawDigit(nums[currentDigit]); // Perbarui tampilan dengan digit acak
}

function displayTruthTable(val) {
  let truthTableDiv = document.getElementById("truthTable"); //mengakses elemen id di html
  let binaryString = (val >>> 0).toString(2).padStart(7, "0"); //membuartt val diangaap sebagai blgn bulat tnpa tanda || to string untuk merepresantikan ke biner || dan saya menambahkan angka 0 didepan jika biner tidak cukup 7 angka
  let truthTableHTML = "<h5>Truth Table:</h5>";
  truthTableHTML += '<table class="table table-bordered">';
  truthTableHTML += "<tbody><tr>"; // membuka tag table

  for (let i = 0; i < binaryString.length; i++) { // agar blok bs jalan
    // mengunnakan for looping jadi jika i kurg dari binary string (7) ia akan bertambah hingga sesuai panjang biner
    let segmentName = String.fromCharCode(71 - i); // Angka G itu memiliki unicode 71 lalu dikurangi i
    let segmentState = binaryString[i] === "1" ? "On" : "Off"; // jika nilai bit 1 maka akan terdisplay on dan jika selain itu maka akan off
    truthTableHTML += `<td>${segmentName}: ${segmentState}</td>`;
  }

  truthTableHTML += "</tr></tbody>";
  truthTableHTML += "</table>"; // menutup tag table

  truthTableDiv.innerHTML = truthTableHTML; //menamoilkan di html
}

// efek typing
const dynamicText = document.querySelector("h1 span");
const words = [
  "Bryan's Project",
  "Seven Segment Display",
  "Tugas Akhir",
  "Seven Segment Display",
];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;
  dynamicText.classList.add("stop-blinking");

  if (!isDeleting && charIndex < currentWord.length) {
    // If condition is true, type the next character
    charIndex++;
    setTimeout(typeEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    // If condition is true, remove the previous character
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    // If word is deleted then switch to the next word
    isDeleting = !isDeleting;
    dynamicText.classList.remove("stop-blinking");
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

typeEffect();

//untuk button
function setDigit(digit) {
  document.getElementById("digitInput").value = digit;
  currentDigit = digit;
  drawDigit(nums[currentDigit]);
}
