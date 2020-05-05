function clicked(id) {
     var txt = document.getElementById(id).style.textDecoration;
     if (txt == "none") {
          document.getElementById(id).style.textDecoration = "line-through";
     } else document.getElementById(id).style.textDecoration = "none";
}