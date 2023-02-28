Philip Le
ple2@hawk.iit.edu 
ITMD-542-02, Lab 2
Repo Link: https://github.com/lephil505006/ITMD-542/tree/main/Lab2

Project Description: This project is an app that allows users to add contact information that gets stored in a database. Because it's in the database, it will be saved for the next visit, or users can edit/delete a contact info per request.

Development Environment: Windows 10, Node JS v18.14.0, Visual Studio Code

***IMPORTANT Installation Instructions: I've tested this one on my surface so this information isn't entirely consistent but:
1. Assuming you download the Lab2 portion from the repository, you will want to open an editor with that.
2. Make sure to have node js updated as well.
3. Using to terminal in Visual Studio, make sure you are in "/Lab2"
4. You will want to use the code "npm run dev"
5. Once it runs successfully, you will go on your web browser and type in "localhost:3000" in the url.
6. If all checks out, the app should run successfully!

Insights: Overall this was definitely a high step in terms of JS and getting used to node js. Using the guide demo from the lecture, I was able to pick up on things very fast. Somethings I struggled on were getting multiple info lines into one group. What I mean by that is having the first name, last name, and email be put into a box. It seemed simple now that I look back, but what I needed to do was adjust a few parameters and add a couple of extra lines in the FileRepo. Another thing that didn't work (which I couldn't fix in the end) was the date modified. I left a little comment of the code I intended to use. Essentially what happened was that I used fs to get stats for the date which originally worked and I was able to display is just fine, but editing it became and issue. I understood what I needed to do but just couldn't figure out how to fix it. On line 70 I needed to add a change for the date, but since I couldn't figure out what it needed, the date in the data would just disappear and using the code, it would crash the page (hence why I didn't just leave it in.) If you really want to dig through, you can see the process with my several commits. Overall I'm glad about this project, although I feel like there could've been more done.