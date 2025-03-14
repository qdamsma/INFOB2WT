function myFunction() {
    var x = document.getElementById("input-text");
    var option = document.createElement("option");
    option.text = "TestTag";
    x.add(option);
    }
    var targetToChange = "article";
    var changeFontStyle = function (font) { 
        
        const x = document.getElementsByTagName(targetToChange);
        for(let i = 0; i< x.length;i++)
        {
         x[i].style.fontFamily = font.value;
        }
            
        
    } 
    var changeTargetElement = function(target){
        targetToChange = target.value;
    }
    var searchForElements = function(){
        const sectionElements = document.getElementsByTagName("section");
        
        if(sectionElements < 1){
        var z = document.createElement("option");
        z.setAttribute("value", "section");
        var t = document.createTextNode("Section");
        z.appendChild(t);
        document.getElementById("input-text").appendChild(z);
        }
        
        const articleElements = document.getElementsByTagName("article");
        if (articleElements.length < 1){
            var z = document.createElement("option");
            z.setAttribute("value", "article");
            var t = document.createTextNode("Article");
            z.appendChild(t);
            document.getElementById("input-text").appendChild(z);
        }
    }