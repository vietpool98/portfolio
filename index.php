<?php
					
if(isset($_POST["sent"])){
	

		
	if(isset($_POST["message"]) && $_POST["message"] != "" &&
		isset($_POST["firstName"]) && $_POST["firstName"] != "" &&
		isset($_POST["lastName"]) && $_POST["lastName"] != "" &&
		isset($_POST["email"]) && $_POST["email"] != "" &&
		isset($_POST["mobile"]) && $_POST["mobile"] != "" )
	{
		$info = "message sent !";
		$headers =  'MIME-Version: 1.0' . "\r\n"; 
		$headers .= 'From: contact@huynh.info' . "\r\n";
		$headers .= 'Reply-to: ' . $_POST['email'];

		$sujet = "Ce message vous a été envoyé via la page contact du site mathieu.huynh.info :
		Prénom =" . $_POST["firstName"] . "
		Nom =" . $_POST["lastName"] ."
		Mobile =" . $_POST["mobile"] ."
		Message =" . $_POST["message"];
		
		$retour = mail("mathieuhuynh@gmail.com", "réponse formulaire", $sujet, $headers);

	}
	else{
		$info = "message not sent !";
	}
}

?> 

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="style.css" />
		<script src="https://kit.fontawesome.com/40cd562d52.js" crossorigin="anonymous"></script>
		<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
		<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<title>
			Mathieu HUYNH 
		</title>
		
	</head>
	<body>
		
		      <script src="scriptJs.js" defer></script> 
		      <section class="header">

			 <div class="container-nav">

				<nav>
					<div class="profile">
						<img src="data:image/jpeg;base64,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" alt="profile photo" /> 
						<h1>Mathieu HUYNH</h1>


					</div>
					<ul>
							
						<li>
							<a href="#about" class="nav-item">
								<i class="fa-solid fa-user-secret nav-item-logo" ></i>
							ABOUT ME</a>
						</li>
						<li>
							<a href="#portfolio" class="nav-item">
								<i class="fa-solid fa-address-card nav-item-logo"></i>
							PORTFOLIO</a>
						</li>
						<li>
							<a href="#contact" class="nav-item">
								<i class="fa-solid fa-comment-dots nav-item-logo"></i>
							CONTACT ME</a>
						</li>
						
					</ul>
				</nav>

			</div>		  
			

			 <div class="container-content">

				

				<p>Hi, I'm Mathieu</p>
				<p>Front-end developer</p>

				  <div class="buttonContact">
					 <a href="#contact" class="btn-contact">
						<span>Contact Me</span> 
					</a>
				</div>  
				
				<div class="blob"></div>

		    </div> 
			
		    <div class="container-triangle">
				<img src="img/fond-circle.svg"  class="fond-triangle">
				
			</div>  
			

		</section>   

		
	      <section class="header-bottom">
			<div class="container-scroll">
				<div class="division-curve"></div>
			</div>
			<div class="content">
				<h1>SCROLL DOWN</h1>
			</div>
			  <div class="souris">

			</div>  
		</section>   

		 <section class="header-content">

			  <div class="aboutme" id="about">
				  <img src="img/welcomingBlue.svg" class="welcomeImage" >
				<div class="titre">ABOUT ME.</div> 
				 <div class="contentAbout">
			       "I am a graduated engineer in computer science. For more than 3 years, I have been working as an apprentice in the company :
				    <b><a href="https://www.bertrandt.com/en/">Bertrandt</a></b>. I enjoy coding, it has been a part of my life for few years now."<br> 
				</div>
				  <div class="boutonAbout">
					 <a class="btn-contact"> <span>my resume</span></a> 
				</div>    
				 
				 <div class="workedwith">
					<div class="titleWorked"> Worked with</div>
					<div class="logos">
						<img src="img/html.png" class="logo">
						<img src="img/CSS.png" class="logo">
						<img src="img/JS.png" class="logo">
						<img src="img/java.png" class="logo">
						<img src="img/python.png" class="logo">
						<img src="img/react.png" class="logo">
						
						
					</div>
				</div>  
			</div>    
			   <div class="portfolio" id="portfolio">
				<div class="titrePortfolio">PORTFOLIO.</div>
				<div class="contentCards">
					<div class="cards">
						<div class="contentC">
							<h2>01</h2>
							<p>JS project</p>
							<a href=/javascript_project/index.html> Read More</a>
						</div>
						
					</div>
					<div class="cards">
						<div class="contentC">
							<h2>02</h2>
							<p>React WebApp</p>
							<a href="#"> Read More</a>
						</div>
					</div>
					<div class="cards">
						<div class="contentC">
							<h2>03</h2>
							<p>IN PROGRESS</p>
							<a href="#"> Read More</a>
						</div>
					</div>
				</div>
			</div>  

			<div class="contact" id="contact"> 
				
				<form action="https://mathieu.huynh.info/#contact" class="containerContact" method="post" >
					 
					<?php if(isset($info)){?>
						<div class="alertMessage">
							<p ><?= $info?></p>
					</div> <?php }?>
					<div class="titleForm">
						<h2>CONTACT ME.</h2>
					</div> 
					<div class="row">
						<div class="col">
							<div class="inputBox">
								<input type="text" name="firstName" >
								<span class="text">First Name</span>
								<span class="line"></span>
							</div>
						</div>
						<div class="col">
							<div class="inputBox">
								<input type="text" name="lastName">
								<span class="text">Last Name</span>
								<span class="line"></span>
							</div>
						</div>
						
					</div>
	
					<div class="row">
						<div class="col">
							<div class="inputBox">
								<input type="text" name="email" >
								<span class="text">Email</span>
								<span class="line"></span>
							</div>
						</div>
						<div class="col">
							<div class="inputBox">
								<input type="text" name="mobile" >
								<span class="text">Mobile</span>
								<span class="line"></span>
							</div>
						</div>
					</div>
	
					<div class="row">
						<div class="col">
							<div class="inputBox">
								<textarea  name="message"></textarea>
								<span class="text">type Your Message Here..</span>
								<span class="line"></span>
							</div>
						</div>
						
					</div>
	
					<div class="row">
						 <div class="col">
							<input class="btn-contact" value="Send" type="submit" name="sent">
						</div> 
					</div>

				</form>
				
				
				
				
				 
			</div>  

			 <footer>
				<div class="waves">
					<div class="wave" id="wave1"></div>
					<div class="wave" id="wave2"></div>
					<div class="wave" id="wave3"></div>
				</div>
				<ul class="social_icon">
					<li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
				</ul>
				<ul class="footerLink">
					<li><a href="#">Home</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Service</a></li>
					<li><a href="#">Contact</a></li>
					
				</ul>
				
					<p>@2022 By Mathieu HUYNH | All Rights Reserved</p>
				
					
				
				 
			</footer> 
		</section>  
		
	</body>

	

</html>