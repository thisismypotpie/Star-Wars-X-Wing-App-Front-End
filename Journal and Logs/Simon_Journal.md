# Simon's CS495P Project Journal

### Log

7/2/20
HTML & CSS Book complete and most of the Javascript reading complete and HW1 exercises almost entirely complete. Combed through the project code a bit more. Pondering how to implement the backend game saving system.

7/8/20
Presentation went well today. Finally finished the JavaScript book and combed through the React chapters quickly.

Went through the screens, diagramming on paper to solidify my understanding and observe current mobile size behavior. In relation to media query task, it appears that elements do scale down, but columns/images tend to get quite narrow. Also, the text stays very small with a small browser window.

Also, starting to draw out on paper what our interaction might look like for multiplayer as well as load/save endpoints.

Some current thoughts on multiplayer:

- To start, upon 'Start Game' present user with 'Single player or multiplayer?'
    - Single player will go to workflow that Brandon is developing.
    - Multiplayer will allow client to create a 'lobby' with a name.
        - Send POST to /gnulobby with body { 'name' : $SUPPLIED_NAME }
          - This client should then go to 'active game' page, to start will just show a sanity console.log and list of users connected that updates asynchronously.
        - Next step would be to (optionally add a chat pane?) and a 'Begin' button, which will then take both (more than 2?) users to actual game.

Will have to discuss what multiplayer gameplay should look like to make sure this is correct and go further. In any case, the gears are turning thinking about back end tasks.


7/14/20
Begin mobile friendlization of screens. Got Team-Screen tonight, will need to revisit all others starting with Title again tomorrow. Getting into a good groove with CSS and 3 live server windows at Desktop, Mobile, Tablet sizes.

7/15/20 4:18PM
Reflected on the CSS shown for HW1 review in lecture today. Looked at work from my commit last night on media queries. I will begin to make more screens responsive. Starting with another check of title screen. Did some messing around with the browser dev tools. 

Decided to use test viewports of sizes:
* (414px, 732px) and (480px, 853px) for mobile view
* (768px, 1024px) for tablet view
* Desktop view will be my full monitor which is (1920px, 976px) viewport

First item will be fixing the loading picture in loading-container on Title-Screen.