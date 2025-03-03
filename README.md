you gonna need POSTMAN for sending  requrest

Links struchture :-
app.post("/login", (req, res) => res.json({ message: "Login successful" })); 
app.post("/signup", (req, res) => res.json({ message: "Signup successful" })); 
app.post("/signout", (req, res) => res.json({ message: "Signout successful" })); 
app.get("/user", authMiddleware, (req, res) => res.json({ message: "User data" })); 
app.get("/admin", authMiddleware, adminMiddleware, (req, res) => res.json({ message: "Admin data" })); 
app.get("/home", (req, res) => res.json({ message: "Welcome to Home Page" })); 
app.get("/about", (req, res) => res.json({ message: "About us" })); 
app.get("/news", (req, res) => res.json({ message: "Latest news" })); 
app.get("/blogs", (req, res) => res.json({ message: "Blogs list" })); 

to get the result you need to add a header prop

authorization = admin

just like shown in the blow image
![Screenshot 2025-03-03 165748](https://github.com/user-attachments/assets/083085dc-360c-402b-90ed-a9376f872252)



