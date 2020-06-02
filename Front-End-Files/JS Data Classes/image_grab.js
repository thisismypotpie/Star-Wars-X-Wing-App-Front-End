let API_KEY = '510b90c6429df070447cc0b431e49e96d2079578'
let CLIENT_ID = '99d57ce3b567c59'


//This function will take in an input url, make an API call to imgur, then set the reponse object as the background for the input element.
function grab_and_set_image(input_url,element)
{
    fetch(input_url,{
        method: 'GET',
        Authorization:"Client-Id "+API_KEY //"Basic "+btoa(CLIENT_ID+':'+API_KEY)
    })
.then(response=>{ element.style.background = response})   
}