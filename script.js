document.getElementById('pledgeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const items = document.getElementById('items').value;

    const donorList = document.getElementById('donorList');
    const newDonor = document.createElement('li');
    newDonor.textContent = `${name} (${email}) pledged to donate: ${items}`;
    donorList.appendChild(newDonor);

    this.reset(); 
});

const ctx = document.getElementById('donationChart').getContext('2d');
const donationChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Donations (lbs)',
            data: [1200, 1900, 3000, 2500, 3200],
            backgroundColor: 'rgba(40, 167, 69, 0.5)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    updateLocationStatus();
    setInterval(updateLocationStatus, 60000); 

    const scheduleBtn = document.querySelector('.pickup-btn');
    const modal = document.getElementById('scheduleModal');
    const closeBtn = document.querySelector('.close');
    const pickupForm = document.getElementById('pickupForm');

    scheduleBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    pickupForm.onsubmit = function(e) {
        e.preventDefault();
        alert('Pickup scheduled successfully! We will contact you shortly.');
        modal.style.display = "none";
        pickupForm.reset();
    }
});

function updateLocationStatus() {
    const locations = [
        { id: 'status1', hours: '9-17', days : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
        { id: 'status2', hours: '10-16', days: ['Sat', 'Sun'] },
        { id: 'status3', hours: '24/7', days: [] }
    ];

    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentHour = new Date().getHours();

    locations.forEach(location => {
        const isOpen = location.days.includes(currentDay) && 
                       currentHour >= parseInt(location.hours.split('-')[0]) && 
                       currentHour < parseInt(location.hours.split('-')[1]);
        document.getElementById(location.id).textContent = isOpen ? 'Open Now' : 'Closed';
        document.getElementById(location.id).className = isOpen ? 'status-badge open' : 'status-badge closed';
    });
}