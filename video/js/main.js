$(function() {
  
  /* Pongo en variables los objetos a manipular, "video" y "drawingZone" los
   * obtengo con getElementById porque quiero el objeto tal cual,
   * "progressBar" lo llamo con $() porque quiero usarlo como elemento de
   * jQuery
   */
  var video = document.getElementById('documental');
  var drawingZone = document.getElementById('progress-bar').getContext('2d');
  var progressBar = $("#progress-bar");
  
  // Altura y ancho del lienzo donde vamos a pintar
  var w = progressBar.width();
  var h = progressBar.height();
  
  // Acciones que modifican la reproduccion usando el API de <video>
  $("#play").click(function() {
    video.play();
  });
  
  $("#pause").click(function() {
    video.pause();
  });
  
  $("#stop").click(function() {
    video.pause();
    video.currentTime = 0;
  });
  
  /* El objeto <video> tiene un evento 'ontimeupdate' que se dispara cada vez
   * que la propiedad 'currentTime' cambia, lo que hago aquí es asociar dicho
   * evento con la función que dibuja la barra de progreso
   */
  $('#documental').bind('timeupdate', function() {
    drawingZone.clearRect(0,0,w,h); // Se borra todo
    
    drawingZone.fillStyle = "#45698B"; // Se selecciona el color azul
    
    // Pinto la barra de progreso según el porcentaje de avance del video
    drawingZone.fillRect(0,0,w * (video.currentTime/video.duration),h);
  });
  
    
  /* Asigno una función al evento 'click' de la barra de progreso para 
   * mover la reproducción del video al momento cliqueado
   */
  progressBar.click(function(event){
    var border = (progressBar.outerWidth() - progressBar.width()) / 2;
    
    // Calculo la posición en X de clic respecto al inicio de la barra
    var clickXposition = event.pageX - progressBar.offset().left - border;
    
    // Muevo el video a la posición dada por el clic
    video.currentTime = video.duration * (clickXposition / w);
  });


  
});