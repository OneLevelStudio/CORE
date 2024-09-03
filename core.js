initCORE();

function initCORE() {
    console.log(">> CORE initializing...");
    MDI();
    DRK();
    ROS();
    STT();
    SLD();
}

// ========== STT - Scroll to Top ==========
function STT() {
    document.body.insertAdjacentHTML(
        "afterbegin",
        "<a href='#' style='opacity: 1.0;'><div id='scrolltotop' style='font-family: \"Inter\";'>&raquo;</div></a>"
    );

    let stt = document.querySelector("#scrolltotop");
    let html = document.querySelector("html");

    document.addEventListener("scroll", function () {
        if (html.scrollTop < 500) {
            stt.style.opacity = "0.0";
        } else {
            stt.style.opacity = "1.0";
        }
    });
}
initSTT();
function initSTT() {
    document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style>
        html {
            scroll-behavior: smooth;
        }
        #scrolltotop {
            position: fixed;
            z-index: 1000;
            bottom: 0;
            right: 0;
            font-size: 20px;
            transform: rotate(-90deg);
            opacity: 0.0;
            cursor: pointer;
            transition: all ease 0.3s;
            width: 70px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: hsl(0, 0%, 50%);
            user-select: none;
        }
        #scrolltotop:hover {
            height: 100px;
        }
        </style>
        `
    );
    console.log(">> CORE: STT initialized");
}

// ========== DRK - Darkmode ==========
function DRK() {
    if (document.getElementById("darkmode")) {
        // Insert bg and close
        document.getElementById("darkmode").insertAdjacentHTML(
            "afterbegin",
            `
            <div class="darkmode-button">
                <label for="darkmodeCheck">DarkMode</label>
                <input type="checkbox" id="darkmodeCheck">
                <span></span>
            </div>
            `
        );
        // Darkmode functions
        function enableDarkMode() {
            document.documentElement.classList.add("darkmode");
            localStorage.setItem("isDarkMode", "true");
            document.getElementById("darkmodeCheck").checked = true;
        }
        function disableDarkMode() {
            document.documentElement.classList.remove("darkmode");
            localStorage.setItem("isDarkMode", "false");
            document.getElementById("darkmodeCheck").checked = false;
        }
        let isDarkMode = localStorage.getItem("isDarkMode");
        if (isDarkMode === "true") {
            enableDarkMode();
            document.getElementById("darkmodeCheck").checked = true;
        }
        const darkmodeButton = document.querySelector(".darkmode-button");
        darkmodeButton.addEventListener("click", function () {
            isDarkMode = localStorage.getItem("isDarkMode");
            isDarkMode === "true" ? disableDarkMode() : enableDarkMode();
        });
    } else {
        console.log(">> CORE: DRK disabled");
    }

}
initDRK();
function initDRK() {
    document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style>
        .darkmode {
            filter: invert(1) hue-rotate(180deg);
        }
        
        .darkmode img,
        .darkmode video {
            filter: invert(1) hue-rotate(180deg);
        }
        
        .darkmode .darkmode-ignore {
            filter: invert(1) hue-rotate(180deg);
        }
        
        .darkmode-button {
            --drkbtn-w: 50px;
            --drkbtn-h: 26px;
            z-index: 1;
            position: relative;
            width: var(--drkbtn-w);
            height: var(--drkbtn-h);
            cursor: pointer;
        }
        
        @media screen and (max-width: 1000px) {
            .darkmode-button {
                --drkbtn-w: 72px;
                --drkbtn-h: 36px;
            }
        }
        
        .darkmode-button input[type="checkbox"] {
            position: relative;
            opacity: 0;
            left: 12px;
        }
        
        .darkmode-button span {
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            overflow: hidden;
            background-color: #000000;
            border-radius: var(--drkbtn-h);
            transition: 0.2s ease background-color, 0.2s ease opacity;
        }
        
        .darkmode-button span:before,
        .darkmode-button span:after {
            content: "";
            position: absolute;
            top: calc(var(--drkbtn-h) * 0.15);
            width: calc(var(--drkbtn-h) * 0.7);
            height: calc(var(--drkbtn-h) * 0.7);
            border-radius: 50%;
            transition: 0.5s ease transform, 0.2s ease background-color;
        }
        
        .darkmode-button span:after {
            background-color: #ffffff;
            transform: translate(calc(var(--drkbtn-h) * 0.15), 0px);
            z-index: 0;
        }
        
        .darkmode-button input[type="checkbox"]:checked+span:after {
            background-color: #ffffff;
            transform: translate(calc(var(--drkbtn-w) - var(--drkbtn-h) * 0.85), 0px);
        }
        
        .darkmode-button span:before {
            background-color: #000000;
            transform: translate( calc(var(--drkbtn-h) * -0.5), calc(var(--drkbtn-h) * -2));
            z-index: 1;
        }
        
        .darkmode-button input[type="checkbox"]:checked+span:before {
            background-color: #000000;
            transform: translate( calc(var(--drkbtn-w) - var(--drkbtn-h) * 1.15), calc(-0.25 * var(--drkbtn-h)));
        }
        
        .darkmode-button input[type="checkbox"]:checked+span {
            background-color: #000000;
        }
        
        .darkmode-button input[type="checkbox"]:active+span {
            opacity: 0.5;
        }
        
        .darkmode-button label {
            color: transparent;
            font-size: 1px;
        }
        </style>
        `
    );
    console.log(">> CORE: DRK initialized");
}

// ========== SLD - Safe Link to Destination ==========
function SLD() {
    const a = document.querySelectorAll('a[target="_blank"]');
    a.forEach(function (element) {
        if (!element.hasAttribute("rel")) {
            element.setAttribute("rel", "noopener noreferrer");
        }
    });
    console.log(">> CORE: SLD initialized");
}

// ========== MDI - Modal Image ==========
function MDI() {
    let mdi = document.querySelectorAll(".mdi");

    for (let i = 0; i < 2000; i++) {
        if (mdi[i] == undefined) { break };
        mdi[i].addEventListener("click", function () {
            let src = mdi[i].getAttribute("src");
            document.body.insertAdjacentHTML(
                "afterend",
                "<div class='mdi-wrap' onclick='removemdi(this)'>" +
                "<img class='mdi-img' src='" +
                src +
                "'>" +
                "</div>"
            );
        });
    }
}
function removemdi(this_mdi) {
    this_mdi.remove();
}
initMDI();
function initMDI() {
    document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style>
        .mdi {
            cursor: pointer;
        }
        
        .mdi-wrap {
            background: #00000088;
            z-index: 1000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            cursor: pointer;
        }
        
        .mdi-img {
            width: 100%;
            border-radius: 0;
            justify-content: center;
            align-items: center;
            object-fit: contain;
        }
        </style>
        `
    );
    console.log(">> CORE: MDI initialized");
}

// ========== ROS - Reveal on Scroll ==========
function ROS() {
    let ros_top = "100px";
    let ros_transition = "all ease 0.8s";

    let ros = document.querySelectorAll(".ros");
    const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
    );

    initROS();
    updateROS();
    document.addEventListener("scroll", function () {
        updateROS();
    });

    function initROS() {
        document.head.insertAdjacentHTML(
            "beforeend",
            "<style>" +
            ".ros {position: relative; opacity: 0.0; top: " +
            ros_top +
            "; transition: " +
            ros_transition +
            ";}" +
            "</style>"
        );
        console.log(">> CORE: ROS initialized");
    }

    function updateROS() {
        for (let i = 0; i < 999; i++) {
            if (ros[i] == undefined) { break };
            let rect = ros[i].getBoundingClientRect();
            //
            if (rect.top - vh < 0) {
                ros[i].style.top = "0";
                ros[i].style.opacity = "1.0";
            } else {
                ros[i].style.top = ros_top;
                ros[i].style.opacity = "0.0";
            }
        }
    }
}
