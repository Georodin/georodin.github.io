		var flag = false;
	
        // Function to update the countdown
        function updateCountdown() {
            const now = new Date();
            let target = new Date(now);
            target.setHours(12, 0, 0, 0);  // Target time is 12:00:00

			// If the current time is past 12:20, set target for the next day
			if (now > new Date(target.getTime() + 20 * 60 * 1000)) {
				target.setDate(target.getDate() + 1);
			}


            // Calculate the difference in seconds
            let diffInSeconds = Math.floor((target - now) / 1000);
			
            // Determine the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const dayOfWeek = now.getDay();
			
			//console.log(diffInSeconds);

            // If it's Tuesday and the time is between 12:00 PM and 12:20 PM, display "DÖNER!"
            if (dayOfWeek === 4 && diffInSeconds >= -1200 && diffInSeconds <= 0) {
				if(!flag){
					spawnBursts();
					flag = true;
				}
                document.getElementById("countdown").innerHTML = "DÖNER!";
                return;
            }

            // If the countdown has reached 12:00, display "MITTAG!"
            if (diffInSeconds >= -1200 && diffInSeconds <= 0) {
				if(!flag){
					spawnBursts();
					flag = true;
				}
                document.getElementById("countdown").innerHTML = "MITTAG!";
                return;
            }

            // Calculate hours, minutes, and seconds
            let hours = Math.floor(diffInSeconds / 3600);
            diffInSeconds %= 3600;
            let minutes = Math.floor(diffInSeconds / 60);
            let seconds = diffInSeconds % 60;

            // Display the countdown
            const countdownString = `${hours}h ${minutes}m ${seconds}s`;
            document.getElementById("countdown").innerHTML = countdownString;
        }

        // Initialize countdown and update every second
        updateCountdown();
        setInterval(updateCountdown, 1000);