import { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./Free_wifi.css"; 

const WifiAccessPage = () => {
    const { isDarkMode } = useTheme();
    const [roomId, setRoomId] = useState(""); // Room ID input state
    const [wifiDetails, setWifiDetails] = useState(null); // Wi-Fi details state
    const [error, setError] = useState(""); // Error message state

    // Mock Wi-Fi network data
    const wifiNetworks = {
        '101': { name: 'Hotel_WiFi_1', password: 'Welcome101' },
        '102': { name: 'Hotel_WiFi_2', password: 'Welcome102' },
        '103': { name: 'Hotel_WiFi_3', password: 'Welcome103' },
        '104': { name: 'Hotel_WiFi_4', password: 'Welcome104' }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const trimmedRoomId = roomId.trim(); // Trim whitespace

        // Check if the input is a valid room ID in wifiNetworks
        if (wifiNetworks[trimmedRoomId]) {
            setWifiDetails(wifiNetworks[trimmedRoomId]); // Set Wi-Fi details
            setError(""); // Clear error
        } else {
            setWifiDetails(null); // Clear previous Wi-Fi details
            setError("Invalid Room ID. Please enter a valid Room Id."); // Set error
        }
    };

    // Clear input when clicking into it
    const handleInputClick = () => {
        setRoomId(""); // Clear the input
        setWifiDetails(null); // Clear previous Wi-Fi details
        setError(""); // Clear any error message
    };

    return (
        <div>
            {/* Wi-Fi Access Section */}
            <div className="wifi-container">
                <header>
                    <h1>Free High-Speed Wi-Fi Access</h1>
                    <p>Enter your room ID to access the Wi-Fi network.</p>
                </header>

                <section className="wifi-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="room-id">Room ID:</label>
                        <input
                            type="text"
                            id="room-id"
                            name="room-id"
                            placeholder="Enter your room ID"
                            required
                            autoComplete="off"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)} // Update roomId state on input change
                            onClick={handleInputClick} // Clear input on click
                        />
                        <button type="submit">Get Wi-Fi Access</button>
                    </form>

                    {/* Display Wi-Fi details if available */}
                    {wifiDetails && (
                        <div className="wifi-details">
                            <h2>Wi-Fi Network Details</h2>
                            <p><strong>Network Name:</strong> {wifiDetails.name}</p>
                            <p><strong>Password:</strong> {wifiDetails.password}</p>
                        </div>
                    )}

                    {/* Display error message if there’s an error */}
                    {error && (
                        <div className="error-message">{error}</div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default WifiAccessPage;