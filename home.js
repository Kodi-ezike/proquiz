function topic(){
    var subject = document.getElementById('topics');
    var topicArrow = document.getElementById('arrow');
    var topicLink = document.getElementById('topic-link');
    var home = document.getElementById('links');
    var main = document.getElementById('main-page');
    if (topicLink.style.display === "block") {
        topicLink.style.display = "none";
        topicArrow.style.transform = 'rotate(0deg)';
        home.style.height = '595px';
        main.style.height = '595px';
    } 
    else {
        topicLink.style.display = "block";
        topicArrow.style.transform = 'rotate(90deg)';
        home.style.height = '720px';
        main.style.height = '720px';
       
    }
};
 

function openNav() {
    var x = document.getElementById("links");
    var y = document.getElementById("open");
    var z =document.getElementById("close")
    if (x.style.display === "block") {
        x.style.display = "none";
    } 
    else {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "block";
    }
}
function closeNav() {
    var x = document.getElementById("links");
    var y = document.getElementById("open");
    var z =document.getElementById("close")
    if (x.style.display === "block") {
        x.style.display = "none";
        z.style.display = "none";
        y.style.display = "block";
    } 
    
}