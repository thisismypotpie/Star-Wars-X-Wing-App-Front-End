# Simon's CS495P Project Journal

### Links
Front end repo: https://github.com/thisismypotpie/Star-Wars-X-Wing-App-Front-End

Back end repo: https://github.com/thisismypotpie/Star-Wars-X-Wing-App-Back-End

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

7/17/20
Did a debugging sessions with Brandon to try to figure an async issue with our game saving functions. Performed many attempts, almost got there, but didn't quite get it to work. Moderate amount of reading MDN docs as well as stack overflow searches.

7/18/20
Performed an extensive amount of reading MDN docs about async code/promises as well as tinkering again with the saving functions. At long last, I was able to create a chain of promises that used await in order to guarantee that the database queries execute in a specific order. There is still room for improvement, but the basic concept appears to be working. Will be meeting with Brandon this evening to review the changes and discuss.

Later in the evening, did more messing around with the game save code. Cleaned up debug statements a bit. Figured out the last issue, which was getting the last return value properly in the promise chain. Turns out I just needed to `await` another query. Will meet with Brandon shortly.

Met with Brandon again. Realized we did not quite have the save system figure out. Our last function to retrieve team names and ids was suffering from a race condition. Spent about an hour trying to troubleshoot and brainstorm, didn't quite get there. Note that some of these hours do not result in lines of code or commits...

7/19/20
Starting on more media query work, first today will be Stats screen. Separate team screens will be tough: View-Team-Screen, View-Team-Remove-Ship-Screen and View-Team-Stats-Screen. Ended up getting stats screen, pilot screen and upgrade screen today.... Much CSS. Reorganized entire grids, messed with button arrangement and font sizes to great lengths.

7/20/20
More and more media queries for improving mobile design. Getting upgrade-type-selection-screen. Many small modifications to upgrade selection screen as well. Grids now adapt to screen size. Things look weird right after pixel break points, but definitely movin' in the right direction. Got the upgrade removal pop-up modal mobile friendly as well.

Up next I will need to address the rest of the team options screens as well as save/load screens.

... Did some more reading about Promises for personal understanding. Later in the evening, copy-pasta'd media queries for all of the 'Add New Ship' screens. Although it feels somewhat wrong to not reference the same CSS. It might make sense to keep these files separate in case the 'Add a new ship' screens need a slightly different look to them compared to the normal flow screens.

For tomorrow: get the media queries for 'View Team' and 'Remove Ship' screens on team options screens. Additionally would be good to get the save/load screens. After that only gameplay screens will be remaining. Those will be a bit trickier. I will begin to consider multiplayer system again and discuss next steps with Brandon on Thursday's meeting.

7/22/20
I worked through a huge final stretch of media queries today. Got the remaining team options screen mobile friendly as well skill bucket view screen.

Next up I am going to review Node and begin hw3 so that I can refresh my back end knowledge, and then I would like to start helping with functional testing and perhaps implementing additional backend features.

7/29/20
After a few days off for mental sanity purposes and ploughing through the many lectures and skimming the React reading more and completing Homework 3, I'm back at it. Tonight I'm going to begin chipping away at media queries for manuever screen. This will be difficult and many elements will need major tweaking for this to work. On second thought, just fixed a small issue.

8/2/20
Capstone work completed; Back to media queries. Finished pilot skill sorting screen, chipped away at meanuever screen.

8/3/20
Unfortunately multiplayer system seems out of scope for the class at this point. More maneuver screen mobilization.

I ended up hand drawing an image of the current maneuver screen and labeling the ids of specific elements. I then drew another image, where some elements are hidden and can be revealed via buttons on mobile. I hope to implement this tomorrow.

8/4/20
Beginning implentation of maneuver screen...

 OK, about 4.5 hours and one dinner later, I've implemented my master plan. On mobile basically the right-most third of elements on the maneuver screen start out as hidden. This includes the card-box and team-mate-maneuvers. Two buttons appear on mobile that create pop-up that displays those elements. Last step is to figure out the z-index such that when the card-box pop-up appears, then pop-up window that THAT window can create needs to appear at the forefront. Super close, but I'm happy the whole game is just about mobile friendly. There are several minor additional tweaks that will need to be addressed such as font sizes and just getting the images to look right in some cases.

 OK, even later, addressed some of the minor tweaks. I need to rest and obtain fresh eyes before continuing.

 8/5/20
 I had to research z-index quite a bit to figure out that the order of elements in HTML actually matters for z-indexing. After this little discovery, I made some small modifications and maneuver screen is now fully mobile friendly!