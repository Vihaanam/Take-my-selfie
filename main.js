var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML = Content;
    if (Content == "take my selfie") {
        console.log("Taking selfie in 5 seconds");
        speak();
    }
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in five seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        takeSnapshot();
        save();
    }, 5000);
}
camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
function takeSnapshot() {
    Webcam.snap(function(get_url) {
        document.getElementById("result").innerHTML = "<img id='image_result' src=" + get_url + ">";
    });
}
function save() {
    link = document.getElementById("link");
    download_image = document.getElementById("image_result").src;
    link.href = download_image;
    link.click();
}