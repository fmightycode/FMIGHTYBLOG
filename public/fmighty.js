const password = document.getElementById("password");
            const eyeMenu = document.getElementById("eyeMenu");
            eyeMenu.addEventListener("click", function (){ 
                if(password.type ==="password"){ 
                    password.type = "text";
                    eyeMenu.classList.replace("bx-lock", "bx-lock-open");
                }else{ 
                    password.type = "password";
                    eyeMenu.classList.replace("bx-lock-open", "bx-lock");
                }
            });
