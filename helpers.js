//Set random class
class Random{
    random_dec(){return $fx.rand()};
    random_num(a,b){return a+(b-a)*this.random_dec()}
    random_int(a,b){return Math.floor(this.random_num(a,b+1))}
    random_bool(p){return this.random_dec()<p}
    random_choice(list){return list[this.random_int(0,list.length-1)]}}
    let R=new Random()
    
    
    //R.random_dec()      // Random decimal [0-1)
    //R.random_num(0, 10) // Random decimal [0-10)
    //R.random_int(0, 10) // Random integer [0-10]
    //R.random_bool(0.5)  // Random boolean with probability 0.5
    //R.random_choice([1, 2, 3])  // Random choice from a given integer or string.
    
    //set query params
    function setquery(p,v){
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set(p, v);
        if (v==null){searchParams.delete(p)};
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    };
    
    //#render and send features to upspire.studio
     function sendFeaturesAPI(features) {
            //Add a finished creating preview selector
            var iDiv = document.createElement('div');
            iDiv.id = 'render';
            document.body.appendChild(iDiv);
            if (features == null){features={};}
            var genurl = window.location.href;
            var attr = JSON.stringify(features).replace(/\"/g,"'")
            var url = 'https://studio.shawnkemp.art/api/1.1/wf/features';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {if (xhr.readyState === 4) {console.log(xhr.status);console.log(xhr.responseText);}};
            var data64 = '{"width":"'+features.Width+'","height":"'+features.Height+'","depth":"'+features.Depth+'","layers":"'+features.Layers+'","url":"'+genurl+'","hash":"'+$fx.hash+'"}';
            xhr.send(data64);   
        };
    
    
    
        function sendCanvasToBubbleAPI(canvas, fileName, request) {
            return new Promise(function(resolve, reject) {
                var base64Image = canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");
                var endpointUrl = "https://studio.shawnkemp.art/api/1.1/wf/singular";
                request = new URLSearchParams(window.location.search).get('request')
                var payload = {
                    hash: $fx.hash,
                    request: request,
                    file: base64Image,
                    filename: fileName + '.png'
                };
        
                console.log("Sending canvas:", payload);
        
                fetch(endpointUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(function(response) {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })
                .then(function(data) {
                    console.log("Canvas successfully sent:", data);
                    resolve(data);
                })
                .catch(function(error) {
                    console.error("Canvas send failed:", error);
                    reject(error);
                });
            });
        }
    
    
    
        function sendSVGToBubbleAPI(filename, request) {
            return new Promise(function(resolve, reject) {
                var svg = project.exportSVG({ asString: true });
                var base64SVG = btoa(unescape(encodeURIComponent(svg)));
                var endpointUrl = "https://studio.shawnkemp.art/api/1.1/wf/singular";
        
                var payload = {
                    hash: $fx.hash,
                    request: request,
                    file: base64SVG,
                    filename: filename + ".svg"
                };
        
                console.log("Sending SVG:", payload);
        
                fetch(endpointUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(function(response) {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })
                .then(function(data) {
                    console.log("SVG successfully sent:", data);
                    resolve(data);
                })
                .catch(function(error) {
                    console.error("SVG send failed:", error);
                    reject(error);
                });
            });
        }
    
        function sendTextToBubbleAPI(filename, textContent) {
            return new Promise(function(resolve, reject) {
                // Encode the plain text as Base64
                var base64Text = btoa(unescape(encodeURIComponent(textContent)));
                var endpointUrl = "https://shawnkempart.bubbleapps.io/api/1.1/wf/singular";
        
                // Build payload
                var payload = {
                    hash: $fx.hash,
                    file: base64Text,
                    filename: filename + ".txt"
                };
        
                console.log("Sending TXT:", payload);
        
                // Send POST request
                fetch(endpointUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(function(response) {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })
                .then(function(data) {
                    console.log("TXT successfully sent:", data);
                    resolve(data);
                })
                .catch(function(error) {
                    console.error("TXT send failed:", error);
                    reject(error);
                });
            });
        }
    