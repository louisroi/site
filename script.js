<script>
        document.addEventListener('DOMContentLoaded', function() {
            const videoBg = document.getElementById('video-bg');
            const backgroundMusic = document.getElementById('background-music');
            const clickHere = document.getElementById('click-here');
            const profileCard = document.getElementById('profile-card');

            // Charger la vidéo et la musique
            videoBg.load();
            backgroundMusic.load();

            const messages = [
                "Loin de moi",
                "Près de toi"
            ];
            let messageIndex = 0;
            let charIndex = 0;
            const dynamicTextElement = document.getElementById('dynamic-text');
            const typingSpeed = 100;
            const erasingSpeed = 50;
            const newTextDelay = 2000;

            function type() {
                if (charIndex < messages[messageIndex].length) {
                    dynamicTextElement.textContent += messages[messageIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(erase, newTextDelay);
                }
            }

            function erase() {
                if (charIndex > 0) {
                    dynamicTextElement.textContent = messages[messageIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, erasingSpeed);
                } else {
                    messageIndex++;
                    if (messageIndex >= messages.length) messageIndex = 0;
                    setTimeout(type, typingSpeed + 1100);
                }
            }

            if (messages.length) setTimeout(type, newTextDelay + 250);

            // Synchroniser la lecture de la vidéo et de la musique
            const playMedia = () => {
                videoBg.currentTime = 0;
                backgroundMusic.currentTime = 0;
                videoBg.play();
                backgroundMusic.play();
            };

            clickHere.addEventListener('click', () => {
                clickHere.classList.add('hidden');
                setTimeout(() => {
                    clickHere.style.display = 'none';
                    profileCard.classList.add('slide-down');
                }, 1000);

                // Jouer la musique et la vidéo après la disparition du texte
                setTimeout(() => {
                    playMedia();
                }, 1000);
            });

            // Simuler une activité actuelle (par exemple, "Coding" ou "Reading")
            const currentActivity = "Coding"; // Changez cette valeur pour simuler différentes activités

            // Fetch user data from server and update the profile info
            fetch('http://localhost:3000/user-profile')
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        document.getElementById('user-profile-pic').src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
                        document.getElementById('user-name').textContent = data.username;
                        document.getElementById('user-activity').textContent = currentActivity ? `I am currently ${currentActivity.toLowerCase()}` : 'Currently not doing anything';
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        });
    </script>