let timerId = null; 
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");

const storedAutoJb = localStorage.getItem("autoJb");
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// choose one of kernel exploits
var exploitChain = localStorage.getItem("exploitChain") || "lapse";
const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById('kernel-options');

// Show user agent
UAElement.innerText += " " + navigator.userAgent;

// ===== حماية الصور من الاختفاء =====
function protectImages() {
    // حماية جميع الصور في الصفحة
    var allImages = document.querySelectorAll('img');
    allImages.forEach(function(img) {
        img.style.display = 'block !important';
        img.style.visibility = 'visible !important';
        img.style.opacity = '1 !important';
        img.style.height = 'auto !important';
        img.style.width = 'auto !important';
        img.style.maxWidth = '92% !important';
    });
    
    // حماية صناديق الصور
    var mediaBoxes = document.querySelectorAll('.media-box');
    mediaBoxes.forEach(function(box) {
        box.style.display = 'block !important';
        box.style.visibility = 'visible !important';
        box.style.opacity = '1 !important';
    });
    
    // حماية الأعمدة الجانبية
    var mediaSides = document.querySelectorAll('.media-side');
    mediaSides.forEach(function(side) {
        side.style.display = 'flex !important';
        side.style.visibility = 'visible !important';
        side.style.opacity = '1 !important';
        side.style.flex = '0 0 22% !important';
        side.style.minWidth = '150px !important';
    });
    
    // حماية محددة للصورة cat2.jpg
    var cat2 = document.getElementById('cat2');
    if (cat2) {
        cat2.style.display = 'block !important';
        cat2.style.visibility = 'visible !important';
        cat2.style.opacity = '1 !important';
    }
    
    // حماية محددة للصورة cat.jpg
    var cat1 = document.getElementById('cat1');
    if (cat1) {
        cat1.style.display = 'block !important';
        cat1.style.visibility = 'visible !important';
        cat1.style.opacity = '1 !important';
    }
}

// تنفيذ الحماية فوراً
protectImages();

// مراقبة التغييرات في DOM لحماية الصور باستمرار
var observer = new MutationObserver(function() {
    protectImages();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'display', 'visibility', 'opacity', 'hidden']
});

// حماية إضافية كل 200ms
setInterval(protectImages, 200);

// ===== نهاية حماية الصور =====

kexForm.addEventListener("change", function (event) {
    localStorage.setItem("exploitChain", event.target.value);
    exploitChain = event.target.value;
});

// jailbreak execution - معدل لحماية الصور
jeilbrekBtn.addEventListener("click", function (e){
    jeilbrekBtn.disabled = true;
    stopInterval();
    // حماية الصور قبل وأثناء وبعد التهكير
    protectImages();
    doJb();
    // حماية إضافية بعد التهكير
    setTimeout(protectImages, 100);
    setTimeout(protectImages, 500);
    setTimeout(protectImages, 1000);
});

checkbox.addEventListener('change', function () {
    localStorage.setItem("autoJb", checkbox.checked);
    if (checkbox.checked == true && jeilbrekBtn.disabled == false) {
        jailbreakCountdown();
        return;
    }
    stopInterval();
});

function stopInterval(){
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    label.textContent = "تفعيل التهكير التلقائي ";
    // حماية الصور عند إيقاف العد التنازلي
    protectImages();
}

function jailbreakCountdown() {   
    stopInterval();

    let countdown = 5;
    label.textContent = `سيتم تهكير الجهاز خلال ثواني  : ${countdown}`;
    timerId = setInterval(() => {
        countdown--;
        label.textContent = `سيتم تهكير الجهاز خلال ثواني  : ${countdown}`;
        // حماية الصور أثناء العد التنازلي
        protectImages();

        if (countdown < 0) {
            jeilbrekBtn.disabled = true; 
            clearInterval(timerId);
            timerId = null;
            label.textContent = 'تم تفعيل التهكير  ';
            // حماية الصور قبل التهكير
            protectImages();
            doJb();
            // حماية الصور بعد التهكير مباشرة
            setTimeout(protectImages, 100);
            setTimeout(protectImages, 500);
        }
    }, 1000);
}

function cacheProgress(e) {
    var Percent = (Math.round(e.loaded / e.total * 100));
    document.title = "Caching: " + Percent + "%";
    // حماية الصور أثناء التخزين المؤقت
    protectImages();
}

function displayCacheProgress() {
    setTimeout(function () {
        document.title = "\u2713";
        protectImages();
    }, 1000);
    setTimeout(function () {
        document.title = "منذر سونيي لصيانة الأجهزة الإلكترونية بصرة عشار شارع الكويت 009647700672695 ";
        protectImages();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cache handling
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function (e) { displayCacheProgress(); };
        window.applicationCache.onupdateready = function (e) { displayCacheProgress(); };
    }

    // choose prefered exploit chain
    if (exploitChain == "netctrl") {
        netctrlRadio.checked = true;
    } else {
        lapseRadio.checked = true;
    }

    // apply autojb localStorage value
    checkbox.checked = autoJbValue;

    if (autoJbValue) jailbreakCountdown();
    
    // حماية الصور عند تحميل الصفحة
    setTimeout(protectImages, 100);
    setTimeout(protectImages, 500);
    setTimeout(protectImages, 1000);
});

// ===== دالة doJb محمية =====
// إذا كانت دالة doJb موجودة في ملف آخر، أضف لها حماية
if (typeof doJb === 'function') {
    var originalDoJb = doJb;
    doJb = function() {
        protectImages();
        originalDoJb();
        setTimeout(protectImages, 100);
        setTimeout(protectImages, 500);
    };
}

console.log('🛡️ حماية الصور مفعلة - الصورة cat2.jpg لن تختفي');
console.log('🛡️ تم تفعيل الحماية الكاملة للصور');