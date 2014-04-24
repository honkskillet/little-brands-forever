!function(){
  //asyn loops!!1!
  var clumpy = new Clumpy();
  
  var width=600,height=600;
  var logoUnicode ={
    github : '\uf092',
    html5 : '\uf13b',
    stackOverflow : '\uf16c',
    twitter: '\uf099',
    weibo: '\uf18a',
    android: '\uf17b',
    bitcoin: '\uf15a',
    windows: '\uf17a',
    youtube: '\uf16a',
    apple: '\uf179',
    facebook: '\uf09a',
    github2: '\uf113',
    pinterest: '\uf0d2',
    instagram: '\uf16d',
    tumbler: '\uf173',
    dropbox: '\uf16b',
  };

  
  Snap.load("bower_components/Font-Awesome/fonts/fontawesome-webfont.svg",function( data ){ 

    $.ajax({
      url: 'bower_components/Font-Awesome/fonts/fontawesome-webfont.svg',
      dataType: 'xml',
      success: function(data){
        //get the value of the font horiz advance
        var dfltHorizAdvX= $(data).find('#fontawesomeregular').attr('horiz-adv-x');
        var unitsPerEm= $(data).find('font-face').attr('units-per-em');
        var ascent= $(data).find('font-face').attr('ascent');
        var descent= $(data).find('font-face').attr('descent');
        //<font-face units-per-em="1792" ascent="1536" descent="-256" />

        // Extract relevant data from XML
        var xml_node = $(data).find('[unicode="\uf099"]');//$('glyph',data);
        var glyphData =[];
        $(data).find('glyph').each(function(index){
          var nodeData={
            unicode: $(this).attr('unicode'),
            horizAdvX: $(this).attr('horiz-adv-x') | dfltHorizAdvX,
            path: $(this).attr('d'),
          };
          if(nodeData.path)
            glyphData.push(nodeData);
        });

        console.log(JSON.stringify( glyphData ) );
        d3.select('#mainSVG')
          .append('text')
          .attr({
            id : 'bigImage',
            'font-size': 600 + 'px',
            'font-family':'FontAwesome',
            y:'100%',
            dy: descent/unitsPerEm+"em",
            x:0,
            //opacity:0.3,
            fill:'navy',
            stroke: 'navy',
            'stroke-width':10,
            'stroke-linejoin':"round"
          })
          .text(logoUnicode.twitter);

        var bigImageObject= _.find(glyphData,function(glyphObj){
          return glyphObj.unicode ==  logoUnicode.twitter;
        });
        console.log(bigImageObject);
        var gridSize =50;
        var s = Snap("#mainSVG");
        var i,j;
        var unicodeArray=_.map(logoUnicode,function(item){
          for(var k in item) 
            return item[k];
        });
        console.log(unicodeArray);
        clumpy.for_loop(
          function () { i = 0; },
          function () { return i<=gridSize; },
          function () { i++; },
          function () {
              clumpy.for_loop(
                function () { j=Math.floor(gridSize*descent/unitsPerEm); },
                function () { return j <= gridSize; },
                function () { j++; },
                function () {
                  var randomIndex=Math.floor(Math.random()*unicodeArray.length);
                  if(Snap.path.isPointInside(bigImageObject.path,i*bigImageObject.horizAdvX/gridSize,j*unitsPerEm/gridSize) ){
                    //s.circle(i*width/gridSize, height-j*height/gridSize+height*descent/unitsPerEm, width/(2*gridSize));
                    s.text(i*width/gridSize, height-j*height/gridSize+height*descent/unitsPerEm, unicodeArray[randomIndex])
                      .attr({
                        "font-family":"FontAwesome",
                        fill: "rgb("+(210+40*Math.sin(i))+","+(210+40*Math.cos(i))+","+(160+40*Math.sin(j))+")",
                        "font-size": (1.2*width/gridSize)+"px",
                        "dy":".3em", 
                      });

                  }
                  else{
                    s.text(i*width/gridSize, height-j*height/gridSize+height*descent/unitsPerEm, unicodeArray[randomIndex])
                      .attr({
                        "font-family":"FontAwesome",
                        fill: "rgb("+(60+40*Math.sin(i))+","+(70+40*Math.cos(i))+","+(60+40*Math.sin(j))+")",
                        "font-size": (1.2*width/gridSize)+"px",
                        "dy":".3em", 
                      });
                  }
                }
              );
          }
        );
//        for(var i=0; i<=gridSize;i++){
//          for(var j=Math.floor(gridSize*descent/unitsPerEm);j<=gridSize;j++){
//            //console.log(i*bigImageObject.horizAdvX/gridSize,j*unitsPerEm/gridSize);
//            if(Snap.path.isPointInside(bigImageObject.path,i*bigImageObject.horizAdvX/gridSize,j*unitsPerEm/gridSize) )
//              s.circle(i*width/gridSize, height-j*height/gridSize+height*descent/unitsPerEm, width/(2*gridSize));
//            
//          }
//        }
      },
      error: function(data){
          console.log('Error loading XML data');
      }
    });
  });
}();
            