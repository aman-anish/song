
        // Function to create stars dynamically
        function createStars(numStars) {
            const starContainer = document.getElementById('stars');
            
            // Create the stars and append them to the container
            for (let i = 0; i < numStars; i++) {
                let star = document.createElement('div');
                star.classList.add('star');
                
                // Randomize the size and position of each star
                const size = Math.random() * 3 + 1; // Random size between 1px and 4px
                const positionX = Math.random() * 100; // Random horizontal position (0-100%)
                const positionY = Math.random() * 100; // Random vertical position (0-100%)
                
                // Apply the styles to the star
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.top = `${positionY}%`;
                star.style.left = `${positionX}%`;
                
                // Add the star to the container
                starContainer.appendChild(star);
            }
        }

        // Create 200 stars (you can adjust the number for more or fewer stars)
        createStars(200);

        // Add CSS for stars dynamically in the head
        const style = document.createElement('style');
        style.innerHTML = `
            /* Star styling */
            #stars {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .star {
                position: absolute;
                border-radius: 50%;
                background-color: white;
                opacity: 0.7;
                animation: twinkle 3s infinite ease-in-out; /* Increased duration for smoother effect */
            }

            /* Animation for smoother twinkling stars */
            @keyframes twinkle {
                0% { opacity: 0.5; }
                50% { opacity: 0.3; }
                100% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
